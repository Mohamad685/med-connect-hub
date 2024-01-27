<?php

namespace App\Http\Controllers;

use App\Services\PatientMedicalHistoriesService;
use App\Services\PatientMedicationHistoriesService;
use Illuminate\Http\Request;

class PatientHistoriesController extends Controller
{
    protected $patientMedicalHistoriesService;
    protected $patientMedicationHistoriesService;

    public function __construct(
        PatientMedicalHistoriesService $patientMedicalHistoriesService,
        PatientMedicationHistoriesService $patientMedicationHistoriesService
    ) {
        $this->patientMedicalHistoriesService = $patientMedicalHistoriesService;
        $this->patientMedicationHistoriesService = $patientMedicationHistoriesService;
    }

    public function fetchHistories(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|integer',
        ]);

        $patientId = $request->query('patient_id');

        try {
            $medicalHistories = $this->patientMedicalHistoriesService->getMedicalHistories($patientId);
            $medicationHistories = $this->patientMedicationHistoriesService->getMedicationHistories($patientId);

            return response()->json([
                'medicalHistories' => $medicalHistories,
                'medicationHistories' => $medicationHistories,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}


