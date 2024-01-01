<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\InsuranceCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function login(Request $request)
    {
        // Validate the incoming request data
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
            // 'user' => $user,
            'authorisation' => [
                'token' => $token,
                // 'type' => 'bearer',
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

    public function register(Request $request)
    {

        try {
            // Common Validation
            $validatedData = $request->validate([
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'role' => 'required|in:doctor,patient,insurance',
                'user_name' => 'required|string|unique:users',

            ]);

            // Create the User
            $user = new User;
            $user->email = $validatedData['email'];
            $user->password = Hash::make($validatedData['password']);
            $user->role = $validatedData['role']; // Set the role
            $user->user_name = $validatedData['user_name'];
            $user->save();

            // Handle specific roles
            switch ($validatedData['role']) {
                case 'doctor':
                    // Validate additional doctor-specific data
                    $doctorData = $request->validate([
                        'first_name' => 'required|string',
                        'last_name' => 'required|string',
                        'specialty' => 'required|string',
                        'age' => 'required|integer',
                        'phone_number' => 'required|integer|unique:doctors',
                        'license_id' => 'required|integer|unique:doctors',
                        'gender' => 'required|string',
                    ]);

                    // Create Doctor Profile or equivalent for storing doctor's details
                    $doctor = new Doctor;
                    $doctor->user_id = $user->id; // Associate with the user
                    $doctor->first_name = $doctorData['first_name'];
                    $doctor->last_name = $doctorData['last_name'];
                    $doctor->specialty = $doctorData['specialty'];
                    $doctor->age = $doctorData['age'];
                    $doctor->phone_number = $doctorData['phone_number'];
                    $doctor->license_id = $doctorData['license_id'];
                    $doctor->gender = $doctorData['gender'];
                    $doctor->save();

                    break;
                case 'patient':
                    // Validate additional patient-specific data
                    $patientData = $request->validate([
                        'first_name' => 'required|string',
                        'last_name' => 'required|string',
                        'address' => 'required|string',
                        'date_of_birth' => 'required|date',
                        'phone_number' => 'required|integer|unique',
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

                    break;
                case 'insurance':
                    // Validate insurance-specific data
                    $insuranceData = $request->validate([
                        'name' => 'required|string|unique:insurance_companies',
                        'description' => 'required|string',
                        'phone_number' => 'required|integer|unique:insurance_companies',
                        'address' => 'required|string',
                        'coverage_details' => 'required|string',
                        'email' => 'required|string|unique:insurance_companies'
                    ]);

                    // Create InsuranceApproval
                    $insurance_companies = new InsuranceCompany;
                    $insurance_companies->user_id = $user->id;
                    $insurance_companies->name = $insuranceData['name'];
                    $insurance_companies->email = $insuranceData['email'];
                    $insurance_companies->description = $insuranceData['description'];
                    $insurance_companies->phone_number = $insuranceData['phone_number'];
                    $insurance_companies->address = $insuranceData['address'];
                    $insurance_companies->coverage_details = $insuranceData['coverage_details'];
                    $insurance_companies->save();

                    break;
                default:
                    return response()->json(['error' => 'Unrecognized role or action'], 400);
            }

            // Return a response or redirect
            return response()->json(['message' => 'User registered successfully!']);
        } catch (\Exception $error) {
            return response()->json(['message' => $error->getMessage()]);
        }
    }


    // Update Doctor Details
    public function updateDoctor(Request $request, $id)
    {
        try {

            // Validate request data for Doctor and User details.
            $doctorData = $request->validate([
                'email' => 'sometimes|nullable|email',
                'password' => 'sometimes|nullable|string|min:6',
                'user_name' => 'sometimes|nullable|string',
                'specialty' => 'sometimes|nullable|string',
                'age' => 'sometimes|nullable|integer',
                'phone_number' => 'sometimes|nullable|integer',
                'license_id' => 'sometimes|nullable|integer'
            ]);

            // Retrieve the doctor and associated user.
            $doctor = Doctor::findOrFail($id);
            $user = User::findOrFail($doctor->user_id);

            // Update User related data if present.
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

            // Update Doctor specific data.
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

            // Delete the doctor record.
            $doctor->delete();
            $user->delete();

            return response()->json(['message' => 'Doctor deleted successfully!']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred', 'error' => $e->getMessage()], 500);
        }
    }



    // Update Patient Details
    public function updatePatient(Request $request, $id)
    {
        try {

            // Validate request data for Doctor and User details.
            $patientData = $request->validate([
                'email' => 'sometimes|nullable|email',
                'password' => 'sometimes|nullable|string|min:6',
                'user_name' => 'sometimes|nullable|string',
                'address' => 'sometimes|nullable|string|max:5000',
                'phone_number' => 'sometimes|nullable|integer',
            ]);

            // Retrieve the patient and associated user.
            $patient = Patient::findOrFail($id);
            $user = User::findOrFail($patient->user_id);

            // Update User related data if present.
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

            // Update patient specific data.
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

            // Delete the patient record.
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

            // Validate request data for Doctor and User details.
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

            // Retrieve the insurance and associated user.
            $insurance = InsuranceCompany::findOrFail($id);
            $user = User::findOrFail($insurance->user_id);

            // Update User related data if present.
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

            // Update insurance specific data.
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

        // Delete the insu$insurance record.
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