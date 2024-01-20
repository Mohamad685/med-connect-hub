<?php

namespace App\Http\Controllers;

use App\Services\PatientDiagnosisService;
use App\Services\PatientLabResultsService;
use App\Services\PatientPrescriptionsService;
use App\Services\PatientSymptomsService;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    protected $labResultService;
    protected $patientDiagnosisService;
    protected $prescriptionService;
    protected $symptomService;

    public function __construct(
        PatientLabResultsService $labResultService,
        PatientDiagnosisService $patientDiagnosisService,
        PatientPrescriptionsService $prescriptionService,
        PatientSymptomsService $symptomService
    ) {
        $this->labResultService = $labResultService;
        $this->patientDiagnosisService = $patientDiagnosisService;
        $this->prescriptionService = $prescriptionService;
        $this->symptomService = $symptomService;
    }

    public function getPatientLabResults($patientId)
    {
        $labResults = $this->labResultService->getLabResults($patientId);
        return response()->json($labResults);
    }

    public function getPatientDiagnosis($patientId)
    {
        $diagnosis = $this->patientDiagnosisService->getDiagnosis($patientId);
        return response()->json($diagnosis);
    }

    public function getPatientPrescriptions($patientId)
    {
        $prescriptions = $this->prescriptionService->getPrescriptions($patientId);
        return response()->json($prescriptions);
    }

    public function getPatientSymptoms($patientId)
    {
        $symptoms = $this->symptomService->getSymptoms($patientId);
        return response()->json($symptoms);
    }
}
