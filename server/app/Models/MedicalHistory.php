<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalHistory extends Model
{
    protected $fillable = ['patient_id', 'description', 'doctor_id'];

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
        return $this->hasMany(InsuranceApproval::class, 'medical_histories_id');
    }
}
