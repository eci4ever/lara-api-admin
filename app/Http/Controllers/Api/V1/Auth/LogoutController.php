<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Passport\Token;
use Illuminate\Support\Facades\Auth;
use App\User;

class LogoutController extends Controller
{
    public function logout(Request $request)
    { 
        $value = $request->bearerToken();

        $token = Auth::user()->token();

        $token->revoke(); $token->delete();

        return response(['token' => $value, 'user' => $token], 200);
    }
}
