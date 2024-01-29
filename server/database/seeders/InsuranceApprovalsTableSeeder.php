<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InsuranceApprovalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('insurance_approvals')->insert([
            [
                'medical_histories_id' => 1,
                'medication_histories_id' => 1,
                'insurance_company_id' => 1,
                'lab_result_id' => 1,
                'symptoms_id' => 1,
                'prescription_id' => 1,
                'diagnosis_id' => 1,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'medical_histories_id' => 2,
                'medication_histories_id' => 2,
                'insurance_company_id' => 2,
                'lab_result_id' => 2,
                'symptoms_id' => 2,
                'prescription_id' => 2,
                'diagnosis_id' => 2,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'medical_histories_id' => 3,
                'medication_histories_id' => 3,
                'insurance_company_id' => 3,
                'lab_result_id' => 3,
                'symptoms_id' => 3,
                'prescription_id' => 3,
                'diagnosis_id' => 3,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'medical_histories_id' => 4,
                'medication_histories_id' => 4,
                'insurance_company_id' => 4,
                'lab_result_id' => 4,
                'symptoms_id' => 4,
                'prescription_id' => 4,
                'diagnosis_id' => 4,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'medical_histories_id' => 5,
                'medication_histories_id' => 5,
                'insurance_company_id' => 5,
                'lab_result_id' => 5,
                'symptoms_id' => 5,
                'prescription_id' => 5,
                'diagnosis_id' => 5,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}