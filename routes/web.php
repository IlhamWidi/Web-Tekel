<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductionReportController;
use App\Http\Controllers\Admin\RecapController;
use App\Http\Controllers\Admin\ReportExportController;
use App\Http\Controllers\Admin\LineController;
use App\Http\Controllers\Admin\MotifController;
use App\Http\Controllers\Admin\DimensionController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Controllers\Admin\UserController;

// Public routes
Route::get('/', [LandingController::class, 'index'])->name('landing');

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Force logout for debugging
Route::get('/force-logout', function() {
    \Illuminate\Support\Facades\Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login')->with('message', 'Session cleared! Silakan login.');
})->name('force.logout');

// Admin routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard - accessible by all authenticated users
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Production Reports - accessible by all authenticated users
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [ProductionReportController::class, 'index'])->name('index');
        Route::get('/create', [ProductionReportController::class, 'create'])->name('create');
        Route::post('/', [ProductionReportController::class, 'store'])->name('store');
        Route::get('/{report}', [ProductionReportController::class, 'show'])->name('show');
        Route::get('/{report}/edit', [ProductionReportController::class, 'edit'])->name('edit');
        Route::put('/{report}', [ProductionReportController::class, 'update'])->name('update');
        
        // Approval only for supervisors and admins (checked in controller)
        Route::post('/{report}/approve', [ProductionReportController::class, 'approve'])->name('approve');
        Route::delete('/{report}', [ProductionReportController::class, 'destroy'])->name('destroy');
    });
    
    // Recap - accessible by all authenticated users
    Route::get('/recap', [RecapController::class, 'index'])->name('recap.index');
    
    // Export routes - accessible by all authenticated users
    Route::get('/reports/{report}/export-pdf', [ReportExportController::class, 'exportReportPDF'])->name('reports.export-pdf');
    Route::get('/reports/batch/export-pdf', [ReportExportController::class, 'exportBatchPDF'])->name('reports.batch-export-pdf');
    Route::get('/recap/export-excel', [ReportExportController::class, 'exportRecapExcel'])->name('recap.export-excel');
    
    // Master Data - Admin and Supervisor only (role-based check in controller)
    Route::middleware('role:admin|supervisor')->group(function () {
        Route::resource('lines', LineController::class)->except(['show']);
        Route::resource('motifs', MotifController::class)->except(['show']);
        Route::resource('dimensions', DimensionController::class)->except(['show']);
        Route::resource('shifts', ShiftController::class)->except(['show']);
    });
    
    // User Management - Admin only
    Route::middleware('role:admin')->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
    });
});
