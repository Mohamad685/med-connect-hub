<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PatientRegistrationService;

class PatientRegistrationController extends Controller
{
    protected $patientRegistrationService;

    public function __construct(PatientRegistrationService $patientRegistrationService)
    {
        $this->patientRegistrationService = $patientRegistrationService;
    }

    public function registerPatient(Request $request)
    {
        try {
            $response = $this->patientRegistrationService->handleRegistration($request->all());

            return $response;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }
}
