<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CenterRequest;

class CenterRequestSeeder extends Seeder
{
    public function run(): void
    {
        CenterRequest::insert([
            [
                'name' => 'Bright Future Center',
                'email' => 'bright.future@example.com',
                'phone' => '0611111111',
                'city' => 'Rabat',
                'address' => 'Hay Riad',
                'message' => 'We would like to register our center on the platform.',
                'status' => 'pending',
                'reviewed_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Success Academy',
                'email' => 'success.academy@example.com',
                'phone' => '0622222222',
                'city' => 'Casablanca',
                'address' => 'Maarif',
                'message' => 'Please review and approve our registration request.',
                'status' => 'accepted',
                'reviewed_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Atlas Learning Hub',
                'email' => 'atlas.learning@example.com',
                'phone' => '0633333333',
                'city' => 'Marrakech',
                'address' => 'Gueliz',
                'message' => 'We are interested in joining the platform.',
                'status' => 'rejected',
                'reviewed_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}