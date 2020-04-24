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

        $roles->load("permissions");

        return $roles;
    }

    public function store(Request $request)
    {
        $role = Role::create($request->all());

        $role->permissions()->sync($request->input("permissions.*.id", []));

        return $role;
    }

    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        $role->permissions()->sync($request->input("permissions.*.id", []));

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
