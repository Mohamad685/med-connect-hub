<?php

namespace App\Http\Controllers;

use App\Services\DiagnosisService;
use App\Services\PatientMedicalHistoriesService;
use App\Services\PatientMedicationHistoriesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class HealthDataController extends Controller{
protected $diagnosisService;
protected $patientMedicalHistoriesService;
protected $patientMedicationHistoriesService;

    public function __construct(
        DiagnosisService $diagnosisService,
        PatientMedicalHistoriesService $patientMedicalHistoriesService,
        PatientMedicationHistoriesService $patientMedicationHistoriesService
    ) {
        $this->diagnosisService = $diagnosisService;
        $this->patientMedicalHistoriesService = $patientMedicalHistoriesService;
        $this->patientMedicationHistoriesService = $patientMedicationHistoriesService;
    }
    public function handleCompositeRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|integer',
            'symptom_description' => 'required|string|max:255',
            'result' => 'required|string|max:255',
            'diagnosis_description' => 'required|string|max:255',
            'medication_description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $patientId = $request->input('patient_id');
            $symptomDescription = $request->input('symptom_description');
            $testType = $request->input('result');
            $diagnosisDescription = $request->input('diagnosis_description');
            $medicationDescription = $request->input('medication_description');

            $symptom = $this->diagnosisService->createSymptom($patientId, $symptomDescription);
            $labResult = $this->diagnosisService->createLabResult($patientId, $testType);
            $diagnosis = $this->diagnosisService->createDiagnosis($patientId, $diagnosisDescription);
            $prescription = $this->diagnosisService->createPrescription($patientId, $medicationDescription);
            $medicalHistories = $this->patientMedicalHistoriesService->getMedicalHistories($patientId);
            $medicationHistories = $this->patientMedicationHistoriesService->getMedicationHistories($patientId);

            return response()->json([
                'symptom' => $symptom,
                'result' => $labResult,
                'diagnosis' => $diagnosis,
                'prescription' => $prescription,
                'medicalHistories' => $medicalHistories,
                'medicationHistories' => $medicationHistories
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}