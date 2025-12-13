<?php

namespace Database\Seeders;

use App\Models\ProductionReport;
use App\Models\ProductionReportDetail;
use App\Models\User;
use App\Models\Shift;
use App\Models\Line;
use App\Models\Motif;
use App\Models\Dimension;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductionReportSeeder extends Seeder
{
    public function run(): void
    {
        $operator = User::role('operator')->first();
        $supervisor = User::role('supervisor')->first();
        
        if (!$operator || !$supervisor) {
            return;
        }

        $shifts = Shift::all();
        $lines = Line::all();
        $motifs = Motif::all();
        $dimensions = Dimension::all();

        // Create reports for last 7 days
        $reportCounter = 1;
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);

            foreach ($shifts->take(2) as $shift) {
                $report = ProductionReport::create([
                    'report_number' => 'RPT-' . $date->format('Ymd') . '-' . str_pad($reportCounter++, 5, '0', STR_PAD_LEFT),
                    'production_date' => $date,
                    'shift_id' => $shift->id,
                    'line_id' => $lines->random()->id,
                    'notes' => $i > 1 ? 'Produksi berjalan lancar' : null,
                    'status' => $i > 0 ? 'approved' : 'pending',
                    'created_by' => $operator->id,
                    'approved_by' => $i > 0 ? $supervisor->id : null,
                    'approved_at' => $i > 0 ? $date->copy()->addHours(8) : null,
                ]);

                // Create 3-5 detail records per report (different motif/dimension combinations)
                $detailCount = rand(3, 5);

                for ($j = 0; $j < $detailCount; $j++) {
                    $targetQty = rand(800, 1200);
                    $actualQty = rand(750, $targetQty);
                    $ngQty = rand(0, 50);
                    
                    ProductionReportDetail::create([
                        'production_report_id' => $report->id,
                        'motif_id' => $motifs->random()->id,
                        'dimension_id' => $dimensions->random()->id,
                        'target_quantity' => $targetQty,
                        'actual_quantity' => $actualQty,
                        'ng_quantity' => $ngQty,
                        'notes' => $ngQty > 30 ? 'Perlu perhatian khusus' : null,
                    ]);
                }
            }
        }

        // Create one draft report for today
        $today = Carbon::today();
        $draftReport = ProductionReport::create([
            'report_number' => 'RPT-' . $today->format('Ymd') . '-' . str_pad($reportCounter, 5, '0', STR_PAD_LEFT),
            'production_date' => $today,
            'shift_id' => $shifts->first()->id,
            'line_id' => $lines->first()->id,
            'notes' => 'Draft laporan hari ini',
            'status' => 'draft',
            'created_by' => $operator->id,
        ]);

        // Create 2 detail records for draft
        ProductionReportDetail::create([
            'production_report_id' => $draftReport->id,
            'motif_id' => $motifs->first()->id,
            'dimension_id' => $dimensions->first()->id,
            'target_quantity' => 1000,
            'actual_quantity' => 950,
            'ng_quantity' => 25,
            'notes' => null,
        ]);

        ProductionReportDetail::create([
            'production_report_id' => $draftReport->id,
            'motif_id' => $motifs->skip(1)->first()->id,
            'dimension_id' => $dimensions->skip(1)->first()->id,
            'target_quantity' => 800,
            'actual_quantity' => 780,
            'ng_quantity' => 15,
            'notes' => null,
        ]);
    }
}
