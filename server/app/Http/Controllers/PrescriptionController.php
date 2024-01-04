<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function __construct()
    {
        // Ensure the user is an authenticated doctor
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createPrescription(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'medication_description' => 'required|string',
        ]);

        // Retrieve the currently authenticated user's ID
        $userId = Auth::id();

        // Check if the authenticated user is a doctor and exists in the doctors table
        $doctor = \App\Models\Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $medication = new Medication([
                'patient_id' => $validatedData['patient_id'],
                'medication_description' => $validatedData['medication_description'],
                'doctor_id' => $doctor->id,
            ]);
            $medication->save();

            return response()->json(['message' => 'medication recorded successfully', 'medication' => $medication]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }


    }
}