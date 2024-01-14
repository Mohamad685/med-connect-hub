<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use App\Models\MedicalHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientCredentialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patient = DB::table('patients')->first();
        $doctor = DB::table('doctors')->first();
    
        DB::table('medical_histories')->insert([
            'patient_id' => $patient->id,
            'description' => 'Sample medical history description.',
            'doctor_id' => $doctor->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
