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
use App\Http\Controllers\PtoInfoController;
use App\Http\Controllers\AttendanceController;


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
        Route::get('/employee-names', [EmployeeController::class, 'listNames']);
        Route::get('/departments', [DepartmentController::class, 'list']);
        Route::get('/teams', [TeamController::class, 'list']);
        Route::get('/shift-schedules', [ShiftScheduleController::class, 'list']);
        Route::get('/hybrid-schedules', [HybridScheduleTeamController::class, 'list']);
        Route::get('/hazard-pays', [HazardPayController::class, 'list']);
        Route::get('/pto-info', [PtoInfoController::class, 'list']);
        Route::get('/attendance-bonus', [AttendanceController::class, 'listBonus']);
    });

    Route::group(['prefix'=>'update'], function(){
        Route::post('/employee/{id}', [EmployeeController::class, 'update']);
        Route::post('/department/{id}', [DepartmentController::class, 'update']);
        Route::post('/team/{id}', [TeamController::class, 'update']);
        Route::post('/shift-schedule/{id}', [ShiftScheduleController::class, 'update']);
        Route::post('/hybrid-schedule/{id}', [HybridScheduleTeamController::class, 'update']);
        Route::post('/hazard-pay/{id}', [HazardPayController::class, 'update']);
        Route::post('/pto-info/{id}', [PtoInfoController::class, 'update']);
        Route::post('/attendance-bonus/{id}', [AttendanceController::class, 'update']);
    });

    Route::group(['prefix'=>'delete'], function(){
        Route::delete('/employee/{id}', [EmployeeController::class, 'delete']);
        Route::delete('/department/{id}', [DepartmentController::class, 'delete']);
        Route::delete('/team/{id}', [TeamController::class, 'delete']);
        Route::delete('/shift-schedule/{id}', [ShiftScheduleController::class, 'delete']);
        Route::delete('/hybrid-schedule/{id}', [HybridScheduleTeamController::class, 'delete']);
        Route::delete('/hazard-pay/{id}', [HazardPayController::class, 'delete']);
        Route::delete('/pto-info/{id}', [PtoInfoController::class, 'delete']);
        Route::delete('/attendance-bonus/{id}', [AttendanceController::class, 'delete']);
    });
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);