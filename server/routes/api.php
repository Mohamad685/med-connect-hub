<?php

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['jwt.verify', 'admin']], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::put('/doctor/{id}', [AuthController::class, 'updateDoctor']);
    Route::delete('/doctor/{id}', [AuthController::class, 'deleteDoctor']);
    Route::put('/patient/{id}', [AuthController::class, 'updatePatient']);
});
