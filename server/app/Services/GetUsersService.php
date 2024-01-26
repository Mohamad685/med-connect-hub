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

    public function getDoctorsByFullName($firstName, $lastName)
    {
        return Doctor::where('first_name', 'like', "%{$firstName}%")->where('last_name', 'like', "%{$lastName}%")->get();
    }

    public function getAllPatients()
    {
        return Patient::all();
    }

    public function getPatientsByFullName($firstName, $lastName)
    {
        return Patient::with(['user', 'insuranceCompany'])->where('first_name', 'like', "%{$firstName}%")->where('last_name', 'like', "%{$lastName}%")->get();
    }

    public function getAllInsuranceCompanies()
    {
        return InsuranceCompany::all();
    }

    public function getInsuranceCompanyById($id)
    {
        return InsuranceCompany::findOrFail($id);
    }

    public function getInsurancePatientById($patientId)
{
    return Patient::with(['user', 'insuranceCompany'])->where('id', $patientId)->first();
}

public function getDoctorPatientById($patientId)
{
    return Patient::with(['user', 'doctors'])->where('id', $patientId)->first();
}
}
