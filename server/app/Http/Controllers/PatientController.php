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
        $lab_result = $patient->lab_results;
        return response()->json($lab_result);
    }
    }
