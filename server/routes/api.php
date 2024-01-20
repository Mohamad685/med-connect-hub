<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\HealthDataController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientRegistrationController;
use App\Http\Controllers\MedicalHistoryController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\SymptomController;
use App\Http\Controllers\MedicationHistoryController;
use App\Http\Controllers\LabResultsController;
use App\Http\Controllers\UserController;





Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::put('/doctor/{id}', [AuthController::class, 'updateDoctor']);
    Route::delete('/doctor/{id}', [AuthController::class, 'deleteDoctor']);
    Route::put('/patient/{id}', [AuthController::class, 'updatePatient']);
    Route::delete('/patient/{id}', [AuthController::class, 'deletePatient']);
    Route::put('/insurance/{id}', [AuthController::class, 'updateInsuranceCompany']);
    Route::delete('/insurance/{id}', [AuthController::class, 'deleteInsuranceCompany']);
});


Route::group(['middleware' => ['jwt.verify', 'doctor']], function () {
    Route::post('/register-patient', [PatientRegistrationController::class, 'registerPatient']);
    Route::post('/diagnosis', [HealthDataController::class, 'handleCompositeRequest']);
});


Route::group(['middleware' => ['jwt.verify', 'patient']], function () {
    Route::get('/patient/lab-results/{username}', [PatientController::class, 'getLabResults']);
    Route::get('/patient/medical-history/{username}', [PatientController::class, 'getMedicalHistory']);
    Route::get('/patient/medication-history/{username}', [PatientController::class, 'getMedicationHistory']);
    Route::get('/patient/diagnosis/{username}', [PatientController::class, 'getDiagnosis']);
    Route::get('/patient/symptoms/{username}', [PatientController::class, 'getSymptoms']);
    Route::get('/patient/prescription/{username}', [PatientController::class, 'getPrescription']);
});

Route::group(['middleware'=>['jwt.verify','insurance']], function(){
    Route::post('/create-approvals',[InsuranceApprovalController::class, 'createRequest']);
    Route::post('/update-approvals',[InsuranceApprovalController::class, 'updateRequest']);
});