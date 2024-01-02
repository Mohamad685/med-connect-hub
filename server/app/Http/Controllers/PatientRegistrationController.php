<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PatientRegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function registerPatient(Request $request)
    {
        // Doctor can only access this if they are logged in and are a doctor
        $doctor = Auth::user();

        try {
            // Common Validation for the patient's user account
            $validatedData = $request->validate([
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'user_name' => 'required|string|unique:users',
            ]);

            // Create the User for the patient
            $user = new User;
            $user->email = $validatedData['email'];
            $user->password = Hash::make($validatedData['password']);
            $user->role = 'patient';
            $user->user_name = $validatedData['user_name'];
            $user->save();

            // Validate additional patient-specific data
            $patientData = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'address' => 'required|string',
                'date_of_birth' => 'required|date',
                'phone_number' => 'required|integer|unique:patients',
                'gender' => 'required|string'
            ]);

            // Create Patient Profile
            $patient = new Patient;
            $patient->user_id = $user->id;
            $patient->first_name = $patientData['first_name'];
            $patient->last_name = $patientData['last_name'];
            $patient->address = $patientData['address'];
            $patient->date_of_birth = $patientData['date_of_birth'];
            $patient->gender = $patientData['gender'];
            $patient->phone_number = $patientData['phone_number'];
            $patient->save();

            // Return a response
            return response()->json(['message' => 'Patient registered successfully!']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $error) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $error->getMessage()], 500);
        }
    }
}
