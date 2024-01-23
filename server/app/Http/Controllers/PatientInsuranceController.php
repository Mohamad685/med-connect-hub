<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientInsuranceController extends Controller
{
    public function relatedPatients(Request $request)
    {
        $insuranceCompany = auth()->user(); 
        $patients = $insuranceCompany->patients;
        return response()->json($patients);
    }
}
