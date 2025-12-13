<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProductionReport extends Model
{
    protected $fillable = [
        'report_number',
        'production_date',
        'shift_id',
        'line_id',
        'notes',
        'status',
        'created_by',
        'updated_by',
        'approved_by',
        'approved_at',
        'rejection_reason',
    ];

    protected $casts = [
        'production_date' => 'date',
        'approved_at' => 'datetime',
    ];

    protected $appends = [
        'total_target',
        'total_actual',
        'total_ng',
        'achievement_percentage',
    ];

    // Relationships
    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }

    public function line(): BelongsTo
    {
        return $this->belongsTo(Line::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function details(): HasMany
    {
        return $this->hasMany(ProductionReportDetail::class);
    }

    // Accessors for calculated values
    protected function totalTarget(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->details->sum('target_quantity'),
        );
    }

    protected function totalActual(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->details->sum('actual_quantity'),
        );
    }

    protected function totalNg(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->details->sum('ng_quantity'),
        );
    }

    protected function achievementPercentage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->total_target > 0 
                ? round(($this->total_actual / $this->total_target) * 100, 2)
                : 0,
        );
    }

    // Scopes
    public function scopeByDate($query, $date)
    {
        return $query->whereDate('production_date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('production_date', [$startDate, $endDate]);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    // Helper methods
    public function canEdit(): bool
    {
        return in_array($this->status, ['draft']);
    }

    public function canSubmit(): bool
    {
        return $this->status === 'draft';
    }

    public function canApprove(): bool
    {
        return $this->status === 'pending';
    }
}
