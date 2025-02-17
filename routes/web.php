<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

// Password Confirmation
Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store'])->middleware('auth:sanctum');

// Email Verification
Route::post('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])->middleware(['auth:sanctum', 'signed']);
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware(['auth:sanctum', 'throttle:6,1']);
Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])->middleware('auth:sanctum');

// Password Reset
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);

