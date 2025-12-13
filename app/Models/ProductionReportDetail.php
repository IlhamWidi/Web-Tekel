<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductionReportDetail extends Model
{
    protected $fillable = [
        'production_report_id',
        'motif_id',
        'dimension_id',
        'target_quantity',
        'actual_quantity',
        'ng_quantity',
        'notes',
    ];

    protected $casts = [
        'target_quantity' => 'integer',
        'actual_quantity' => 'integer',
        'ng_quantity' => 'integer',
    ];

    public function productionReport(): BelongsTo
    {
        return $this->belongsTo(ProductionReport::class);
    }

    public function motif(): BelongsTo
    {
        return $this->belongsTo(Motif::class);
    }

    public function dimension(): BelongsTo
    {
        return $this->belongsTo(Dimension::class);
    }

    public function getAchievementPercentageAttribute(): float
    {
        if ($this->target_quantity == 0) return 0;
        return round(($this->actual_quantity / $this->target_quantity) * 100, 2);
    }
}
