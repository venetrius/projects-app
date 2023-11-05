<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        throw new \Exception('test - not implemented');
        // TODO set isActive and user to default values for now
        $project = Project::create($request->all());
        return response()->json($project);
    }
}