<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        Log::debug("Handling create project request");
        Log::debug($request->all());
        $defaultValues = [
            'isActive' => true,
            'user_id' => 1, // TODO should read user from context after auth is implemented
        ];
        
        $dataToStore = array_merge($defaultValues, $request->all());
        Log::debug("Merged default values with request data");
        Log::debug("Creating project");
        
        $project = Project::create($dataToStore);
        Log::debug("Project created");

        return response()->json($project);
    }
    
}