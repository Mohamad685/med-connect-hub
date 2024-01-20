<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InsuranceApproval extends Model
{
    use HasFactory;
    protected $fillable = [
        'medical_histories_id', 'medication_histories_id', 'insurance_company_id',
        'lab_result_id', 'symptoms_id', 'prescription_id', 'diagnosis_id', 'status'
    ];

    public function medicalHistory()
{
    return $this->belongsTo(MedicalHistory::class, 'medical_histories_id');
}

public function medicationHistory()
{
    return $this->belongsTo(MedicationHistory::class, 'medical_histories_id');
}

public function insuranceCompany()
{
    return $this->belongsTo(InsuranceCompany::class, 'medical_histories_id');
}

public function labResult ()
{
    return $this->belongsTo(LabResult::class, 'medical_histories_id');
}

public function symptom()
{
    return $this->belongsTo(Symptom::class, 'medical_histories_id');
}

public function prescription()
{
    return $this->belongsTo(Prescription::class, 'medical_histories_id');
}

public function diagnosis()
{
    return $this->belongsTo(Diagnosis::class, 'medical_histories_id');
}

}
