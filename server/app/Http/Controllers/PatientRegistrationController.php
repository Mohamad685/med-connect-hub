<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PatientRegistrationService;
use Illuminate\Support\Facades\Log;

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
            Log::error('Registration Error: ' . $e->getMessage());

            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }
}
