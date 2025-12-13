<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dimension;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DimensionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Dimension::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $dimensions = $query->orderBy('name')->paginate(15);

        return Inertia::render('Admin/MasterData/Dimensions/Index', [
            'dimensions' => $dimensions,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/MasterData/Dimensions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'width' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'thickness' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        Dimension::create($validated);

        return redirect()->route('admin.dimensions.index')
            ->with('success', 'Dimensi berhasil ditambahkan.');
    }

    public function edit(Dimension $dimension): Response
    {
        return Inertia::render('Admin/MasterData/Dimensions/Edit', [
            'dimension' => $dimension,
        ]);
    }

    public function update(Request $request, Dimension $dimension): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'width' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'thickness' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $dimension->update($validated);

        return redirect()->route('admin.dimensions.index')
            ->with('success', 'Dimensi berhasil diupdate.');
    }

    public function destroy(Dimension $dimension): RedirectResponse
    {
        if ($dimension->productionReports()->exists()) {
            return back()->with('error', 'Dimensi tidak dapat dihapus karena sudah digunakan dalam laporan produksi.');
        }

        $dimension->delete();

        return redirect()->route('admin.dimensions.index')
            ->with('success', 'Dimensi berhasil dihapus.');
    }
}
