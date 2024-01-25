<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorPatientsController extends Controller
{
    public function doctorPatients($id)
    {
        $doctor = Doctor::with('patients')->find($id);

        if (!$doctor) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }

        return response()->json($doctor->patients);
    }
}
