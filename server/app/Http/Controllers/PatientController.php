<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function getLabResults($user_name)
{
    $user =User::where('user_name', $user_name)->first(); 
    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }
    $patient = $user->patient;

    if (!$patient) {
        return response()->json(["error" => "Patient not found"], 404);
    }

    if (auth()->user()->id !== $user->id) {
        return response()->json(["error" => 'Unauthorized'], 403);
    }

    $lab_results = $patient->labResults; 
    return response()->json($lab_results);
}

public function getMedicalHistory($user_name)
{
    $user =User::where('user_name', $user_name)->first(); 
    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }
    $patient = $user->patient;

    if (!$patient) {
        return response()->json(["error" => "Patient not found"], 404);
    }

    if (auth()->user()->id !== $user->id) {
        return response()->json(["error" => 'Unauthorized'], 403);
    }

    $medical_history = $patient->medicalHistories; 
    return response()->json($medical_history);
}

public function getMedicationHistory($user_name)
{
    $user =User::where('user_name', $user_name)->first(); 
    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }
    $patient = $user->patient;

    if (!$patient) {
        return response()->json(["error" => "Patient not found"], 404);
    }

    if (auth()->user()->id !== $user->id) {
        return response()->json(["error" => 'Unauthorized'], 403);
    }

    $medication_history = $patient->medicationHistories; 
    return response()->json($medication_history);
}
    
}


