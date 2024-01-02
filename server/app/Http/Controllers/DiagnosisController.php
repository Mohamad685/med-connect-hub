<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diagnosis;
use Illuminate\Support\Facades\Auth;

class DiagnosisController extends Controller
{
    public function __construct()
    {
        // Ensure the user is an authenticated doctor
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createDiagnosis(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'diagnosis_description' => 'required|string',
            'date_diagnosed' => 'required|date',
        ]);

        // Retrieve the currently authenticated user's ID
        $userId = Auth::id();

        // Check if the authenticated user is a doctor and exists in the doctors table
        $doctor = \App\Models\Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $diagnosis = new Diagnosis([
                'patient_id' => $validatedData['patient_id'],
                'diagnosis_description' => $validatedData['diagnosis_description'],
                'date_diagnosed' => $validatedData['date_diagnosed'],
                'doctor_id' => $doctor->id,
            ]);
            $diagnosis->save();

            return response()->json(['message' => 'Diagnosis recorded successfully', 'diagnosis' => $diagnosis]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
}
