<?php

namespace App\Services;

use App\Models\MedicationHistory;

class PatientMedicationHistoriesService
{
    public function getMedicationHistories($patientId)
    {
        return MedicationHistory::where('patient_id', $patientId)->get();
    }
}