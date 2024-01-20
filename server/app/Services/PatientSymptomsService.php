<?php

namespace App\Services;
use App\Models\Symptom;


class SymptomService
{
    public function Symptoms($patientId)
    {
        return Symptom::where('patient_id', $patientId)->get();
    }
}
