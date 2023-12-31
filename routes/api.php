<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/projects', [ProjectController::class, 'index']);

Route::post('projects', [ProjectController::class, 'store']);

Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

Route::get('/projects/{projectId}', [ProjectController::class, 'show']);

Route::put('/projects/{project}', [ProjectController::class, 'update']);

Route::post('/generateProject', [ProjectController::class, 'generate']);

Route::get('/users', [UserController::class,'index']);

// TODO should be in auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class,'logout']);

