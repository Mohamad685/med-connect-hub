<?php
namespace App\Services;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\InsuranceCompany;

class GetUsersService
{
    public function getAllDoctors()
    {
        return Doctor::all();
    }

    public function getDoctorById($id)
    {
        return Doctor::with('user')->findOrFail($id);
    }

    public function getAllPatients()
    {
        return Patient::all();
    }

    public function getPatientById($id)
    {
        return Patient::with(['user', 'insuranceCompany'])->findOrFail($id);
    }

    public function getAllInsuranceCompanies()
    {
        return InsuranceCompany::all();
    }

    public function getInsuranceCompanyById($id)
    {
        return InsuranceCompany::findOrFail($id);
    }
}
