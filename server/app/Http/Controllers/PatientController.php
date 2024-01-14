<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function getLabResults($patientId){
        $patient=Patient::find($patientId);
        if(auth()->user()->id !== $patient -> id){
            return response()->json(["error"=> 'Unauthorized'],403);
        }
        $medicalHistory = $patient->medicalHistories; // Assuming a one-to-many relationship
        return response()->json($medicalHistory);
    }
    }
