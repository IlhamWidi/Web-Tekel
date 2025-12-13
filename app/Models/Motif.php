<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Motif extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'is_active',
    ];

    protected $casts = [
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
