<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Define Gates for Production Reports
        Gate::define('view production reports', function (User $user) {
            return true; // All authenticated users can view
        });

        Gate::define('create production reports', function (User $user) {
            return true; // All authenticated users can create
        });

        Gate::define('edit production reports', function (User $user) {
            return true; // All authenticated users can edit their own reports
        });

        Gate::define('approve production reports', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        Gate::define('delete production reports', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        // Define Gates for Recap
        Gate::define('view recap', function (User $user) {
            return true; // All authenticated users can view recap
        });

        // Define Gates for Master Data
        Gate::define('manage lines', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        Gate::define('manage motifs', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        Gate::define('manage dimensions', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        Gate::define('manage shifts', function (User $user) {
            return $user->hasRole(['admin', 'supervisor']);
        });

        // Define Gates for User Management
        Gate::define('manage users', function (User $user) {
            return $user->hasRole('admin');
        });

        // Super Admin has all permissions
        Gate::before(function (User $user, string $ability) {
            if ($user->hasRole('admin')) {
                return true;
            }
        });
    }
}
