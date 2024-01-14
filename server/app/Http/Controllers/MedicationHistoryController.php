<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Support\Facades\Auth;
use App\Models\MedicationHistory;
use Illuminate\Http\Request;

class MedicationHistoryController extends Controller
{
    public function __construct()
    {
        // Ensure the user is an authenticated doctor
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createMedication(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'medication_name' => 'required|string',
        ]);
        $userId = Auth::id();

        $doctor =Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $medication = new MedicationHistory([
                'patient_id' => $validatedData['patient_id'],
                'medication_description' => $validatedData['medication_description'],
                'doctor_id' => $doctor->id,
            ]);
            $medication->save();

            return response()->json(['message' => 'Medication recorded successfully', 'medication' => $medication]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}
