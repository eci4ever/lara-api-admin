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
        
        $user =  auth()->user();

        $user->load("roles.permissions");

        return $user;
        //if want to return multiple props
        //return response(['user' => Auth::user()], 200);
    }

    public function index()
    {
        $users = User::all();

        $users->load("roles");

        return $users;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $registerToken = $user->createToken($request->email)->accessToken;

        $user->roles()->sync($request->input("roles.*.id", []));

        return $user;
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());

        $user->roles()->sync($request->input("roles.*.id", []));

        return $user;
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
