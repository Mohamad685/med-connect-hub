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
        $users = [
            [
                'user_name' => 'ali123',
                'email' => 'ali@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-male.png',
                'patient_details' => [
                    'first_name' => 'Ali',
                    'last_name' => 'Fakih',
                    'gender' => 'male',
                    'age' => 25,
                    'phone_number' => '0123456789',
                    'address' => 'Beirut',
                    'insurance_company_id' => 2,
                ],
            ],

            [
                'user_name' => 'jana_kh',
                'email' => 'jana@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-female.jpg',
                'patient_details' => [
                    'first_name' => 'Jana',
                    'last_name' => 'Khalil',
                    'gender' => 'female',
                    'age' => 28,
                    'phone_number' => '701234568',
                    'address' => 'Saida',
                    'insurance_company_id' => 1,
                ],
            ],

            [
                'user_name' => 'samir_gh',
                'email' => 'samir@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'C:\Users\Mohammad\Desktop\final project\med-hub\server\public\storage\profile_pictures\patient-male.png',
                'patient_details' => [
                    'first_name' => 'Samir',
                    'last_name' => 'Ghanem',
                    'gender' => 'male',
                    'age' => 35,
                    'phone_number' => '712345678',
                    'address' => 'Jounieh',
                    'insurance_company_id' => 2,
                ],
            ],
            [
                'user_name' => 'noura_hayek',
                'email' => 'noura@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-female.jpg',
                'patient_details' => [
                    'first_name' => 'Noura',
                    'last_name' => 'Hayek',
                    'gender' => 'female',
                    'age' => 32,
                    'phone_number' => '760123456',
                    'address' => 'Beirut',
                    'insurance_company_id' => 1,
                ],
            ],
            [
                'user_name' => 'kamal_fares',
                'email' => 'kamal@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-male.png',
                'patient_details' => [
                    'first_name' => 'Kamal',
                    'last_name' => 'Fares',
                    'gender' => 'male',
                    'age' => 29,
                    'phone_number' => '761234567',
                    'address' => 'Tripoli',
                    'insurance_company_id' => 2,
                ],
            ],
            [
                'user_name' => 'hala_zein',
                'email' => 'hala@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-female.jpg',
                'patient_details' => [
                    'first_name' => 'Hala',
                    'last_name' => 'Zein',
                    'gender' => 'female',
                    'age' => 34,
                    'phone_number' => '762345678',
                    'address' => 'Sidon',
                    'insurance_company_id' => 3,
                ],
            ],
            [
                'user_name' => 'ziad_karam',
                'email' => 'ziad@example.com',
                'password' => 'password',
                'role' => 'patient',
                'profile_picture' => 'med-hub\server\public\storage\profile_pictures\patient-male.png',
                'patient_details' => [
                    'first_name' => 'Ziad',
                    'last_name' => 'Karam',
                    'gender' => 'male',
                    'age' => 36,
                    'phone_number' => '763456789',
                    'address' => 'Jounieh',
                    'insurance_company_id' => 1,
                ],
            ],
        ];

        foreach ($users as $user) {
            $userModel = User::create([
                'user_name' => $user['user_name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'role' => $user['role'],
                'profile_picture' => $user['profile_picture'],
            ]);

            Patient::create(array_merge($user['patient_details'], ['user_id' => $userModel->id]));
        }
    }
}