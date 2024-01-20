<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use App\Services\LabResultService;
use App\Services\PatientDiagnosisService;
use App\Services\PrescriptionService;
use App\Services\SymptomService;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    protected $LabResultService;
    protected $PatientDiagnosisService;
    protected $PrescriptionService;
    protected $SymptomService;

    public function __construct(
        LabResultService $labResultService,
        PatientDiagnosisService $patientDiagnosisService,
        PrescriptionService $prescriptionService,
        SymptomService $symptomService,
    ) {
        $this->labResultService = $labResultService;
        $this->patientDiagnosisService = $patientDiagnosisService;
        $this->prescriptionService = $prescriptionService;
        $this->symptomService = $symptomService;
    }

    public function getLabResults($user_name)
    {
        $labResults = $this->LabResultService->getLabResults($user);

        return response()->json($labResults);
    }

}


