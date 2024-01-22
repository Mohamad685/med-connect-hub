<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [


        'user_id',
        'first_name',
        'last_name',
        'address',
        'age',
        'gender',
        'phone_number'
    ];

    // public function user()
    // {
    //     return $this->morphOne(User::class, 'userable');
    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function insuranceCompany()
    {
        return $this->belongsTo(InsuranceCompany::class);
    }

    public function medicalHistories()
    {
        return $this->hasMany(MedicalHistory::class);
    }

    public function symptoms()
    {
        return $this->hasMany(Symptom::class);
    }

    public function labResults()
    {
        return $this->hasMany(LabResult::class);
    }

    public function medicationHistories()
    {
        return $this->hasMany(MedicationHistory::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function diagnosis()
    {
        return $this->hasMany(Diagnosis::class);
    }
}

