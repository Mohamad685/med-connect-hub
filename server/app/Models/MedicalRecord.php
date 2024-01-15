<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    protected $table= 'medical_records';
    protected $fillable=[
        'doctor_id',
        'patient_id',
        'medicalHistory_id',
        'medicationHistory_id',
        'labResults_id',
        'symptom_i',
        'prescription_id',
        'diagnosis_id',
    ];    

    
}
