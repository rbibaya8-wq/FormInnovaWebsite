<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CenterController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\CenterRequestController;
use App\Http\Controllers\ActivityLogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:super_admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Center Requests
    Route::get('/center-requests', [CenterRequestController::class, 'index']);
    Route::post('/center-requests/{id}/approve', [CenterRequestController::class, 'approve']);
    Route::post('/center-requests/{id}/reject', [CenterRequestController::class, 'reject']);

    // Centers
    Route::get('/centers', [CenterController::class, 'index']);
    Route::get('/centers/{id}', [CenterController::class, 'show']);
    Route::patch('/centers/{id}/disable', [CenterController::class, 'disable']);
    Route::patch('/centers/{id}/activate', [CenterController::class, 'activate']);
    Route::delete('/centers/{id}', [CenterController::class, 'destroy']);

    // Payments
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::get('/centers/{id}/payments', [PaymentController::class, 'centerPayments']);

    // Settings
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::put('/settings', [SettingsController::class, 'update']);
    // Activity Log
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
});