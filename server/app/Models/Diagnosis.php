<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    protected $fillable = ['patient_id', 'doctor_id', 'diagnosis_description'];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }
    public function insuranceApprovals()
    {
        return $this->hasMany(InsuranceApproval::class, 'diagnosis_id');
    }
}
