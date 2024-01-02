<?php

namespace App\Http\Controllers;

use App\Models\MedicalHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedicalHistoryController extends Controller
{
    public function __construct()
    {
        // Ensure the user is an authenticated doctor
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createMedicalHistory(Request $request)
{
    $validatedData = $request->validate([
        'patient_id' => 'required|exists:patients,id',
        'description' => 'required|string',
        'date_recorded' => 'required|date',
    ]);

    // Retrieve the currently authenticated user's ID
    $userId = Auth::id();

    // Check if the authenticated user is a doctor and exists in the doctors table
    $doctor = \App\Models\Doctor::where('user_id', $userId)->first();
    if (!$doctor) {
        return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
    }

    $medicalHistory = new MedicalHistory([
        'patient_id' => $validatedData['patient_id'],
        'description' => $validatedData['description'],
        'date_recorded' => $validatedData['date_recorded'],
        'doctor_id' => $doctor->id,
    ]);
    $medicalHistory->save();

    return response()->json(['message' => 'Medical history recorded successfully', 'medical_history' => $medicalHistory]);
}

}
