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
        return response()->json([
            'status' => 'success',
            'user' => $user,
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


    public function updateDoctor(Request $request, $id)
    {
        try {

            $doctorData = $request->validate([
                'email' => 'sometimes|nullable|email',
                'password' => 'sometimes|nullable|string|min:6',
                'user_name' => 'sometimes|nullable|string',
                'specialty' => 'sometimes|nullable|string',
                'age' => 'sometimes|nullable|integer',
                'phone_number' => 'sometimes|nullable|integer',
                'license_id' => 'sometimes|nullable|integer'
            ]);

            $doctor = Doctor::findOrFail($id);
            $user = User::findOrFail($doctor->user_id);

            if (isset($doctorData['email'])) {
                $user->email = $doctorData['email'];
            }
            if (isset($doctorData['password'])) {
                $user->password = Hash::make($doctorData['password']);
            }
            if (isset($doctorData['user_name'])) {
                $user->user_name = $doctorData['user_name'];
            }
            $user->save();

            $doctor->specialty = $doctorData['specialty'] ?? $doctor->specialty;
            $doctor->age = $doctorData['age'] ?? $doctor->age;
            $doctor->phone_number = $doctorData['phone_number'] ?? $doctor->phone_number;
            $doctor->license_id = $doctorData['license_id'] ?? $doctor->license_id;
            $doctor->email = $doctorData['email'] ?? $doctor->email;

            $doctor->save();

            return response()->json(['message' => 'Doctor updated successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    public function deleteDoctor($id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $user = User::findOrFail($doctor->user_id);

            $doctor->delete();
            $user->delete();

            return response()->json(['message' => 'Doctor deleted successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }



    public function updatePatient(Request $request, $id)
    {
        try {

            $patientData = $request->validate([
                'email' => 'sometimes|nullable|email',
                'password' => 'sometimes|nullable|string|min:6',
                'user_name' => 'sometimes|nullable|string',
                'address' => 'sometimes|nullable|string|max:5000',
                'phone_number' => 'sometimes|nullable|integer',
            ]);

            $patient = Patient::findOrFail($id);
            $user = User::findOrFail($patient->user_id);

            if (isset($patientData['email'])) {
                $user->email = $patientData['email'];
            }
            if (isset($patientData['password'])) {
                $user->password = Hash::make($patientData['password']);
            }
            if (isset($patientData['user_name'])) {
                $user->user_name = $patientData['user_name'];
            }
            $user->save();

            $patient->phone_number = $patientData['phone_number'] ?? $patient->phone_number;
            $patient->address = $patientData['address'] ?? $patient->address;
            $patient->email = $patientData['email'] ?? $patient->email;

            $patient->save();

            return response()->json(['message' => 'patient updated successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'patient not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
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
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Patient not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }


    // Update Insurance Company Details
    public function updateInsuranceCompany(Request $request, $id)
    {
        try {

            $insuranceData = $request->validate([
                'name' => 'sometimes|nullable|string',
                'description' => 'sometimes|string',
                'email' => 'sometimes|nullable|email',
                'password' => 'sometimes|nullable|string|min:6',
                'user_name' => 'sometimes|nullable|string',
                'address' => 'sometimes|nullable|string|max:5000',
                'phone_number' => 'sometimes|nullable|integer',
                'coverage_details' => 'sometimes|string'
            ]);

            $insurance = InsuranceCompany::findOrFail($id);
            $user = User::findOrFail($insurance->user_id);

            if (isset($insuranceData['email'])) {
                $user->email = $insuranceData['email'];
            }
            if (isset($insuranceData['password'])) {
                $user->password = Hash::make($insuranceData['password']);
            }
            if (isset($insuranceData['user_name'])) {
                $user->user_name = $insuranceData['user_name'];
            }
            $user->save();

            $insurance->phone_number = $insuranceData['phone_number'] ?? $insurance->phone_number;
            $insurance->address = $insuranceData['address'] ?? $insurance->address;
            $insurance->description = $insuranceData['description'] ?? $insurance->description;
            $insurance->coverage_details = $insuranceData['coverage_details'] ?? $insurance->coverage_details;
            $insurance->email = $insuranceData['email'] ?? $insurance->email;

            $insurance->save();

            return response()->json(['message' => 'insurance updated successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'insurance not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
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
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['message' => 'Insurance company not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
    }
}
}