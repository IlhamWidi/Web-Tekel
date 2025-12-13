<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_number')->unique();
            $table->date('production_date');
            $table->foreignId('shift_id')->constrained('shifts')->onDelete('restrict');
            $table->foreignId('line_id')->constrained('lines')->onDelete('restrict');
            $table->text('notes')->nullable();
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('rejection_reason')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            $table->index(['production_date', 'shift_id', 'line_id']);
            $table->index('status');
            $table->index('report_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_reports');
    }
};
