<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicationHistory extends Model
{
    protected $fillable = ['patient_id', 'doctor_id', 'medication_name' ];

public function patient()
{
    return $this->belongsTo(Patient::class, 'patient_id');
}

public function doctor()
{
    return $this->belongsTo(Doctor::class, 'doctor_id');
}}
