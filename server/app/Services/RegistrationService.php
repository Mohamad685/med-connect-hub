<?php

namespace App\Services;

use App\Models\Doctor;
use App\Models\InsuranceCompany;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegistrationService
{

    public function registerUser($data)
    {
        try {
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->validator->getMessageBag()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}