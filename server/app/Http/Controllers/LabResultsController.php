<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\LabResult;
use Illuminate\Http\Request;

class LabResultsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'role:doctor']);
    }

    public function createResult(Request $request)
    {
        $validationData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'test_type' => 'required',
            'result' => 'nullable|string',
        ]);

        $userId = Auth::id();

        $doctor = \App\Models\Doctor::where('user_id', $userId)->first();
        if (!$doctor) {
            return response()->json(['error' => 'Doctor not found or not Authorized'], 404);

        }

        try {
            $results = new LabResult([
                'patient_id' => $validationData['patient_id'],
                'doctor_id' => $doctor->id,
                'test_type' => $validationData['test_type'],
                'result' => isset($validationData['result']),

            ]);
            $results->save();

            return response()->json(['message' => 'Lab Results recorded successfully', 'results' => $results]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
