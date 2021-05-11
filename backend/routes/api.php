<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MembershipController;

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
//Rutas controladoras para el registro y login Users que no requieren auth
Route::post('/users', [UserController::class, 'userRegister']);
Route::post('/users/login', [UserController::class, 'userLogin']);

Route::get('/users/{id}', [UserController::class, 'getUser']);
Route::get('/trips', [TripController::class, 'findAllTrips']);
Route::get('/messages/{tripid}',[MessageController::class, 'findMessagesByTripId']);
Route::get('/memberships/{tripid}',[MembershipController::class, 'findJoinedByTrip']);

Route::middleware('auth:api')->group(function(){
    //Rutas que requieren autenticación de Users
    Route::put('/users/{id}', [UserController::class, 'userUpdate']);
    Route::post('/users/{id}', [UserController::class, 'userLogout']);

    //Rutas que requieren autenticación de Trips
    Route::post('/users/{userid}/trips', [TripController::class, 'tripCreate']);
    Route::get('/users/{userid}/trips', [TripController::class, 'findTripsByUserId']);
    Route::put('/users/{userid}/trips/{tripid}', [TripController::class, 'tripUpdate']);
    Route::delete('/users/{userid}/trips/{tripid}', [TripController::class, 'deleteTrip']);

    //Rutas que requieren autenticación de Messages
    Route::post('/users/{userid}/messages', [MessageController::class, 'createMessage']);
    Route::get('/users/{userid}/messages', [MessageController::class, 'findMessagesByUserId']);
    Route::put('/users/{userid}/messages/{messageid}', [MessageController::class, 'messageUpdate']);
    Route::delete('/users/{userid}/messages/{messageid}', [MessageController::class, 'messageDelete']);

    //Rutas que requieren autenticación de Membership
    Route::post('/trips/login',[MembershipController::class, 'joinTrip']);
    Route::delete('/trips/logout',[MembershipController::class, 'cancelTrip']);
    Route::get('/users/{userid}/memberships',[MembershipController::class, 'findJoinedByUser']);

});
