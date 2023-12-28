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
            // ... set any other common fields here
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
                        'phone_number' => 'required|integer',
                        'license_id' => 'required|integer|unique:doctors',
                        'gender' => 'required|string',

                        // ... add other doctor-specific fields
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

                    // ... set other doctor-specific fields
                    $doctor->save();

                    break;
                case 'patient':
                    // Validate additional patient-specific data
                    $patientData = $request->validate([
                        'first_name' => 'required|string',
                        'last_name' => 'required|string',
                        'adress' => 'required|string',
                        'age' => 'required|integer',
                        'phone_number' => 'required|integer',
                    ]);

                    // Create Patient Profile
                    $patient = new Patient;
                    $patient->user_id = $user->id;
                    $patient->first_name = $patientData['first_name'];
                    $patient->last_name = $patientData['last_name'];
                    $patient->adress = $patientData['adress'];
                    $patient->age = $patientData['age'];
                    $patient->phone_number = $patientData['phone_number'];
                    // ... set other patient-specific fields
                    $patient->save();

                    break;
                case 'insurance_approval':
                    // Validate insurance-specific data
                    $insuranceData = $request->validate([
                        'name' => 'required|string',
                        'description' => 'required|string',
                        'phone_number' => 'required|integer',
                        'email' => 'required|string',
                        'address' => 'required|string',
                    ]);

                    // Create InsuranceApproval
                    $insurance_companies = new InsuranceCompany;
                    $insurance_companies->user_id = $user->id;
                    $insurance_companies->name = $insuranceData['name'];
                    $insurance_companies->decription = $insuranceData['decription'];
                    $insurance_companies->phone_number = $insuranceData['phone_number'];
                    $insurance_companies->email = $insuranceData['email'];
                    $insurance_companies->address = $insuranceData['address'];
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
        $doctor = Doctor::findOrFail($id);
        $user = User::findOrFail($doctor->user_id);
        
        // Validate request data for Doctor and User details...
        $doctorData = $request->validate([
            // Include all necessary validation rules
            
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'speciality' => 'required|string',
           'license_id' => 'required|integer'

        ]);

        try {


            // Update User related data
            $user->email = $doctorData['email'];
            $user->password = Hash::make($doctorData['password']);
            $user->role = $doctorData['role']; // Set the role
            $user->user_name = $doctorData['user_name'];
            $user->save();

            // Update Doctor specific data
            $doctor->age = $doctorData['age'];
            $doctor->phone_number = $doctorData['phone_number'];

            // ... other doctor fields
            $doctor->save();

            return response()->json(['message' => 'Doctor updated successfully!']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    // Update Patient Details
    // public function updatePatient(Request $request, $patientId)
    // {
    //     // Similar structure to updateDoctor...
    // }

    // // Update Insurance Company Details
    // public function updateInsuranceCompany(Request $request, $companyId)
    // {
    //     // Similar structure to updateDoctor...
    // }
}


// public function deleteUser($id)
// {
//     $this->authorizeAdmin();

//     $user = User::findOrFail($id);
//     $user->delete();

//     return response()->json([
//         'status' => 'success',
//         'message' => 'User deleted successfully',
//     ]);
// }

// private function authorizeAdmin()
// {
//     if (!Auth::check() || Auth::user()->role !== 'admin') {
//         abort(response()->json([
//             'status' => 'error',
//             'message' => 'Unauthorized - Only admins can perform this action',
//         ], 403));
//     }
// }
// }
