<?php
namespace App\Services;

use App\Models\Doctor;
use App\Models\Symptom;
use App\Models\LabResult;
use App\Models\Diagnosis;
use App\Models\Prescription;
use Illuminate\Support\Facades\Auth;

class DiagnosisService
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

    public function createLabResult($patientId, $result)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $results = new LabResult([
            'patient_id' => $patientId,
            'result' => $result,
            'doctor_id' => $doctor->id,
        ]);
        $results->save();

        return $results;
    }

    public function createDiagnosis($patientId,$diagnosis_description)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $diagnosis = new Diagnosis([
            'patient_id' => $patientId,
            'diagnosis_description' => $diagnosis_description,
            'doctor_id' => $doctor->id,
        ]);
        $diagnosis->save();

        return $diagnosis;
    }

    public function createPrescription($patientId,$medication_description)
    {
        $userId = Auth::id();
        $doctor = Doctor::where('user_id', $userId)->first();

        if (!$doctor) {
            throw new \Exception('Doctor not found or not authenticated');
        }

        $medication = new Prescription([
            'patient_id' => $patientId,
            'medication_description' => $medication_description,
            'doctor_id' => $doctor->id,
        ]);
        $medication->save();

        return $medication;
    }

}
