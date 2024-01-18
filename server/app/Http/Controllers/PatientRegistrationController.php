<?php

namespace App\Http\Controllers;

use App\Services\PatientRegistrationService;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PatientRegistrationController extends Controller
{
  
    protected $patientRegistrationService;

public function __construct(PatientRegistrationService $service)
{
    $this->patientRegistrationService = $service;
}

public function registerPatient(Request $request)
{
    // Use the service to handle registration
    return $this->patientRegistrationService->handleRegistration($request->all());
}
}