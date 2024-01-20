<?php

namespace App\Services;

use App\Models\LabResult;

class LabResultService
{
    public function getLabResults($patientId)
    {
        return LabResult::where('patient_id', $patientId)->get();
    }
}
