<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PrescriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = DB::table('patients')->take(4)->get();
        $doctors = DB::table('doctors')->take(4)->get();
        $medication_description = [
            'Panadol',
            'Nexium',
            'Normix',
            'Augmentin'
        ];

        foreach ($patients as $index => $patient) {
            if (isset($doctors[$index]) && isset($medication_description[$index])) {
                DB::table('prescriptions')->insert([
                    'patient_id' => $patient->id,
                    'medication_description' => $medication_description[$index],
                    'doctor_id' => $doctors[$index]->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
