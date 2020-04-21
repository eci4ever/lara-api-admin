<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        return $roles;
    }

    public function store(Request $request)
    {
        return Role::create($request->all());
    }

    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        return $role;
    }

    public function show(Role $role)
    {
        return $role;
    }

    public function destroy(Role $role)
    {
        return $role->delete();
    }
}
