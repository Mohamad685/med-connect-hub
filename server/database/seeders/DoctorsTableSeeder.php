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
            'user_name' => 'Nour123',
            'email' => 'nour@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user1->id,
            'first_name' => 'Nour',
            'last_name' => 'El-Din',
            'specialty' => 'Cardiology',
            'license_id' => '101',
            'gender' => 'female',
            'age' => '45',
            'phone_number' => '0123456789'
        ]);

        $user2 = User::create([
            'user_name' => 'Hassan456',
            'email' => 'hassan@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user2->id,
            'first_name' => 'Hassan',
            'last_name' => 'Maalouf',
            'specialty' => 'Neurology',
            'license_id' => '102',
            'gender' => 'male',
            'age' => '50',
            'phone_number' => '0987654321'
        ]);

        $user3 = User::create([
            'user_name' => 'Layla789',
            'email' => 'layla@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user3->id,
            'first_name' => 'Layla',
            'last_name' => 'Fahed',
            'specialty' => 'Pediatrics',
            'license_id' => '103',
            'gender' => 'female',
            'age' => '38',
            'phone_number' => '0234567890'
        ]);

        $user4 = User::create([
            'user_name' => 'Kamal012',
            'email' => 'kamal10@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user4->id,
            'first_name' => 'Kamal',
            'last_name' => 'Nassar',
            'specialty' => 'Orthopedics',
            'license_id' => '104',
            'gender' => 'male',
            'age' => '60',
            'phone_number' => '0345678901'
        ]);

        $user5 = User::create([
            'user_name' => 'Samar025',
            'email' => 'samar@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user5->id,
            'first_name' => 'Samar',
            'last_name' => 'Haddad',
            'specialty' => 'Dermatology',
            'license_id' => '105',
            'gender' => 'female',
            'age' => '42',
            'phone_number' => '0456789012'
        ]);
    }
}
