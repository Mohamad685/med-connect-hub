<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\InsuranceCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Services\RegistrationService;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $patient_id = null;
        $first_name = null;
        $last_name = null;
        $insurance_company_name = null;

        if ($user->role === 'patient') {
            $patient = $user->patient;
                $patient_id = $patient->id;
                $first_name = $patient->first_name;
                $last_name = $patient->last_name;
        }
        if ($user->role === 'insurance') {
                $insurance_company_name = $user->insuranceCompany->name;
        }
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'patient_id' => $patient_id,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'insurance_company_name' => $insurance_company_name,
            'authorisation' => [
                'token' => $token,
            ]
        ]);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }


    
    public function deleteDoctor($id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $user = User::findOrFail($doctor->user_id);

            $doctor->delete();
            $user->delete();

            return response()->json(['message' => 'Doctor deleted successfully!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function deletePatient($id)
    {
        try {
            $patient = Patient::findOrFail($id);
            $user = User::findOrFail($patient->user_id);

            $patient->delete();
            $user->delete();

            return response()->json(['message' => 'Patient deleted successfully!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Patient not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteInsuranceCompany($id)
    {
        try {
            $insurance = InsuranceCompany::findOrFail($id);
            $user = User::findOrFail($insurance->user_id);

            $insurance->delete();
            $user->delete();

            return response()->json(['message' => 'Insurance company deleted successfully!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Insurance company not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}