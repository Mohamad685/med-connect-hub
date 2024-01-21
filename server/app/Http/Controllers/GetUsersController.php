<?php

namespace App\Http\Controllers;

use App\Services\GetUsersService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class GetUsersController extends Controller
{
    protected $getUsersService;

    public function __construct(GetUsersService $getUsersService)
    {
        $this->getUsersService = $getUsersService;
    }

    public function listDoctors()
    {
        $doctors = $this->getUsersService->getAllDoctors();
        return response()->json($doctors);
    }

    public function getDoctorDetails($id)
    {
        try {
            $doctor = $this->getUsersService->getDoctorById($id);
            return response()->json($doctor);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Doctor not found'], 404);
        }
    }

    public function listPatients()
    {
        $patients = $this->getUsersService->getAllPatients();
        return response()->json($patients);
    }

    public function getPatientDetails($id)
    {
        try {
            $patient = $this->getUsersService->getPatientById($id);
            return response()->json($patient);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Patient not found'], 404);
        }
    }

    public function listInsuranceCompanies()
    {
        $insuranceCompanies = $this->getUsersService->getAllInsuranceCompanies();
        return response()->json($insuranceCompanies);
    }

    public function getInsuranceCompanyDetails($id)
    {
        try {
            $insuranceCompany = $this->getUsersService->getInsuranceCompanyById($id);
            return response()->json($insuranceCompany);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Insurance company not found'], 404);
        }
    }}
