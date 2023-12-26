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
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
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

    // public function register(Request $request)
    // {
    //     // Common Validation
    //     $validatedData = $request->validate([
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|min:6',
    //         'role' => 'required|in:doctor,patient,insurance',
    //         'name' => 'required|string', // Add common fields validation like name
    //         // ... add any other common fields you need
    //     ]);

    //     // Create the User
    //     $user = new User;
    //     $user->email = $validatedData['email'];
    //     $user->password = Hash::make($validatedData['password']);
    //     $user->role = $validatedData['role']; // Set the role
    //     // ... set any other common fields here
    //     $user->save();

    //     // Handle specific roles
    //     switch ($validatedData['role']) {
    //         case 'doctor':
    //             // Validate additional doctor-specific data
    //             $doctorData = $request->validate([
    //                 'first_name' => 'required|string',
    //                 'last_name' => 'required|string',
    //                 'specialty' => 'required|string',
    //                 'age' => 'required|integer',
    //                 'phone_number' => 'required|integer',
    //                 'license_id' => 'required|integer|unique:doctors',
    //                 // ... add other doctor-specific fields
    //             ]);

    //             // Create Doctor Profile or equivalent for storing doctor's details
    //             $doctor = new Doctor; // Assuming you have a Doctor model corresponding to the schema
    //             $doctor->user_id = $user->id; // Associate with the user
    //             $doctor->first_name = $doctorData['first_name'];
    //             $doctor->last_name = $doctorData['last_name'];
    //             $doctor->specialty = $doctorData['specialty'];
    //             $doctor->age = $doctorData['age'];
    //             $doctor->phone_number = $doctorData['phone_number'];
    //             $doctor->license_id = $doctorData['license_id'];
    //             // ... set other doctor-specific fields
    //             $doctor->save();

    //             break;
    //         case 'patient':
    //             // Validate additional patient-specific data
    //             $patientData = $request->validate([
    //                 'first_name' => 'required|string',
    //                 'last_name' => 'required|string',
    //                 'adress' => 'required|string',
    //                 'age' => 'required|integer',
    //                 'phone_number' => 'required|integer',
    //                 // ... add other patient-specific fields as needed
    //             ]);

    //             // Create Patient Profile
    //             $patient = new Patient; // Assuming you have a Patient model corresponding to the schema
    //             $patient->user_id = $user->id; // Associate with the user
    //             $patient->first_name = $patientData['first_name'];
    //             $patient->last_name = $patientData['last_name'];
    //             $patient->adress = $patientData['adress'];
    //             $patient->age = $patientData['age'];
    //             $patient->phone_number = $patientData['phone_number'];
    //             // ... set other patient-specific fields
    //             $patient->save();

    //             break;
    //         case 'insurance_approval':
    //             // Validate insurance-specific data
    //             $insuranceData = $request->validate([
    //                 'name' => 'required|string',
    //                 'description' => 'required|string',
    //                 'phone_number' => 'required|integer',
    //                 'email' => 'required|string',
    //                 'address' => 'required|string',
    //             ]);

    //             // Create InsuranceApproval
    //             $insurance_companies = new InsuranceCompany;
    //             $insurance_companies->user_id = $user->id;
    //             $insurance_companies->name = $insurance_companies['name'];
    //             $insurance_companies->decription = $insurance_companies['decription'];
    //             $insurance_companies->phone_number = $insurance_companies['phone_number'];
    //             $insurance_companies->email = $insurance_companies['email'];
    //             $insurance_companies->address = $insurance_companies['address'];

    //             $insurance_companies->save();

    //             break;
    //         default:
    //             return response()->json(['error' => 'Unrecognized role or action'], 400);
    //     }

    //     // Return a response or redirect
    //     return response()->json(['message' => 'User registered successfully!']);
    // }


    // public function updateUser(Request $request, $id)
    // {
    //     $this->authorizeAdmin();

    //     $request->validate([
    //         'user_name' => 'sometimes|string|max:255',
    //         'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
    //         'password' => 'sometimes|string|min:6',
    //         'role' => 'sometimes|string|in:doctor,patient,insurance',
    //     ]);

    //     $user = User::findOrFail($id);
    //     $user->fill($request->only(['user_name', 'email', 'role']));

    //     if ($request->filled('password')) {
    //         $user->password = Hash::make($request->password);
    //     }

    //     $user->save();

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'User updated successfully',
    //         'user' => $user
    //     ]);
    // }

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
}
