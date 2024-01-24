<?php

namespace App\Http\Controllers;

use App\Models\InsuranceCompany;
use Illuminate\Http\Request;

class PatientInsuranceController extends Controller
{
    public function relatedPatients($insuranceCompanyId)
    {
        $insuranceCompany = InsuranceCompany::with('patients')->find($insuranceCompanyId);

        if (!$insuranceCompany) {
            return response()->json(['message' => 'Insurance company not found'], 404);
        }

        return response()->json($insuranceCompany->patients);
}
}
