<?php

namespace App\Services;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\MedicationHistory;
use App\Models\MedicalHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PatientRegistrationService
{
    public function handleRegistration($data)
    {
        $validatedData = Validator::make($data, [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'user_name' => 'required|string|unique:users',
            'profile_pic' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ])->validate();

        $user = new User;
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        $user->role = 'patient';
        $user->user_name = $validatedData['user_name'];
        $user->save();

        if (isset($data['profile_pic']) && $data['profile_pic']->isValid()) {
            $path = $data['profile_pic']->store('profile_pictures', 'public');
            $user->profile_picture = $path;
            $user->save();
        }
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

        $this->createMedicationHistory($data, $patient->id);
        $this->createMedicalHistory($data, $patient->id);
        return response()->json(['message' => 'Patient registered successfully']);
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
