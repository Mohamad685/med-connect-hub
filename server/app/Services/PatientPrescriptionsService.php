<?php

namespace App\Services;

use App\Models\Prescription;

class PatientPrescriptionsService
{
    public function getPrescriptions($patientId)
    {
        return Prescription::where('patient_id', $patientId)->get();
    }
}
