<?php

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['prefix' => 'v1', 'as' => 'public.', 'namespace' => 'Api\V1\Auth'], function () {
    Route::post('login', 'LoginController@login')->name('login');
    Route::post('register', 'RegisterController@register')->name('register');
});

Route::group(['prefix' => 'v1', 'as' => 'admin.', 'namespace' => 'Api\V1', 'middleware' => ['auth:api']], function () {
    Route::post('logout', 'Auth\LogoutController@logout')->name('logout');
    Route::get('me', 'UserController@me')->name('me');
    Route::apiResource('user', 'UserController');
    Route::apiResource('role', 'RoleController');
    Route::delete('permission/destroy', 'PermissionController@massDestroy')->name('permissions.massDestroy');
    Route::apiResource('permission', 'PermissionController');
});

