<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LabResultsSeeder extends Seeder
{
   
    public function run(): void
    {
        $patients = DB::table('patients')->take(4)->get();
        $doctors = DB::table('doctors')->take(4)->get();
        $result = [
            'Glucose:124',
            'LDL:120',
            'HDL:121',
            'Cholesterol:200'
        ];

        foreach ($patients as $index => $patient) {
            if (isset($doctors[$index]) && isset($result[$index])) {
                DB::table('lab_results')->insert([
                    'patient_id' => $patient->id,
                    'result' => $result[$index],
                    'doctor_id' => $doctors[$index]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }    }
}
