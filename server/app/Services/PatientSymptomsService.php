<?php

namespace App\Services;
use App\Models\Symptom;


class PatientSymptomsService
{
    public function getSymptoms($patientId)
    {
        return Symptom::where('patient_id', $patientId)->get();
    }
}
