<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Patient;

class PatientsTableSeeder extends Seeder
{
    public function run()
    {
        $user1 = User::create([
            'user_name' => 'ali123',
            'email' => 'ali@example.com',
            'password' => Hash::make('password'),
            'role' => 'patient'
        ]);

        Patient::create([
            'user_id' => $user1->id,
            'first_name' => 'Ali',
            'last_name' => 'Fakih',
            'gender' => 'male',
            'date_of_birth' => '1992-10-01',
            'phone_number' => '012345678911',
            'address' => 'Beirut'
        ]);

        $user2 = User::create([
            'user_name' => 'sara456',
            'email' => 'sara@example.com',
            'password' => Hash::make('password'),
            'role' => 'patient'
        ]);

        Patient::create([
            'user_id' => $user2->id,
            'first_name' => 'Sara',
            'last_name' => 'Ahmed',
            'gender' => 'female',
            'date_of_birth' => '1990-08-15',
            'phone_number' => '0987654321',
            'address' => 'Tripoli'
        ]);

        $user3 = User::create([
            'user_name' => 'mike789',
            'email' => 'mike@example.com',
            'password' => Hash::make('password'),
            'role' => 'patient'
        ]);

        Patient::create([
            'user_id' => $user3->id,
            'first_name' => 'Mike',
            'last_name' => 'Ross',
            'gender' => 'male',
            'date_of_birth' => '1988-05-20',
            'phone_number' => '0234567890',
            'address' => 'Sidon'
        ]);

        $user4 = User::create([
            'user_name' => 'lily010',
            'email' => 'lily@example.com',
            'password' => Hash::make('password'),
            'role' => 'patient'
        ]);

        Patient::create([
            'user_id' => $user4->id,
            'first_name' => 'Lily',
            'last_name' => 'Johnson',
            'gender' => 'female',
            'date_of_birth' => '1995-12-30',
            'phone_number' => '0345678901',
            'address' => 'Jounieh'
        ]);

    }

}
