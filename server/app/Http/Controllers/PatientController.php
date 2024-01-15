<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function getLabResults($username)
{
    // First, find the user by username
    $user =User::where('username', $username)->first();
    
    if (!$user) {
        return response()->json(["error" => "User not found"], 404);
    }

    // Retrieve the patient associated with this user
    $patient = $user->patient;

    if (!$patient) {
        return response()->json(["error" => "Patient not found"], 404);
    }

    // Authorization check: ensure the authenticated user is the requested user
    if (auth()->user()->id !== $user->id) {
        return response()->json(["error" => 'Unauthorized'], 403);
    }

    // Retrieve lab results for the patient
    $lab_results = $patient->labResults; // labResults should be a defined relationship in the Patient model
    return response()->json($lab_results);
}

    
}

