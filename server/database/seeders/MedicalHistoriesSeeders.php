<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientCredentialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first four patients
        $patients = DB::table('patients')->take(4)->get();

        // Get the first four doctors
        $doctors = DB::table('doctors')->take(4)->get();

        // Descriptions for each medical history
        $descriptions = [
            'General check-up and consultation.',
            'Follow-up for previous condition.',
            'Initial diagnosis for reported symptoms.',
            'Routine annual health examination.'
        ];

        foreach ($patients as $index => $patient) {
            // Ensure there's a corresponding doctor and description for each patient
            if (isset($doctors[$index]) && isset($descriptions[$index])) {
                DB::table('medical_histories')->insert([
                    'patient_id' => $patient->id,
                    'description' => $descriptions[$index],
                    'doctor_id' => $doctors[$index]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
