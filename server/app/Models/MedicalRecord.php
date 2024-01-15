<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    protected $table = 'medical_records';
    protected $fillable = [
        'doctor_id',
        'patient_id',
        'medicalHistory_id',
        'medicationHistory_id',
        'labResults_id',
        'symptom_id',
        'prescription_id',
        'diagnosis_id',
    ];

    public function doctor()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_id');
    }

    public function patient()
    {
        return $this->belongsToMany(Patient::class, 'patient_id');
    }


    public function medicalHistory()
    {
        return $this->belongsToMany(medicalHistory::class, 'medicalHistory_id');
    }

    public function medicationHistory()
    {
        return $this->belongsToMany(MedicalHistory::class, 'medicationHistory_id');
    }

    public function labResults()
    {
        return $this->belongsToMany(LabResult::class, 'labResults_id');
    }

    public function symptom()
    {
        return $this->belongsToMany(Symptom::class, 'symptom_id');
    }

    public function prescription()
    {
        return $this->belongsToMany(Prescription::class, 'prescription_id');
    }

    public function diagnosis()
    {
        return $this->belongsToMany(Diagnosis::class, 'diagnosis_id');
    }
}
