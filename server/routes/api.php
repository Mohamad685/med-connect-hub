<?php

use App\Http\Controllers\AuthController;

// Grouping admin routes for better organization
Route::group(['middleware' => ['jwt.verify', 'admin']], function() {
    Route::post('/register', 'AuthController@register');
    // Route::post('/login', 'AuthController@login');
    // Route::put('/user/{id}', 'AuthController@updateUser');
    // Route::delete('/user/{id}', 'AuthController@deleteUser');
});
