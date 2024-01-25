<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorsPatientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $doctorPatientPairs = [
            ['doctor_id' => 1, 'patient_id' => 1],
            ['doctor_id' => 1, 'patient_id' => 2],
            ['doctor_id' => 2, 'patient_id' => 3],
            ['doctor_id' => 2, 'patient_id' => 4],
        ];

        foreach ($doctorPatientPairs as $pair) {
            DB::table('doctors_patients')->insert([
                'doctor_id' => $pair['doctor_id'],
                'patient_id' => $pair['patient_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
