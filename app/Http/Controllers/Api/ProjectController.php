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

        $rules = [
            'name' => 'required|max:255|unique:projects',
            'description' => 'required|max:2048',
            'technologies' => 'required|array',
            'expected_length' => 'required|min:3|max:255',
        ];
        
        LOG::debug("Validating request data");
        $validatedData = $request->validate($rules);

        $defaultValues = [
            'isActive' => true,
            'user_id' => 1, // TODO should read user from context after auth is implemented
        ];

        Log::debug("Merging default values with validated request data");
        $dataToStore = array_merge($defaultValues, $validatedData);

        Log::debug("Creating project");
        $project = Project::create($dataToStore);
        Log::debug("Project created");

        return response()->json($project);
    }
    
}