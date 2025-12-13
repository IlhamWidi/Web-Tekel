<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionReport;
use App\Models\ProductionReportDetail;
use App\Models\Shift;
use App\Models\Line;
use App\Models\Motif;
use App\Models\Dimension;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProductionReportController extends Controller
{
    public function index(Request $request): Response
    {
        $query = ProductionReport::with(['shift', 'line', 'creator', 'details']);

        // Apply filters
        if ($request->filled('date_from')) {
            $query->whereDate('production_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('production_date', '<=', $request->date_to);
        }

        if ($request->filled('shift_id')) {
            $query->where('shift_id', $request->shift_id);
        }

        if ($request->filled('line_id')) {
            $query->where('line_id', $request->line_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $reports = $query->orderBy('production_date', 'desc')
            ->orderBy('shift_id', 'desc')
            ->paginate(20)
            ->through(fn($report) => [
                'id' => $report->id,
                'report_number' => $report->report_number,
                'date' => $report->production_date->format('d/m/Y'),
                'shift' => $report->shift->name,
                'line' => $report->line->name,
                'status' => $report->status,
                'total_actual' => $report->details->sum('actual_quantity'),
                'total_target' => $report->details->sum('target_quantity'),
                'total_ng' => $report->details->sum('ng_quantity'),
                'can_edit' => $report->canEdit() && $request->user()->can('edit production reports'),
                'can_approve' => $report->canApprove() && $request->user()->can('approve production reports'),
            ]);

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'filters' => $request->only(['date_from', 'date_to', 'shift_id', 'line_id', 'status']),
            'shifts' => Shift::all(),
            'lines' => Line::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Reports/Create', [
            'shifts' => Shift::all(),
            'lines' => Line::all(),
            'motifs' => Motif::all(),
            'dimensions' => Dimension::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (!$request->user()->can('create production reports')) {
            abort(403);
        }

        $validated = $request->validate([
            'production_date' => 'required|date',
            'shift_id' => 'required|exists:shifts,id',
            'line_id' => 'required|exists:lines,id',
            'notes' => 'nullable|string',
            'details' => 'required|array|min:1',
            'details.*.motif_id' => 'required|exists:motifs,id',
            'details.*.dimension_id' => 'required|exists:dimensions,id',
            'details.*.target_quantity' => 'required|integer|min:0',
            'details.*.actual_quantity' => 'required|integer|min:0',
            'details.*.ng_quantity' => 'required|integer|min:0',
            'details.*.notes' => 'nullable|string',
            'status' => 'required|in:draft,pending',
        ]);

        DB::beginTransaction();
        try {
            // Generate report number
            $date = \Carbon\Carbon::parse($validated['production_date']);
            $lastReport = ProductionReport::whereDate('production_date', $date)->latest('id')->first();
            $sequence = $lastReport ? intval(substr($lastReport->report_number, -5)) + 1 : 1;
            $reportNumber = 'RPT-' . $date->format('Ymd') . '-' . str_pad($sequence, 5, '0', STR_PAD_LEFT);

            $report = ProductionReport::create([
                'report_number' => $reportNumber,
                'production_date' => $validated['production_date'],
                'shift_id' => $validated['shift_id'],
                'line_id' => $validated['line_id'],
                'notes' => $validated['notes'] ?? null,
                'status' => $validated['status'],
                'created_by' => $request->user()->id,
            ]);

            foreach ($validated['details'] as $detail) {
                ProductionReportDetail::create([
                    'production_report_id' => $report->id,
                    ...$detail,
                ]);
            }

            ActivityLog::log(
                'created_report',
                ProductionReport::class,
                $report->id,
                'Membuat laporan produksi baru'
            );

            DB::commit();

            return redirect()->route('admin.reports.show', $report)
                ->with('success', 'Laporan produksi berhasil dibuat.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal membuat laporan: ' . $e->getMessage());
        }
    }

    public function show(Request $request, ProductionReport $report): Response
    {
        $report->load(['shift', 'line', 'creator', 'updater', 'approver', 'details.motif', 'details.dimension']);

        return Inertia::render('Admin/Reports/Show', [
            'report' => [
                'id' => $report->id,
                'report_number' => $report->report_number,
                'production_date' => $report->production_date->format('d/m/Y'),
                'shift' => $report->shift,
                'line' => $report->line,
                'notes' => $report->notes,
                'status' => $report->status,
                'created_by' => $report->creator->name,
                'updated_by' => $report->updater?->name,
                'approved_by' => $report->approver?->name,
                'rejection_reason' => $report->rejection_reason,
                'approved_at' => $report->approved_at?->format('d/m/Y H:i'),
                'total_target' => $report->details->sum('target_quantity'),
                'total_actual' => $report->details->sum('actual_quantity'),
                'total_ng' => $report->details->sum('ng_quantity'),
                'achievement_percentage' => $report->details->sum('target_quantity') > 0 
                    ? round(($report->details->sum('actual_quantity') / $report->details->sum('target_quantity')) * 100, 2)
                    : 0,
                'can_edit' => $report->canEdit() && $request->user()->can('edit production reports'),
                'can_approve' => $report->canApprove() && $request->user()->can('approve production reports'),
                'details' => $report->details->map(fn($detail) => [
                    'id' => $detail->id,
                    'motif' => $detail->motif,
                    'dimension' => $detail->dimension,
                    'target_quantity' => $detail->target_quantity,
                    'actual_quantity' => $detail->actual_quantity,
                    'ng_quantity' => $detail->ng_quantity,
                    'notes' => $detail->notes,
                ]),
            ],
        ]);
    }

    public function edit(ProductionReport $report): Response
    {
        if (!$report->canEdit()) {
            abort(403, 'Laporan ini tidak dapat diedit.');
        }

        $report->load(['details.motif', 'details.dimension']);

        return Inertia::render('Admin/Reports/Edit', [
            'report' => [
                'id' => $report->id,
                'report_number' => $report->report_number,
                'production_date' => $report->production_date->format('Y-m-d'),
                'shift_id' => $report->shift_id,
                'line_id' => $report->line_id,
                'notes' => $report->notes,
                'status' => $report->status,
                'details' => $report->details->map(fn($detail) => [
                    'id' => $detail->id,
                    'motif_id' => $detail->motif_id,
                    'dimension_id' => $detail->dimension_id,
                    'target_quantity' => $detail->target_quantity,
                    'actual_quantity' => $detail->actual_quantity,
                    'ng_quantity' => $detail->ng_quantity,
                    'notes' => $detail->notes,
                ]),
            ],
            'shifts' => Shift::all(),
            'lines' => Line::all(),
            'motifs' => Motif::all(),
            'dimensions' => Dimension::all(),
        ]);
    }

    public function update(Request $request, ProductionReport $report): RedirectResponse
    {
        if (!$report->canEdit()) {
            return back()->with('error', 'Laporan ini tidak dapat diedit.');
        }

        $validated = $request->validate([
            'production_date' => 'required|date',
            'shift_id' => 'required|exists:shifts,id',
            'line_id' => 'required|exists:lines,id',
            'notes' => 'nullable|string',
            'details' => 'required|array|min:1',
            'details.*.id' => 'nullable|exists:production_report_details,id',
            'details.*.motif_id' => 'required|exists:motifs,id',
            'details.*.dimension_id' => 'required|exists:dimensions,id',
            'details.*.target_quantity' => 'required|integer|min:0',
            'details.*.actual_quantity' => 'required|integer|min:0',
            'details.*.ng_quantity' => 'required|integer|min:0',
            'details.*.notes' => 'nullable|string',
            'status' => 'required|in:draft,pending',
        ]);

        DB::beginTransaction();
        try {
            $report->update([
                'production_date' => $validated['production_date'],
                'shift_id' => $validated['shift_id'],
                'line_id' => $validated['line_id'],
                'notes' => $validated['notes'] ?? null,
                'status' => $validated['status'],
                'updated_by' => $request->user()->id,
            ]);

            // Delete existing details and recreate
            $report->details()->delete();

            foreach ($validated['details'] as $detail) {
                unset($detail['id']);
                ProductionReportDetail::create([
                    'production_report_id' => $report->id,
                    ...$detail,
                ]);
            }

            ActivityLog::log(
                'updated_report',
                ProductionReport::class,
                $report->id,
                'Mengupdate laporan produksi'
            );

            DB::commit();

            return redirect()->route('admin.reports.show', $report)
                ->with('success', 'Laporan produksi berhasil diupdate.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal mengupdate laporan: ' . $e->getMessage());
        }
    }

    public function approve(Request $request, ProductionReport $report): RedirectResponse
    {
        if (!$report->canApprove()) {
            return back()->with('error', 'Laporan ini tidak dapat diapprove.');
        }

        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'rejection_reason' => 'nullable|string',
        ]);

        $report->update([
            'status' => $validated['status'],
            'approved_by' => $request->user()->id,
            'rejection_reason' => $validated['rejection_reason'] ?? null,
            'approved_at' => now(),
        ]);

        ActivityLog::log(
            $validated['status'] === 'approved' ? 'approved_report' : 'rejected_report',
            ProductionReport::class,
            $report->id,
            ucfirst($validated['status']) . ' laporan produksi'
        );

        return back()->with('success', 'Status laporan berhasil diupdate.');
    }

    public function destroy(Request $request, ProductionReport $report): RedirectResponse
    {
        if (!$request->user()->can('delete production reports')) {
            abort(403);
        }

        if ($report->status !== 'draft') {
            return back()->with('error', 'Hanya laporan draft yang dapat dihapus.');
        }

        ActivityLog::log(
            'deleted_report',
            ProductionReport::class,
            $report->id,
            'Menghapus laporan produksi'
        );

        $report->delete();

        return redirect()->route('admin.reports.index')
            ->with('success', 'Laporan berhasil dihapus.');
    }
}
