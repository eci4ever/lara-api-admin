<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        if(!Auth::attempt($login)) 
        {
            return response(['message' => 'Invalid Login Attempt']);
        }

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return response(['token' => $accessToken]);
    }
}
