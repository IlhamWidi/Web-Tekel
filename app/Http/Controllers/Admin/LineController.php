<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Line;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LineController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Line::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $lines = $query->orderBy('name')->paginate(15);

        return Inertia::render('Admin/MasterData/Lines/Index', [
            'lines' => $lines,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/MasterData/Lines/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:lines,name',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        Line::create($validated);

        return redirect()->route('admin.lines.index')
            ->with('success', 'Line berhasil ditambahkan.');
    }

    public function edit(Line $line): Response
    {
        return Inertia::render('Admin/MasterData/Lines/Edit', [
            'line' => $line,
        ]);
    }

    public function update(Request $request, Line $line): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:lines,name,' . $line->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $line->update($validated);

        return redirect()->route('admin.lines.index')
            ->with('success', 'Line berhasil diupdate.');
    }

    public function destroy(Line $line): RedirectResponse
    {
        if ($line->productionReports()->exists()) {
            return back()->with('error', 'Line tidak dapat dihapus karena sudah digunakan dalam laporan produksi.');
        }

        $line->delete();

        return redirect()->route('admin.lines.index')
            ->with('success', 'Line berhasil dihapus.');
    }
}
