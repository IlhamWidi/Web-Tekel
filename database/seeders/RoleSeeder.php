<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Report permissions
            'view reports',
            'create reports',
            'edit reports',
            'delete reports',
            'submit reports',
            'approve reports',
            'export reports',
            
            // Recap permissions
            'view recap',
            'export recap',
            
            // Master data permissions
            'manage lines',
            'manage motifs',
            'manage dimensions',
            'manage shifts',
            
            // User management permissions
            'manage users',
            'manage roles',
            
            // Activity log permissions
            'view activity logs',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $supervisor = Role::create(['name' => 'supervisor']);
        $supervisor->givePermissionTo([
            'view reports',
            'edit reports',
            'submit reports',
            'approve reports',
            'export reports',
            'view recap',
            'export recap',
            'view activity logs',
        ]);

        $operator = Role::create(['name' => 'operator']);
        $operator->givePermissionTo([
            'view reports',
            'create reports',
            'edit reports',
            'submit reports',
        ]);

        $viewer = Role::create(['name' => 'viewer']);
        $viewer->givePermissionTo([
            'view reports',
            'view recap',
        ]);
    }
}
