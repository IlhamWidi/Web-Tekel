<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Motif;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MotifController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Motif::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
        }

        $motifs = $query->orderBy('name')->paginate(15);

        return Inertia::render('Admin/MasterData/Motifs/Index', [
            'motifs' => $motifs,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/MasterData/Motifs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50|unique:motifs,code',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        Motif::create($validated);

        return redirect()->route('admin.motifs.index')
            ->with('success', 'Motif berhasil ditambahkan.');
    }

    public function edit(Motif $motif): Response
    {
        return Inertia::render('Admin/MasterData/Motifs/Edit', [
            'motif' => $motif,
        ]);
    }

    public function update(Request $request, Motif $motif): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50|unique:motifs,code,' . $motif->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $motif->update($validated);

        return redirect()->route('admin.motifs.index')
            ->with('success', 'Motif berhasil diupdate.');
    }

    public function destroy(Motif $motif): RedirectResponse
    {
        if ($motif->productionReports()->exists()) {
            return back()->with('error', 'Motif tidak dapat dihapus karena sudah digunakan dalam laporan produksi.');
        }

        $motif->delete();

        return redirect()->route('admin.motifs.index')
            ->with('success', 'Motif berhasil dihapus.');
    }
}
