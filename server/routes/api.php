<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HealthDataController;
use App\Http\Controllers\InsuranceApprovalController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientRegistrationController;
use App\Http\Controllers\UserController;





Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::put('/doctor/{id}', [UserController::class, 'updateDoctor']);
    Route::delete('/doctor/{id}', [UserController::class, 'deleteDoctor']);
    Route::put('/patient/{id}', [UserController::class, 'updatePatient']);
    Route::delete('/patient/{id}', [UserController::class, 'deletePatient']);
    Route::put('/insurance/{id}', [UserController::class, 'updateInsuranceCompany']);
    Route::delete('/insurance/{id}', [UserController::class, 'deleteInsuranceCompany']);
});


Route::group(['middleware' => ['jwt.verify', 'doctor']], function () {
    Route::post('/register-patient', [PatientRegistrationController::class, 'registerPatient']);
    Route::post('/diagnosis', [HealthDataController::class, 'handleCompositeRequest']);
});


Route::group(['middleware' => ['jwt.verify', 'patient']], function () {
    Route::get('/patient/{patientId}/lab-results', [PatientController::class, 'getPatientLabResults']);
    // Route::get('/patient/{patientId}/medical-history', [PatientController::class, 'getMedicalHistory']);
    // Route::get('/patient/{patientId}/medication-history', [PatientController::class, 'getMedicationHistory']);
    Route::get('/patient/{patientId}/diagnosis', [PatientController::class, 'getPatientDiagnosis']);
    Route::get('/patient/{patientId}/symptoms', [PatientController::class, 'getPatientSymptoms']);
    Route::get('/patient/{patientId}/prescriptions', [PatientController::class, 'getPatientPrescriptions']);
});

Route::group(['middleware'=>['jwt.verify','insurance']], function(){
    Route::post('/insurance-request/{request}/update-status', [InsuranceApprovalController::class, 'updateStatus']);
    Route::get('/patient/{patientId}/lab-results', [PatientController::class, 'getPatientLabResults']);
Route::get('/patient/{patientId}/diagnosis', [PatientController::class, 'getPatientDiagnosis']);
Route::get('/patient/{patientId}/prescriptions', [PatientController::class, 'getPatientPrescriptions']);
Route::get('/patient/{patientId}/symptoms', [PatientController::class, 'getPatientSymptoms']);

});