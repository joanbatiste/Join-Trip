<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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
//Rutas controladoras para el registro y login Users
Route::post('/users', [UserController::class, 'userRegister']);
Route::post('/users/login', [UserController::class, 'userLogin']);

Route::middleware('auth:api')->group(function(){
    Route::put('/users/{id}', [UserController::class, 'userUpdate']);
});
