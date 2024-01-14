<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\MedicalHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedicalHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createMedicalHistory(Request $request)
{
    $validatedData = $request->validate([
        'patient_id' => 'required|exists:patients,id',
        'description' => 'required|string',
    ]);

    $userId = Auth::id();

    $doctor =Doctor::where('user_id', $userId)->first();
    if (!$doctor) {
        return response()->json(['error' => 'Doctor not found or not authenticated'], 404);
    }

    $medicalHistory = new MedicalHistory([
        'patient_id' => $validatedData['patient_id'],
        'description' => $validatedData['description'],
        'doctor_id' => $doctor->id,
    ]);
    $medicalHistory->save();

    return response()->json(['message' => 'Medical history recorded successfully', 'medical_history' => $medicalHistory]);
}

}
