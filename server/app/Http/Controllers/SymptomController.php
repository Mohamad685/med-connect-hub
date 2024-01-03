<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Symptom;
use Illuminate\Support\Facades\Auth;

class SymptomController extends Controller
{

    public function __construct()
    {
        // Ensure the user is an authenticated doctor
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createSymptom(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'symptom_description' => 'required|string',
        ]);

        // Retrieve the currently authenticated user's ID
        $userId = Auth::id();

        // Check if the authenticated user is a doctor and exists in the doctors table
        $doctor = \App\Models\Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $symptom = new Symptom([
                'patient_id' => $validatedData['patient_id'],
                'symptom_description' => $validatedData['symptom_description'],
                'doctor_id' => $doctor->id,
            ]);
            $symptom->save();

            return response()->json(['message' => 'symptom recorded successfully', 'symptom' => $symptom]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }


    }
}