<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionReport;
use App\Models\Shift;
use App\Models\Line;
use App\Models\Motif;
use App\Models\Dimension;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RecapController extends Controller
{
    public function index(Request $request): Response
    {
        $dateFrom = $request->filled('date_from') 
            ? Carbon::parse($request->date_from) 
            : Carbon::today()->subDays(30);
        $dateTo = $request->filled('date_to') 
            ? Carbon::parse($request->date_to) 
            : Carbon::today();

        $query = ProductionReport::with(['shift', 'line', 'details'])
            ->approved()
            ->byDateRange($dateFrom, $dateTo);

        if ($request->filled('shift_id')) {
            $query->where('shift_id', $request->shift_id);
        }

        if ($request->filled('line_id')) {
            $query->where('line_id', $request->line_id);
        }

        $reports = $query->get();

        // Rekap Harian
        $dailyRecap = $reports->groupBy(function ($report) {
            return $report->production_date->format('Y-m-d');
        })->map(function ($dayReports, $date) {
            $totalTarget = $dayReports->sum(fn($r) => $r->details->sum('target_quantity'));
            $totalActual = $dayReports->sum(fn($r) => $r->details->sum('actual_quantity'));
            $totalNg = $dayReports->sum(fn($r) => $r->details->sum('ng_quantity'));
            $totalProduction = $totalActual + $totalNg;
            return [
                'date' => Carbon::parse($date)->format('d/m/Y'),
                'total_target' => $totalTarget,
                'total_actual' => $totalActual,
                'total_premium' => $totalActual,
                'total_defects' => $totalNg,
                'total_production' => $totalProduction,
                'total_ng' => $totalNg,
                'report_count' => $dayReports->count(),
                'achievement_pct' => $totalTarget > 0 ? round(($totalActual / $totalTarget) * 100, 2) : 0,
                'average_premium_pct' => $totalProduction > 0 ? round(($totalActual / $totalProduction) * 100, 2) : 0,
            ];
        })->values();

        // Rekap per Shift
        $shiftRecap = $reports->groupBy('shift_id')->map(function ($shiftReports) {
            $shift = $shiftReports->first()->shift;
            $totalTarget = $shiftReports->sum(fn($r) => $r->details->sum('target_quantity'));
            $totalActual = $shiftReports->sum(fn($r) => $r->details->sum('actual_quantity'));
            $totalNg = $shiftReports->sum(fn($r) => $r->details->sum('ng_quantity'));
            $totalProduction = $totalActual + $totalNg;
            return [
                'shift_name' => $shift->name,
                'total_target' => $totalTarget,
                'total_actual' => $totalActual,
                'total_premium' => $totalActual,
                'total_defects' => $totalNg,
                'total_production' => $totalProduction,
                'total_ng' => $totalNg,
                'report_count' => $shiftReports->count(),
                'achievement_pct' => $totalTarget > 0 ? round(($totalActual / $totalTarget) * 100, 2) : 0,
                'average_premium_pct' => $totalProduction > 0 ? round(($totalActual / $totalProduction) * 100, 2) : 0,
            ];
        })->values();

        // Rekap per Line
        $lineRecap = $reports->groupBy('line_id')->map(function ($lineReports) {
            $line = $lineReports->first()->line;
            $totalTarget = $lineReports->sum(fn($r) => $r->details->sum('target_quantity'));
            $totalActual = $lineReports->sum(fn($r) => $r->details->sum('actual_quantity'));
            $totalNg = $lineReports->sum(fn($r) => $r->details->sum('ng_quantity'));
            $totalProduction = $totalActual + $totalNg;
            return [
                'line_name' => $line->name,
                'total_target' => $totalTarget,
                'total_actual' => $totalActual,
                'total_premium' => $totalActual,
                'total_defects' => $totalNg,
                'total_production' => $totalProduction,
                'total_ng' => $totalNg,
                'report_count' => $lineReports->count(),
                'achievement_pct' => $totalTarget > 0 ? round(($totalActual / $totalTarget) * 100, 2) : 0,
                'average_premium_pct' => $totalProduction > 0 ? round(($totalActual / $totalProduction) * 100, 2) : 0,
            ];
        })->values();

        // Rekap per Motif
        $motifRecap = $reports->flatMap(function ($report) {
            return $report->details;
        })->groupBy('motif_id')->map(function ($motifDetails) {
            $motif = $motifDetails->first()->motif;
            $totalTarget = $motifDetails->sum('target_quantity');
            $totalActual = $motifDetails->sum('actual_quantity');
            $totalNg = $motifDetails->sum('ng_quantity');
            $totalProduction = $totalActual + $totalNg;
            return [
                'motif_name' => $motif->name,
                'total_target' => $totalTarget,
                'total_actual' => $totalActual,
                'total_premium' => $totalActual,
                'total_defects' => $totalNg,
                'total_production' => $totalProduction,
                'total_ng' => $totalNg,
                'report_count' => $motifDetails->pluck('production_report_id')->unique()->count(),
                'achievement_pct' => $totalTarget > 0 ? round(($totalActual / $totalTarget) * 100, 2) : 0,
                'average_premium_pct' => $totalProduction > 0 ? round(($totalActual / $totalProduction) * 100, 2) : 0,
            ];
        })->values();

        // Summary
        $totalTarget = $reports->sum(fn($r) => $r->details->sum('target_quantity'));
        $totalActual = $reports->sum(fn($r) => $r->details->sum('actual_quantity'));
        $totalNg = $reports->sum(fn($r) => $r->details->sum('ng_quantity'));
        $totalProduction = $totalActual + $totalNg;
        
        $summary = [
            'total_target' => $totalTarget,
            'total_actual' => $totalActual,
            'total_premium' => $totalActual, // Premium = Actual (barang bagus)
            'total_defects' => $totalNg, // Defects = NG
            'total_production' => $totalProduction, // Total = Premium + Defects
            'total_ng' => $totalNg,
            'total_reports' => $reports->count(),
            'achievement_pct' => $totalTarget > 0 ? round(($totalActual / $totalTarget) * 100, 2) : 0,
            'average_premium_pct' => $totalProduction > 0 ? round(($totalActual / $totalProduction) * 100, 2) : 0,
            'average_defect_pct' => $totalProduction > 0 ? round(($totalNg / $totalProduction) * 100, 2) : 0,
            'ng_pct' => $totalActual > 0 ? round(($totalNg / $totalActual) * 100, 2) : 0,
        ];

        return Inertia::render('Admin/Recap/Index', [
            'summary' => $summary,
            'daily_recap' => $dailyRecap,
            'shift_recap' => $shiftRecap,
            'line_recap' => $lineRecap,
            'motif_recap' => $motifRecap,
            'filters' => [
                'date_from' => $dateFrom->format('Y-m-d'),
                'date_to' => $dateTo->format('Y-m-d'),
                'shift_id' => $request->shift_id,
                'line_id' => $request->line_id,
            ],
            'shifts' => Shift::all(),
            'lines' => Line::all(),
        ]);
    }
}
