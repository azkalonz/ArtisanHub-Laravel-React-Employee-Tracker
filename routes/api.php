<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ShiftScheduleController;
use App\Http\Controllers\HybridScheduleTeamController;
use App\Http\Controllers\HazardPayController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=>'auth:api'], function(){
    Route::group(['prefix'=>'list'], function(){
        Route::get('/employees', [EmployeeController::class, 'list']);
        Route::get('/departments', [DepartmentController::class, 'list']);
        Route::get('/teams', [TeamController::class, 'list']);
        Route::get('/shift-schedules', [ShiftScheduleController::class, 'list']);
        Route::get('/hybrid-schedules', [HybridScheduleTeamController::class, 'list']);
        Route::get('/hazard-pays', [HazardPayController::class, 'list']);
    });

    Route::group(['prefix'=>'update'], function(){
        Route::post('/employee/{id}', [EmployeeController::class, 'update']);
    });

    Route::group(['prefix'=>'delete'], function(){
        Route::delete('/employee/{id}', [EmployeeController::class, 'delete']);
    });
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);