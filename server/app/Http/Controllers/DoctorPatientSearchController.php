<?php

namespace App\Http\Controllers;

use App\Services\DoctorPatientSearchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorPatientSearchController extends Controller
{
    protected $doctorPatientSearchService;
    public function __construct(DoctorPatientSearchService $doctorPatientSearchService)
    {
        $this->doctorPatientSearchService = $doctorPatientSearchService;
    }

    public function searchPatient(Request $request)
{
    $doctorId = Auth::user()->doctor->id; 
    $searchTerm = $request->input('name'); 

    $patients = $this->doctorPatientSearchService->doctorSearch($doctorId, $searchTerm);

    return response()->json($patients);
}
}
