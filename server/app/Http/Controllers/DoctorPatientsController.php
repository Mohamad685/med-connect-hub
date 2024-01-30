<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorPatientsController extends Controller
{
    public function doctorPatients($doctorId)
    {
        $doctor = Doctor::with(['patients' => function ($query) {
            $query->with(['user' => function ($userQuery) {
                $userQuery->select('users.id', 'profile_picture');
            }])->select('*'); 
        }])->find($doctorId);

        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }

        $patientsData = $doctor->patients->map(function ($patient) {
            $patientData = $patient->toArray(); 
            $patientData['profile_pic'] = $patient->user->profile_picture ?? 'default.jpg'; 
            return $patientData;
        });

        return response()->json($patientsData);
    }
}
