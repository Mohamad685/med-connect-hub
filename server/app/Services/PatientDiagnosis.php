<?php

namespace App\Services;

use App\Models\Diagnosis;

class PatientDiagnosisService
{
    public function getDiagnosis($userId)
    {
        return Diagnosis::where('user_id', $userId)->get();
    }
}
