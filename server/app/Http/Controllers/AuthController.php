<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'patient_id' => $patient_id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'authorisation' => [
                    'token' => $token,
                ]
            ]);
        }
        elseif ($user->role === 'insurance') {
            $insurance_company_name = $user->insuranceCompany->name;
            return response()->json([
                'status' => 'success',
                'insurance_company_name' => $insurance_company_name,
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                ]
            ]);
        }
        elseif ($user->role === 'doctor') {
            $doctor = $user->doctor;
            $doctor_id = $doctor->id;
            $first_name = $doctor->first_name;
            $last_name = $doctor->last_name;
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'doctor_id' => $doctor_id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'insurance_company_name' => $insurance_company_name,
                'authorisation' => [
                    'token' => $token,
                ]
            ]);
        } elseif ($user->role === 'admin')  {
            return response()->json([
                    'status' => 'success',
                    'user' => $user,
                    'authorisation' => [
                        'token' => $token,
                    ]
            ]);

        }

    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out.'
        ]);
    }
}