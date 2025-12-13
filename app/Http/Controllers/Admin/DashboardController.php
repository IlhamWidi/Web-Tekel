<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = Carbon::today();
        
        // OPTIMIZED: Get today's reports with details (1 query)
        $todayReports = ProductionReport::with(['shift', 'line', 'details'])
            ->byDate($today)
            ->get();

        // Calculate today's stats by shift (no additional queries)
        $premiumByShift = $todayReports->groupBy('shift_id')->map(function ($reports) {
            return [
                'shift_name' => $reports->first()->shift->name,
                'total_premium' => $reports->sum(function ($report) {
                    return $report->details->sum('actual_quantity');
                }),
            ];
        })->values();

        // Get total actual production today (use already loaded data)
        $totalActualToday = $todayReports->sum(function ($report) {
            return $report->details->sum('actual_quantity');
        });

        // Count reports today
        $reportsCountToday = $todayReports->count();

        // OPTIMIZED: Get last 7 days production trend using DB aggregation
        $startDate = Carbon::today()->subDays(6)->format('Y-m-d');
        $endDate = Carbon::today()->format('Y-m-d');
        
        $trendData = ProductionReport::query()
            ->join('production_report_details', 'production_reports.id', '=', 'production_report_details.production_report_id')
            ->whereBetween('production_reports.production_date', [$startDate, $endDate])
            ->selectRaw('DATE(production_reports.production_date) as date, SUM(production_report_details.actual_quantity) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        // Fill missing dates with 0
        $premiumTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dateKey = $date->format('Y-m-d');
            $premiumTrend[] = [
                'date' => $date->format('d/m'),
                'premium' => $trendData->has($dateKey) ? (int) $trendData[$dateKey]->total : 0,
            ];
        }

        // OPTIMIZED: Get latest reports (1 query with eager loading)
        $latestReports = ProductionReport::with(['shift', 'line', 'creator'])
            ->withSum('details', 'actual_quantity')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($report) {
                return [
                    'id' => $report->id,
                    'report_number' => $report->report_number,
                    'date' => $report->production_date->format('d/m/Y'),
                    'shift' => $report->shift->name,
                    'line' => $report->line->name,
                    'motif' => '-',
                    'dimension' => '-',
                    'status' => $report->status,
                    'total_premium' => (int) $report->details_sum_actual_quantity ?? 0,
                    'created_by' => $report->creator->name,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_premium_today' => $totalActualToday,
                'reports_count_today' => $reportsCountToday,
                'premium_by_shift' => $premiumByShift,
            ],
            'premium_trend' => $premiumTrend,
            'latest_reports' => $latestReports,
        ]);
    }
}
