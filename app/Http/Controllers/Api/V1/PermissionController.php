<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return Permission::all();
    }
}
