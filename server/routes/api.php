<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiagnosisController;
use App\Http\Controllers\PatientRegistrationController;
use App\Http\Controllers\MedicalHistoryController;


Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::put('/doctor/{id}', [AuthController::class, 'updateDoctor']);
    Route::delete('/doctor/{id}', [AuthController::class, 'deleteDoctor']);
    Route::put('/patient/{id}', [AuthController::class, 'updatePatient']);
    Route::delete('/patient/{id}', [AuthController::class, 'deletePatient']);
    Route::put('/insurance/{id}', [AuthController::class, 'updateInsuranceCompany']);
    Route::delete('/insurance/{id}', [AuthController::class, 'deleteInsuranceCompany']);
});


Route::group(['middleware' => ['jwt.verify', 'doctor']], function() {
    Route::post('/register-patient', [PatientRegistrationController::class, 'registerPatient']);
});

Route::group(['middleware' => ['jwt.verify', 'doctor']], function() {
    Route::post('/medical-history/create', [MedicalHistoryController::class, 'createMedicalHistory']);
    Route::post('/diagnosis/create', [DiagnosisController::class, 'createDiagnosis']);

});
