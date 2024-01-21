<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\InsuranceCompany;

class InsuranceCompaniesTableSeeder extends Seeder
{
    public function run()
    {
        $user1 = User::create([
            'user_name' => 'global_insurance',
            'email' => 'info@globalinsurance.com',
            'password' => Hash::make('password'),
            'role' => 'insurance'
        ]);

        InsuranceCompany::create([
            'name' => 'Global Insurance',
            'description' => 'Providing comprehensive coverage worldwide.',
            'phone_number' => '800-123-4567',
            'email' => 'info@globalinsurance.com',
            'address' => '123 Global Ave, New York, NY',
            'coverage_details' => 'Full coverage including international travel.',
            'user_id' => $user1->id
        ]);


        $user2 = User::create([
            'user_name' => 'national_health',
            'email' => 'contact@nationalhealth.com',
            'password' => Hash::make('password'),
            'role' => 'insurance'
        ]);

        InsuranceCompany::create([
            'name' => 'National Health',
            'description' => 'Focused on health and wellness coverage.',
            'phone_number' => '800-987-6543',
            'email' => 'contact@nationalhealth.com',
            'address' => '456 Health St, Los Angeles, CA',
            'coverage_details' => 'Extensive health and wellness plans.',
            'user_id' => $user2->id
        ]);


        $user3 = User::create([
            'user_name' => 'secure_auto',
            'email' => 'support@secureauto.com',
            'password' => Hash::make('password'),
            'role' => 'insurance'
        ]);

        InsuranceCompany::create([
            'name' => 'Secure Auto',
            'description' => 'Auto insurance for every driver.',
            'phone_number' => '555-321-0987',
            'email' => 'support@secureauto.com',
            'address' => '789 Drive Lane, Houston, TX',
            'coverage_details' => 'Auto insurance plans for individuals and families.',
            'user_id' => $user3->id
        ]);

        $user4 = User::create([
            'user_name' => 'home_safe',
            'email' => 'home@homesafe.com',
            'password' => Hash::make('password'),
            'role' => 'insurance'
        ]);

        InsuranceCompany::create([
            'name' => 'Home Safe',
            'description' => 'Protecting your home and property.',
            'phone_number' => '555-654-3210',
            'email' => 'home@homesafe.com',
            'address' => '321 Stay Lane, Chicago, IL',
            'coverage_details' => 'Comprehensive home insurance for homeowners and renters.',
            'user_id' => $user4->id
        ]);



    }
}
