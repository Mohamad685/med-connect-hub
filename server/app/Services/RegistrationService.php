<?php

namespace App\Services;

use App\Models\Doctor;
use App\Models\InsuranceCompany;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegistrationService 
{

    public function registerUser($data)
    {
        $validatedData = Validator::make($data, [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:doctor,patient,insurance',
            'user_name' => 'required|string|unique:users',
            'profile_pic' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ])->validate(); 

        $user = new User;
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        $user->role = $validatedData['role']; 
        $user->user_name = $validatedData['user_name'];
        $user->save();

        if (isset($data['profile_pic']) && $data['profile_pic']->isValid()) {
            $path = $data['profile_pic']->store('profile_pictures', 'public');
            $user->profile_picture = $path;
            $user->save();
        }

        switch ($validatedData['role']) {
            case 'doctor':
                $doctorData = Validator::make($data, [
                    'first_name' => 'required|string',
                    'last_name' => 'required|string',
                    'specialty' => 'required|string',
                    'age' => 'required|integer',
                    'phone_number' => 'required|integer|unique:doctors',
                    'license_id' => 'required|string|unique:doctors',
                    'gender' => 'required|string',
                ])->validate();

                $doctor = new Doctor;
                $doctor->user_id = $user->id;
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
                $patientData = Validator::make($data, [
                    'first_name' => 'required|string',
                    'last_name' => 'required|string',
                    'address' => 'required|string',
                    'date_of_birth' => 'required|date',
                    'phone_number' => 'required|integer|unique:patients',
                    'gender' => 'required|string'
                ])->validate();

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
                $insuranceData = Validator::make($data, [
                    'name' => 'required|string|unique:insurance_companies',
                    'description' => 'required|string',
                    'phone_number' => 'required|integer|unique:insurance_companies',
                    'address' => 'required|string',
                    'coverage_details' => 'required|string',
                    'email' => 'required|string|unique:insurance_companies'
                ])->validate();

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
        return response()->json(['message' => 'User registered successfully.']);
    }

    
    public function updateDoctor(array $doctorData, $id)
    {
        try {
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

            return ['success' => true, 'message' => 'Doctor updated successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Doctor not found'];
        } catch (ValidationException $e) {
            return ['success' => false, 'message' => 'Validation failed', 'errors' => $e->errors()];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }

    public function updatePatient(array $patientData, $id)
    {
        try {
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

            return ['success' => true, 'message' => 'Patient updated successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Patient not found'];
        } catch (ValidationException $e) {
            return ['success' => false, 'message' => 'Validation failed', 'errors' => $e->errors()];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }

    public function updateInsuranceCompany(array $insuranceData, $id)
    {
        try {
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

            $insurance->name = $insuranceData['name'] ?? $insurance->name;
            $insurance->description = $insuranceData['description'] ?? $insurance->description;
            $insurance->phone_number = $insuranceData['phone_number'] ?? $insurance->phone_number;
            $insurance->address = $insuranceData['address'] ?? $insurance->address;
            $insurance->coverage_details = $insuranceData['coverage_details'] ?? $insurance->coverage_details;
            $insurance->email = $insuranceData['email'] ?? $insurance->email;
            $insurance->save();

            return ['success' => true, 'message' => 'Insurance company updated successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Insurance company not found'];
        } catch (ValidationException $e) {
            return ['success' => false, 'message' => 'Validation failed', 'errors' => $e->errors()];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }

    public function deleteDoctor($id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $user = User::findOrFail($doctor->user_id);

            $doctor->delete();
            $user->delete();

            return ['success' => true, 'message' => 'Doctor deleted successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Doctor not found'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }

    public function deletePatient($id)
    {
        try {
            $patient = Patient::findOrFail($id);
            $user = User::findOrFail($patient->user_id);

            $patient->delete();
            $user->delete();

            return ['success' => true, 'message' => 'Patient deleted successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Patient not found'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }

    public function deleteInsuranceCompany($id)
    {
        try {
            $insurance = InsuranceCompany::findOrFail($id);
            $user = User::findOrFail($insurance->user_id);

            $insurance->delete();
            $user->delete();

            return ['success' => true, 'message' => 'Insurance deleted successfully!'];
        } catch (ModelNotFoundException $e) {
            return ['success' => false, 'message' => 'Insurance not found'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'An unexpected error occurred', 'error' => $e->getMessage()];
        }
    }
}



