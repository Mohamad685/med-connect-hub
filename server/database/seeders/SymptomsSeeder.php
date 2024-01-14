<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class SymptomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->take(4)->get();
        $doctors = DB::table('doctors')->take(4)->get();
        $symptom_description = [
            'headache',
            'reflux',
            'diarrhea',
            'bladder pain'
        ];

        foreach ($patients as $index => $patient) {
            if (isset($doctors[$index]) && isset($symptom_description[$index])) {
                DB::table('symptoms')->insert([
                    'patient_id' => $patient->id,
                    'symptom_description' => $symptom_description[$index],
                    'doctor_id' => $doctors[$index]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
