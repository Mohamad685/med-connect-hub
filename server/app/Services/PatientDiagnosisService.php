<?php

namespace App\Services;

use App\Models\Diagnosis;

class PatientDiagnosisService
{
    public function getDiagnosis($patientId)
    {
        return Diagnosis::where('patient_id', $patientId)->get();
    }
}
