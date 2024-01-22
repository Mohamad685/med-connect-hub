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

    public function findDoctorsByFullName(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $doctors = $this->getUsersService->getDoctorsByFullName($firstName, $lastName);
        return response()->json($doctors);
    }

    public function listPatients()
    {
        $patients = $this->getUsersService->getAllPatients();
        return response()->json($patients);
    }

    public function findPatientsByFullName(Request $request)
    {
        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $patients = $this->getUsersService->getPatientsByFullName($firstName, $lastName);
        return response()->json($patients);
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
