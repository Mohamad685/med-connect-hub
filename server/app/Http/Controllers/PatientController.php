<?php

namespace App\Http\Controllers;

use App\Services\LabResultService;
use App\Services\PatientDiagnosisService;
use App\Services\PrescriptionService;
use App\Services\SymptomService;
use Illuminate\Http\Request;

class PatientDiagnosticController extends Controller
{
    protected $labResultService;
    protected $patientDiagnosisService;
    protected $prescriptionService;
    protected $symptomService;

    public function __construct(
        LabResultService $labResultService,
        PatientDiagnosisService $patientDiagnosisService,
        PrescriptionService $prescriptionService,
        SymptomService $symptomService
    ) {
        $this->labResultService = $labResultService;
        $this->patientDiagnosisService = $patientDiagnosisService;
        $this->prescriptionService = $prescriptionService;
        $this->symptomService = $symptomService;
    }

    public function getLabResults($patientId)
    {
        $labResults = $this->labResultService->getLabResults($patientId);
        return response()->json($labResults);
    }

    public function getDiagnosis($patientId)
    {
        $diagnosis = $this->patientDiagnosisService->getDiagnosis($patientId);
        return response()->json($diagnosis);
    }

    public function getPrescriptions($patientId)
    {
        $prescriptions = $this->prescriptionService->getPrescriptions($patientId);
        return response()->json($prescriptions);
    }

    public function getSymptoms($patientId)
    {
        $symptoms = $this->symptomService->Symptoms($patientId);
        return response()->json($symptoms);
    }
}
