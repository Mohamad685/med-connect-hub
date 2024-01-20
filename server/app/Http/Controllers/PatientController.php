<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    protected $LabResultService;
    protected $PatientDiagnosisService;
    protected $PrescriptionService;
    protected $SymptomService;

}


