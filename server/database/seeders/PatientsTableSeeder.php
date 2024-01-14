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
        $user = User::create([
            'user_name' => 'ali123',
            'email' => 'ali@example.com',
            'password' => Hash::make('password'), 
            'role' => 'patient'
        ]);

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
