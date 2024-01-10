<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;  // Import the User model
use App\Models\Patient;  // Import the Patient model

class PatientsTableSeeder extends Seeder
{
    public function run()
    {
        // Insert a new user for the Patient
        $user = User::create([
            'user_name' => 'ali123',
            'email' => 'ali@example.com',
            'password' => Hash::make('password'), 
            'role' => 'patient'
        ]);

        // Insert the Patient details in the Patients table
        Patient::create([
            'user_id' => $user->id, 
            'first_name'=>'ali',
            'last_name'=> 'fakih',
            'gender'=> 'male',
            'date_of_birth'=>'1992-10-1',
            'phone_number'=>'012345678911',
            'address'=>'beirut'
        ]);
    }
}
