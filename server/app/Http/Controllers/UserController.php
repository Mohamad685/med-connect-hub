<?php

namespace App\Http\Controllers;

use App\Services\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $registrationService;

    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    public function register(Request $request)
    {
        try {
            $user = $this->registrationService->registerUser($request->all());
            return response()->json(['message' => 'User registered successfully!'], 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    
    public function updateDoctor(Request $request, $id)
    {
        $response = $this->registrationService->updateDoctor($request->all(), $id);
        return response()->json($response);
    }

    public function updatePatient(Request $request, $id)
    {
        $response = $this->registrationService->updatePatient($request->all(), $id);
        return response()->json($response);
    }

    public function updateInsuranceCompany(Request $request, $id)
    {
        $response = $this->registrationService->updateInsuranceCompany($request->all(), $id);
        return response()->json($response);
    }
}
