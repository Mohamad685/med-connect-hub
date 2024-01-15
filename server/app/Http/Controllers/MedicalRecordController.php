<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use Illuminate\Support\Facades\Validator;

class MedicalRecordController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'medicalHistory_id' => 'required|exists:medical_histories,id',
            'medicationHistory_id' => 'required|exists:medication_histories,id',
            'labResults_id' => 'required|exists:lab_results,id',
            'symptom_id' => 'required|exists:symptoms,id',
            'prescription_id' => 'required|exists:prescriptions,id',
            'diagnosis_id' => 'required|exists:diagnoses,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $medicalRecord = MedicalRecord::create([
            'doctor_id' => $request->doctor_id,
            'patient_id' => $request->patient_id,
            'medicalHistory_id' => $request->medicalHistory_id,
            'medicationHistory_id' => $request->medicationHistory_id,
            'labResults_id' => $request->labResults_id,
            'symptom_id' => $request->symptom_id,
            'prescription_id' => $request->prescription_id,
            'diagnosis_id' => $request->diagnosis_id
        ]);

        return response()->json([
            'message' => 'Medical record created successfully',
            'medicalRecord' => $medicalRecord
        ], 201);
    }
}
