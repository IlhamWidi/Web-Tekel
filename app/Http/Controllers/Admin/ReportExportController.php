<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionReport;
use App\Models\ProductionReportDetail;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\RecapExport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;

class ReportExportController extends Controller
{
    /**
     * Export single production report to PDF
     */
    public function exportReportPDF(Request $request, ProductionReport $report)
    {
        // Check permission
        if (!$request->user()->can('view production reports')) {
            abort(403, 'Unauthorized action.');
        }

        // Load relationships
        $report->load([
            'line',
            'shift',
            'creator:id,name',
            'approver:id,name',
            'details.motif',
            'details.dimension'
        ]);

        // Calculate totals
        $totals = [
            'target' => $report->details->sum('target_quantity'),
            'actual' => $report->details->sum('actual_quantity'),
            'ng' => $report->details->sum('ng_quantity'),
            'achievement' => $report->details->sum('target_quantity') > 0 
                ? round(($report->details->sum('actual_quantity') / $report->details->sum('target_quantity')) * 100, 2)
                : 0
        ];

        $pdf = Pdf::loadView('exports.production-report-pdf', [
            'report' => $report,
            'totals' => $totals
        ]);

        $filename = 'Laporan-Produksi-' . $report->report_number . '-' . date('Ymd') . '.pdf';
        
        return $pdf->download($filename);
    }

    /**
     * Export recap analytics to Excel
     */
    public function exportRecapExcel(Request $request)
    {
        // Check permission
        if (!$request->user()->can('view production reports')) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'line_id' => 'nullable|exists:lines,id',
            'shift_id' => 'nullable|exists:shifts,id',
            'status' => 'nullable|in:draft,pending,approved,rejected',
        ]);

        $filename = 'Rekap-Produksi-' . date('Ymd-His') . '.xlsx';

        return Excel::download(new RecapExport($validated), $filename);
    }

    /**
     * Export multiple reports to PDF (batch)
     */
    public function exportBatchPDF(Request $request)
    {
        // Check permission
        if (!$request->user()->can('view production reports')) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'line_id' => 'nullable|exists:lines,id',
            'shift_id' => 'nullable|exists:shifts,id',
            'status' => 'nullable|in:draft,pending,approved,rejected',
        ]);

        $query = ProductionReport::with([
            'line',
            'shift',
            'creator:id,name',
            'approver:id,name',
            'details.motif',
            'details.dimension'
        ]);

        if (isset($validated['start_date'])) {
            $query->whereDate('production_date', '>=', $validated['start_date']);
        }

        if (isset($validated['end_date'])) {
            $query->whereDate('production_date', '<=', $validated['end_date']);
        }

        if (isset($validated['line_id'])) {
            $query->where('line_id', $validated['line_id']);
        }

        if (isset($validated['shift_id'])) {
            $query->where('shift_id', $validated['shift_id']);
        }

        if (isset($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        $reports = $query->orderBy('production_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        if ($reports->isEmpty()) {
            return back()->with('error', 'Tidak ada data untuk diekspor dengan filter yang dipilih.');
        }

        // Calculate grand totals
        $grandTotals = [
            'target' => 0,
            'actual' => 0,
            'ng' => 0,
        ];

        foreach ($reports as $report) {
            $grandTotals['target'] += $report->details->sum('target_quantity');
            $grandTotals['actual'] += $report->details->sum('actual_quantity');
            $grandTotals['ng'] += $report->details->sum('ng_quantity');
        }

        $grandTotals['achievement'] = $grandTotals['target'] > 0 
            ? round(($grandTotals['actual'] / $grandTotals['target']) * 100, 2)
            : 0;

        $pdf = Pdf::loadView('exports.production-reports-batch-pdf', [
            'reports' => $reports,
            'grandTotals' => $grandTotals,
            'filters' => $validated
        ])->setPaper('a4', 'landscape');

        $filename = 'Laporan-Produksi-Batch-' . date('Ymd-His') . '.pdf';
        
        return $pdf->download($filename);
    }
}
