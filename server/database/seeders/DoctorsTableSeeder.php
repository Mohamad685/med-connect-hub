<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Doctor;

class DoctorsTableSeeder extends Seeder
{
    public function run()
    {
        $user1 = User::create([
            'user_name' => 'mohamad123',
            'email' => 'mohamad@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user1->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'specialty' => 'Cardiology',
            'license_id' => '123',
            'gender' => 'male',
            'age' => '70',
            'phone_number' => '0123456789'
        ]);

        $user2 = User::create([
            'user_name' => 'Jane456',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user2->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'specialty' => 'Neurology',
            'license_id' => '456',
            'gender' => 'female',
            'age' => '65',
            'phone_number' => '0987654321'
        ]);

        $user3 = User::create([
            'user_name' => 'Alice789',
            'email' => 'alice@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user3->id,
            'first_name' => 'Alice',
            'last_name' => 'Johnson',
            'specialty' => 'Pediatrics',
            'license_id' => '789',
            'gender' => 'female',
            'age' => '45',
            'phone_number' => '0234567890'
        ]);

        $user4 = User::create([
            'user_name' => 'Mark012',
            'email' => 'mark@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user4->id,
            'first_name' => 'Mark',
            'last_name' => 'Williams',
            'specialty' => 'Orthopedics',
            'license_id' => '012',
            'gender' => 'male',
            'age' => '55',
            'phone_number' => '0345678901'
        ]);
    }

}
