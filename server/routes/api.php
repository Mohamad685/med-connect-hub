<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DoctorPatientsController;
use App\Http\Controllers\DoctorPatientSearchController;
use App\Http\Controllers\GetUsersController;
use App\Http\Controllers\HealthDataController;
use App\Http\Controllers\InsuranceApprovalController;
use App\Http\Controllers\openAIValidationController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientInsuranceController;
use App\Http\Controllers\PatientRegistrationController;
use App\Http\Controllers\SaveFcMTokenController;
use App\Http\Controllers\UserController;





Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::group(['middleware' => ['jwt.verify', 'admin']], function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::put('/doctor/{id}', [UserController::class, 'updateDoctor']);
    Route::put('/insurance/{id}', [UserController::class, 'updateInsuranceCompany']);
    Route::put('/patient/{id}', [UserController::class, 'updatePatient']);

    Route::delete('/doctor/{id}', [UserController::class, 'deleteDoctor']);
    Route::delete('/patient/{id}', [UserController::class, 'deletePatient']);
    Route::delete('/insurance/{id}', [UserController::class, 'deleteInsuranceCompany']);

    Route::get('/admin/doctors', [GetUsersController::class, 'listDoctors']);
    Route::get('/admin/specific-doctor', [GetUsersController::class, 'findDoctorsByFullName']);
    Route::get('/admin/patients', [GetUsersController::class, 'listPatients']);
    Route::get('/admin/specific-patient', [GetUsersController::class, 'findPatientsByFullName']);
    Route::get('/admin/insurance', [GetUsersController::class, 'listInsuranceCompanies']);
    Route::get('/admin/insurance/{id}', [GetUsersController::class, 'getInsuranceCompanyDetails']);
});


Route::group(['middleware' => ['jwt.verify', 'doctor']], function () {
    Route::post('/register-patient', [PatientRegistrationController::class, 'registerPatient']);
    Route::post('/diagnosis', [HealthDataController::class, 'handleCompositeRequest']);
    Route::post('/doctor/chat', [ChatController::class, 'storeMessage']);
    Route::get('/search-patients', [DoctorPatientSearchController::class, 'searchPatient']);
    Route::get('/doctors/{doctorId}/patients', [DoctorPatientsController::class, 'doctorPatients']);


});


Route::group(['middleware' => ['jwt.verify', 'patient']], function () {
    Route::get('/patient/{patientId}/lab-results', [PatientController::class, 'getPatientLabResults']);
    Route::get('/patient/{patientId}/diagnosis', [PatientController::class, 'getPatientDiagnosis']);
    Route::get('/patient/{patientId}/symptoms', [PatientController::class, 'getPatientSymptoms']);
    Route::get('/patient/{patientId}/prescriptions', [PatientController::class, 'getPatientPrescriptions']);
    // Route::post('/save-token', [SaveFcMTokenController::class, 'saveFcmToken']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});

Route::group(['middleware' => ['jwt.verify', 'insurance']], function () {
    Route::post('/insurance-request/{request}/update-status', [InsuranceApprovalController::class, 'updateStatus']);
    Route::get('/insurance/{patientId}/lab-results', [PatientController::class, 'getPatientLabResults']);
    Route::get('/insurance/{patientId}/diagnosis', [PatientController::class, 'getPatientDiagnosis']);
    Route::get('/insurance/{patientId}/prescriptions', [PatientController::class, 'getPatientPrescriptions']);
    Route::get('/insurance/{patientId}/symptoms', [PatientController::class, 'getPatientSymptoms']);
    Route::get('/insurance/{patientId}', [GetUsersController::class, 'getPatientById']);
    Route::get('/insurance-companies/{id}/patients', [PatientInsuranceController::class, 'relatedPatients']);
    Route::post('/validate-diagnosis/{id}', [openAIValidationController::class, 'validateDiagnosis']);

});

