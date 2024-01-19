<?php
namespace App\Services;

use App\Models\Doctor;
use App\Models\Symptom;
use App\Models\LabResult;
use App\Models\Diagnosis;
use App\Models\Prescription;
use Illuminate\Support\Facades\Auth;

class HealthcareService
{
    public function createSymptom($patientId, $symptomDescription)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $symptom = new Symptom([
            'patient_id' => $patientId,
            'symptom_description' => $symptomDescription,
            'doctor_id' => $doctor->id,
        ]);
        $symptom->save();

        return $symptom;
    }

    public function createLabResult($patientId, $test_type)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $results = new LabResult([
            'patient_id' => $patientId,
            'test_type' => $test_type,
            'doctor_id' => $doctor->id,
        ]);
        $results->save();

        return $results;
    }

    public function createDiagnosis($patientId,)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $results = new Diagnosis([
            'patient_id' => $patientId,
            'test_type' => $test_type,
            'doctor_id' => $doctor->id,
        ]);
        $results->save();

        return $results;
    }

    public function createPrescription($validatedData)
    {
        // Logic from PrescriptionController's createPrescription method
    }

    // Common methods used by all functionalities, like handling doctor lookup, can be added here as well.
}
