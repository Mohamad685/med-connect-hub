<?php

namespace App\Http\Controllers;
use App\Models\Doctor;
use App\Models\Prescription;
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

        $userId = Auth::id();
        $doctor =Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $medication = new Prescription([
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