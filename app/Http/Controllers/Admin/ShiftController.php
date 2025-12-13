<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ShiftController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Shift::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $shifts = $query->orderBy('name')->paginate(15);

        return Inertia::render('Admin/MasterData/Shifts/Index', [
            'shifts' => $shifts,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/MasterData/Shifts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'is_active' => 'boolean',
        ]);

        Shift::create($validated);

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Shift berhasil ditambahkan.');
    }

    public function edit(Shift $shift): Response
    {
        return Inertia::render('Admin/MasterData/Shifts/Edit', [
            'shift' => [
                'id' => $shift->id,
                'name' => $shift->name,
                'start_time' => $shift->start_time->format('H:i'),
                'end_time' => $shift->end_time->format('H:i'),
                'is_active' => $shift->is_active,
            ],
        ]);
    }

    public function update(Request $request, Shift $shift): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'is_active' => 'boolean',
        ]);

        $shift->update($validated);

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Shift berhasil diupdate.');
    }

    public function destroy(Shift $shift): RedirectResponse
    {
        if ($shift->productionReports()->exists()) {
            return back()->with('error', 'Shift tidak dapat dihapus karena sudah digunakan dalam laporan produksi.');
        }

        $shift->delete();

        return redirect()->route('admin.shifts.index')
            ->with('success', 'Shift berhasil dihapus.');
    }
}
