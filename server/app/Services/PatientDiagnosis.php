<?php

namespace App\Services;

use App\Models\Diagnosis;

class DiagnosisService
{
    public function getDiagnosis($userId)
    {
        return Diagnosis::where('user_id', $userId)->get();
    }
}
