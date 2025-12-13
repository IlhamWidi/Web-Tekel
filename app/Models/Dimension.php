<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dimension extends Model
{
    protected $fillable = [
        'name',
        'width',
        'height',
        'thickness',
        'is_active',
    ];

    protected $casts = [
        'width' => 'decimal:2',
        'height' => 'decimal:2',
        'thickness' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function productionReports(): HasMany
    {
        return $this->hasMany(ProductionReport::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
