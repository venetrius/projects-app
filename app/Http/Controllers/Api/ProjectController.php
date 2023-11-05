<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenAI;

class ProjectController extends Controller
{

    protected $projectService;

    // Import the service and assign it to a property
    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function destroy(Project $project)
    {
        if ($project->is_deleted) {
            return response()->json($project);
        }

        $project->delete();
        return response()->json($project);
    }

    public function index(Request $request)
    {
        LOG::debug("Handling index project request");
        $pageSize = $request->query('pageSize', 5);

        // Start building the query
        $query = Project::query();

        // Retrieve sorting parameters
        $sortFields = $request->query('sortField', []);
        $sortOrders = $request->query('sortOrder', []);
        LOG::debug($sortFields);
        LOG::debug($sortOrders);

        $sortFields = is_array($sortFields) ? $sortFields : [$sortFields];
        $sortOrders = is_array($sortOrders) ? $sortOrders : [$sortOrders];

        // Apply sorting if sortField and sortOrder are provided
        foreach ($sortFields as $index => $field) {
            $order = ($sortOrders[$index] ?? 'ascend') === 'descend' ? 'desc' : 'asc';
            $query->orderBy($field, $order);
        }

        LOG::debug($query->toSql());
        $projects = $query->paginate($pageSize);

        return response()->json($projects);
    }

    public function update(Request $request, Project $project) // The $project parameter is automatically resolved by Laravel.
    {
        Log::debug("Handling update project request");
        Log::debug($request->all());

        $rules = [
            'name' => 'required|max:255|unique:projects,name,' . $project->id,
            'description' => 'required|max:2048',
            'technologies' => 'required|array',
            'expected_length' => 'required|min:3|max:255',
        ];

        Log::debug("Validating request data");
        $validatedData = $request->validate($rules);

        Log::debug("Updating project");
        $project->update($validatedData);

        return response()->json($project);
    }

    public function show($projectId)
    {
        LOG::debug("Handling show project request");
        LOG::debug($projectId);
        $project = Project::findOrFail($projectId);
        return response()->json($project);
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
            'user_id' => 1,
            // TODO should read user from context after auth is implemented
        ];

        Log::debug("Merging default values with validated request data");
        $dataToStore = array_merge($defaultValues, $validatedData);

        Log::debug("Creating project");
        $project = Project::create($dataToStore);
        Log::debug("Project created");

        return response()->json($project);
    }

    public function generate()
    {
        $project = $this -> projectService -> generate();
        return response()->json($project);
    }
}