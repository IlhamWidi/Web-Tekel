<?php

namespace Database\Seeders;

use App\Models\Line;
use App\Models\Motif;
use App\Models\Dimension;
use App\Models\Shift;
use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Lines
        $lines = [
            ['name' => 'PSB-II', 'description' => 'Production Line PSB-II', 'is_active' => true],
            ['name' => 'PSB-III', 'description' => 'Production Line PSB-III', 'is_active' => true],
            ['name' => 'PSB-IV', 'description' => 'Production Line PSB-IV', 'is_active' => true],
        ];

        foreach ($lines as $line) {
            Line::create($line);
        }

        // Seed Motifs
        $motifs = [
            ['name' => 'Revolver Gold GL', 'code' => 'RVG-GL', 'description' => 'Gold glazed ceramic tile', 'is_active' => true],
            ['name' => 'Marble White', 'code' => 'MRB-WH', 'description' => 'White marble pattern', 'is_active' => true],
            ['name' => 'Stone Grey', 'code' => 'STN-GR', 'description' => 'Grey stone texture', 'is_active' => true],
            ['name' => 'Wood Brown', 'code' => 'WD-BR', 'description' => 'Brown wood pattern', 'is_active' => true],
            ['name' => 'Granite Black', 'code' => 'GRT-BK', 'description' => 'Black granite texture', 'is_active' => true],
        ];

        foreach ($motifs as $motif) {
            Motif::create($motif);
        }

        // Seed Dimensions
        $dimensions = [
            ['name' => '60x60', 'width' => 60.00, 'height' => 60.00, 'thickness' => 0.95, 'is_active' => true],
            ['name' => '50x50', 'width' => 50.00, 'height' => 50.00, 'thickness' => 0.85, 'is_active' => true],
            ['name' => '40x40', 'width' => 40.00, 'height' => 40.00, 'thickness' => 0.75, 'is_active' => true],
            ['name' => '30x60', 'width' => 30.00, 'height' => 60.00, 'thickness' => 0.85, 'is_active' => true],
            ['name' => '25x50', 'width' => 25.00, 'height' => 50.00, 'thickness' => 0.75, 'is_active' => true],
        ];

        foreach ($dimensions as $dimension) {
            Dimension::create($dimension);
        }

        // Seed Shifts
        $shifts = [
            ['name' => 'Shift I', 'start_time' => '07:00:00', 'end_time' => '15:00:00', 'is_active' => true],
            ['name' => 'Shift II', 'start_time' => '15:00:00', 'end_time' => '23:00:00', 'is_active' => true],
            ['name' => 'Shift III', 'start_time' => '23:00:00', 'end_time' => '07:00:00', 'is_active' => true],
        ];

        foreach ($shifts as $shift) {
            Shift::create($shift);
        }
    }
}
