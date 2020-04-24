<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();

        return $permissions;
    }

    public function store(Request $request)
    {
        $permission = Permission::insert($request->all());

        return $permission;
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->all());

        return $permission;
    }

    public function show(Permission $permission)
    {
        return $permission;
    }

    public function destroy(Permission $permission)
    {
        return $permission->delete();
    }

    public function massDestroy(Request $request)
    {
        Permission::whereIn('id', request('ids'))->delete();

        return response(null, 204);
    }
}
