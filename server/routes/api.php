<?php

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
// Grouping admin routes for better organization
Route::group(['middleware' => ['jwt.verify', 'admin']], function() {
    Route::post('/register', [AuthController::class, 'register']);
    // Route::put('/user/{id}', 'AuthController@updateUser');
    // Route::delete('/user/{id}', 'AuthController@deleteUser');
});
