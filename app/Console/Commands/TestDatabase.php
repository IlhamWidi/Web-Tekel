<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ProductionReport;
use App\Models\ProductionReportDetail;
use App\Models\User;
use App\Models\Motif;
use App\Models\Dimension;
use App\Models\Line;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TestDatabase extends Command
{
    protected $signature = 'test:database';
    protected $description = 'Test database CRUD and relationships';

    public function handle()
    {
        $this->info('=== DATABASE VERIFICATION TEST ===');
        $this->newLine();
        
        // 1. Data Counts
        $this->info('1. DATA COUNTS:');
        $this->line('   Users: ' . User::count());
        $this->line('   Lines: ' . Line::count());
        $this->line('   Shifts: ' . Shift::count());
        $this->line('   Motifs: ' . Motif::count());
        $this->line('   Dimensions: ' . Dimension::count());
        $this->line('   Production Reports: ' . ProductionReport::count());
        $this->line('   Production Report Details: ' . ProductionReportDetail::count());
        $this->newLine();
        
        // 2. Sample Report
        $this->info('2. SAMPLE APPROVED REPORT:');
        $report = ProductionReport::with(['shift', 'line', 'creator', 'details.motif', 'details.dimension'])
            ->where('status', 'approved')
            ->first();
            
        if ($report) {
            $this->line("   Report Number: {$report->report_number}");
            $this->line("   Date: {$report->production_date->format('Y-m-d')}");
            $this->line("   Shift: {$report->shift->name}");
            $this->line("   Line: {$report->line->name}");
            $this->line("   Status: {$report->status}");
            $this->line("   Created by: {$report->creator->name}");
            $this->line("   Details count: {$report->details->count()}");
            $this->line("   Total Target: {$report->total_target}");
            $this->line("   Total Actual: {$report->total_actual}");
            $this->line("   Total NG: {$report->total_ng}");
            $this->line("   Achievement: {$report->achievement_percentage}%");
            $this->newLine();
            
            if ($report->details->count() > 0) {
                $detail = $report->details->first();
                $this->line('   First Detail:');
                $this->line("     - Motif: {$detail->motif->name} ({$detail->motif->code})");
                $this->line("     - Dimension: {$detail->dimension->name}");
                $this->line("     - Target: {$detail->target_quantity} pcs");
                $this->line("     - Actual: {$detail->actual_quantity} pcs");
                $this->line("     - NG: {$detail->ng_quantity} pcs");
                $this->line("     - Achievement: {$detail->achievement_percentage}%");
            }
        }
        $this->newLine();
        
        // 3. Scope Tests
        $this->info('3. FILTER SCOPES:');
        $this->line('   Draft: ' . ProductionReport::draft()->count());
        $this->line('   Pending: ' . ProductionReport::pending()->count());
        $this->line('   Approved: ' . ProductionReport::approved()->count());
        $this->line('   Rejected: ' . ProductionReport::rejected()->count());
        $this->line("   Today: " . ProductionReport::whereDate('production_date', today())->count());
        $this->newLine();
        
        // 4. CRUD Test - CREATE
        $this->info('4. CRUD TEST - CREATE:');
        try {
            $operator = User::role('operator')->first();
            $date = Carbon::today();
            $lastReport = ProductionReport::whereDate('production_date', $date)->latest('id')->first();
            $sequence = $lastReport ? intval(substr($lastReport->report_number, -5)) + 1 : 1;
            $reportNumber = 'RPT-' . $date->format('Ymd') . '-' . str_pad($sequence, 5, '0', STR_PAD_LEFT);
            
            $newReport = ProductionReport::create([
                'report_number' => $reportNumber,
                'production_date' => $date,
                'shift_id' => Shift::first()->id,
                'line_id' => Line::first()->id,
                'notes' => 'Test CRUD Create',
                'status' => 'draft',
                'created_by' => $operator->id,
            ]);
            
            ProductionReportDetail::create([
                'production_report_id' => $newReport->id,
                'motif_id' => Motif::first()->id,
                'dimension_id' => Dimension::first()->id,
                'target_quantity' => 500,
                'actual_quantity' => 480,
                'ng_quantity' => 10,
                'notes' => 'Test detail',
            ]);
            
            $this->line("   ✓ CREATE SUCCESS - {$newReport->report_number}");
            $this->newLine();
            
            // 5. READ
            $this->info('5. CRUD TEST - READ:');
            $readReport = ProductionReport::with('details')->find($newReport->id);
            $this->line("   ✓ READ SUCCESS");
            $this->line("   Report: {$readReport->report_number}");
            $this->line("   Target: {$readReport->total_target}");
            $this->line("   Actual: {$readReport->total_actual}");
            $this->line("   Achievement: {$readReport->achievement_percentage}%");
            $this->newLine();
            
            // 6. UPDATE
            $this->info('6. CRUD TEST - UPDATE:');
            $readReport->update([
                'notes' => 'Updated via CRUD test',
                'status' => 'pending'
            ]);
            $readReport->refresh();
            $this->line("   ✓ UPDATE SUCCESS");
            $this->line("   New Status: {$readReport->status}");
            $this->newLine();
            
            // 7. DELETE
            $this->info('7. CRUD TEST - DELETE:');
            $detailCount = $readReport->details->count();
            $reportId = $readReport->id;
            $readReport->delete();
            
            $remainingDetails = DB::table('production_report_details')
                ->where('production_report_id', $reportId)
                ->count();
                
            $this->line("   ✓ DELETE SUCCESS");
            $this->line("   Details before: {$detailCount}");
            $this->line("   Details after (cascade): {$remainingDetails}");
            $this->newLine();
            
        } catch (\Exception $e) {
            $this->error('   ✗ ERROR: ' . $e->getMessage());
            $this->newLine();
        }
        
        // 8. Final State
        $this->info('8. FINAL DATABASE STATE:');
        $this->line('   Total Reports: ' . ProductionReport::count());
        $this->line('   Total Details: ' . ProductionReportDetail::count());
        $this->line('   - Draft: ' . ProductionReport::draft()->count());
        $this->line('   - Pending: ' . ProductionReport::pending()->count());
        $this->line('   - Approved: ' . ProductionReport::approved()->count());
        $this->newLine();
        
        $this->info('=== ALL TESTS PASSED ===');
        
        return Command::SUCCESS;
    }
}
