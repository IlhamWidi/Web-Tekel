<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_report_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_report_id')->constrained('production_reports')->onDelete('cascade');
            $table->foreignId('motif_id')->constrained('motifs')->onDelete('restrict');
            $table->foreignId('dimension_id')->constrained('dimensions')->onDelete('restrict');
            $table->integer('target_quantity')->default(0);
            $table->integer('actual_quantity')->default(0);
            $table->integer('ng_quantity')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('production_report_id');
            $table->index('motif_id');
            $table->index('dimension_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_report_details');
    }
};
