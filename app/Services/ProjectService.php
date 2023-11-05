<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Log;
use OpenAI;


class ProjectService
{

    public function generate()
    {
        Log::debug("Handling generate project request");
        $yourApiKey = getenv('OPEN_AI_KEY');
        $client = OpenAI::client($yourApiKey);

        $jsonResponse = $client->completions()->create([
            'model' => 'gpt-3.5-turbo-instruct',
            'prompt' => 'Please generate a project in a JSON format similar to this one:
            {
                "name": "Project name",
                "description": "Project description",
                "technologies": ["PHP", "Laravel"],
                "expected_length": "3 months"
            }
            please only send back a JSON
            ',
            'max_tokens' => 2000,
        ]);

        Log::debug($jsonResponse['choices'][0]['text']);

        $projectData = json_decode($jsonResponse['choices'][0]['text'], true);

        $project = new Project();
        $project->name = $projectData['name'];
        $project->description = $projectData['description'];
        $project->technologies = $projectData['technologies'];
        $project->expected_length = $projectData['expected_length'];

        return $project;
    }
}