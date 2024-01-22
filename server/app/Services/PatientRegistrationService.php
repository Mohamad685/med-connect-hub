<?php

namespace App\Services;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\MedicationHistory;
use App\Models\MedicalHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PatientRegistrationService
{
    public function handleRegistration($data)
    {
        try {
            
            $messages = [
                'email.unique' => 'The email has already been taken.',
                'user_name.unique' => 'The username has already been taken.',
                'phone_number.unique' => 'The phone number has already been registered.'
            ];

            $validator = Validator::make($data, [
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'user_name' => 'required|string|unique:users',
                'profile_pic' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'address' => 'required|string',
                'age' => 'required|integer',
                'phone_number' => 'required|integer|unique:patients',
                'gender' => 'required|string'
            ], $messages);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();

            $user = new User;
            $user->email = $validatedData['email'];
            $user->password = Hash::make($validatedData['password']);
            $user->role = 'patient';
            $user->user_name = $validatedData['user_name'];

            if (isset($data['profile_pic']) && $data['profile_pic']->isValid()) {
                $path = $data['profile_pic']->store('profile_pictures', 'public');
                $user->profile_picture = $path;
            }
            $user->save();

            $patient = new Patient;
            $patient->user_id = $user->id;
            $patient->first_name = $validatedData['first_name'];
            $patient->last_name = $validatedData['last_name'];
            $patient->address = $validatedData['address'];
            $patient->age = $validatedData['age'];
            $patient->gender = $validatedData['gender'];
            $patient->phone_number = $validatedData['phone_number'];
            $patient->save();

            $this->createMedicationHistory($data, $patient->id);
            $this->createMedicalHistory($data, $patient->id);

            return response()->json([
                'message' => 'Patient registered successfully',
                'patient' => $patient
                
            ],200);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    private function createMedicationHistory($data, $patientId)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            throw new \Exception('Doctor is not found or not authenticated');
        }
        $medicationHistory = new MedicationHistory([
            'patient_id' => $patientId,
            'medication_description' => $data['medication_description'],
            'doctor_id' => $doctor->id,
        ]);
        $medicationHistory->save();
    }
    private function createMedicalHistory($data, $patientId)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            throw new \Exception("Doctor is not found or not authenticated");
        }
        $medicalHistory = new MedicalHistory([
            'patient_id' => $patientId,
            'description' => $data['description'],
            'doctor_id' => $doctor->id,
        ]);
        $medicalHistory->save();

    }

}
