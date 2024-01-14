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
        $user = User::create([
            'user_name' => 'John123',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'doctor'
        ]);

        Doctor::create([
            'user_id' => $user->id,  
            'first_name'=>'John',
            'last_name'=> 'Doe',
            'specialty' => 'Cardiology',
            'license_id' => '123',
            'gender'=> 'male',
            'age'=>'70',
            'phone_number'=>'0123456789'
        ]);
    }
}
