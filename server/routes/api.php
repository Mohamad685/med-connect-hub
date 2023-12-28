<?php

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['jwt.verify', 'admin']], function() {
    Route::post('/register', [AuthController::class, 'register']);
    Route::put('/user/{id}', [AuthController::class, 'updateDoctor']);
    // Route::delete('/user/{id}', 'AuthController@deleteUser');
});
