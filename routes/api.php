<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// This is for authenticated routes (after the user logs in)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Signup route (no need for 'auth:sanctum' here, as the user is not authenticated yet)
// Change '/signup' to '/register'
Route::post('/signup', [AuthController::class, 'SignUp']);

// Login route (no need for 'auth:sanctum' here either, as the user is logging in)
Route::post('login', [AuthController::class, 'Login']);

// Logout route
Route::post('logout', [AuthController::class, 'Logout']);

// Example of an authenticated route (protected by Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
