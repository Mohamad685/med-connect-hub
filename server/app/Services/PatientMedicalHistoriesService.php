<?php

namespace App\Services;

use App\Models\MedicalHistory;

class PatientMedicalHistoriesService
{
    public function getMedicalHistories($patientId)
    {
        return MedicalHistory::where('patient_id', $patientId)->get();
    }
}