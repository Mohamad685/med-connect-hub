<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([InsuranceCompaniesTableSeeder::class]);
        $this->call([AdminUserSeeder::class,]);
        $this->call([DoctorsTableSeeder::class]);
        $this->call([PatientsTableSeeder::class]);
        $this->call([DoctorsPatientsSeeder::class,]);
        $this->call([MedicalHistoriesSeeder::class]);
        $this->call([MedicationHistoriesSeeder::class]);
        $this->call([DiagnosisSeeder::class]);
        $this->call([LabResultsSeeder::class]);
        $this->call([PrescriptionsSeeder::class]);
        $this->call([SymptomsSeeder::class]);
        $this->call([InsuranceApprovalsTableSeeder::class]);
    }

}
