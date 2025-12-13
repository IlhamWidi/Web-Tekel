<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@suryamulticemerlang.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
        $admin->assignRole('admin');

        // Supervisor user
        $supervisor = User::create([
            'name' => 'Supervisor Produksi',
            'email' => 'supervisor@suryamulticemerlang.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
        $supervisor->assignRole('supervisor');

        // Operator users
        $operator1 = User::create([
            'name' => 'Operator Shift 1',
            'email' => 'operator1@suryamulticemerlang.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
        $operator1->assignRole('operator');

        $operator2 = User::create([
            'name' => 'Operator Shift 2',
            'email' => 'operator2@suryamulticemerlang.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
        $operator2->assignRole('operator');

        // Viewer user
        $viewer = User::create([
            'name' => 'Quality Control Viewer',
            'email' => 'viewer@suryamulticemerlang.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
        $viewer->assignRole('viewer');
    }
}
