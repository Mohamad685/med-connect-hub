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
        ]);
    }
}
