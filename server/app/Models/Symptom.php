<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symptom extends Model
{
    protected $fillable = ['patient_id', 'doctor_id', 'symptom_description'];

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
        return $this->hasMany(InsuranceApproval::class, 'symptoms_id');
    }
}
