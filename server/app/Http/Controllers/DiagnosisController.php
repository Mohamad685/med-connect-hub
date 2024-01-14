<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use App\Models\Diagnosis;
use Illuminate\Support\Facades\Auth;

class DiagnosisController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createDiagnosis(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'diagnosis_description' => 'required|string',
        ]);

        $userId = Auth::id();

        $doctor =Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
        }

        try {
            $diagnosis = new Diagnosis([
                'patient_id' => $validatedData['patient_id'],
                'diagnosis_description' => $validatedData['diagnosis_description'],
                'doctor_id' => $doctor->id,
            ]);
            $diagnosis->save();

            return response()->json(['message' => 'Diagnosis recorded successfully', 'diagnosis' => $diagnosis]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
}
