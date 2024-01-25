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
            'age' => '25',
            'phone_number' => '012345678911',
            'address' => 'Beirut',
            'insurance_company_id'=>'2'
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
            'age' => '25',
            'phone_number' => '0987654321',
            'address' => 'Tripoli',
            'insurance_company_id'=>'1'

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
            'age' => '25',      
            'phone_number' => '0234567890',
            'address' => 'Sidon',
            'insurance_company_id'=>'3'
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
            'age' => '25',      
            'phone_number' => '0345678901',
            'address' => 'Jounieh',
            'insurance_company_id'=>'2'
        ]);

    }

   

}
