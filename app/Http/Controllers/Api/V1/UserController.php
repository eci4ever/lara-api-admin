<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function me()
    {
        return response(['user' => Auth::user()], 200);
    }

    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        return User::create($request->all());
    }

    public function update(Request $request, User $user)
    {
        return $user->update($request->all());
    }

    public function show(User $user)
    {
        return $user;
    }

    public function destroy(User $user)
    {
        return $user->delete();
    }
}
