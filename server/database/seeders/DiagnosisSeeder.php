<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiagnosisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->take(4)->get();
        $doctors = DB::table('doctors')->take(4)->get();
        $diagnosis_description = [
            'Sinusitis',
            'Tonsilitis',
            'Cancer',
            'Constipation'
        ];

        foreach ($patients as $index => $patient) {
            if (isset($doctors[$index]) && isset($diagnosis_description[$index])) {
                DB::table('Diagnoses')->insert([
                    'patient_id' => $patient->id,
                    'diagnosis_description' => $diagnosis_description[$index],
                    'doctor_id' => $doctors[$index]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
