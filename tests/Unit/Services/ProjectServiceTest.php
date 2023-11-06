<?php

use App\Models\Project;
use Tests\TestCase;
use App\Services\ProjectService;
use Illuminate\Support\Facades\Log;
use Mockery as m;

class ProjectServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Mock the Log facade
        Log::shouldReceive('debug')
            ->withAnyArgs()
            ->andReturnNull();
    }

    public function testGenerate()
    {
        // Arrange
        $mockedClient = m::mock('OpenAiInterface');
        $mockedClient->shouldReceive('completions')->andReturnSelf();
        $mockedClient->shouldReceive('create')->andReturn([
            'choices' => [
                ['text' => json_encode([
                    'name' => 'Test Project',
                    'description' => 'This is a test project description.',
                    'technologies' => ['PHP', 'Laravel'],
                    'expected_length' => '3 months'
                ])]
            ]
        ]);

        $service = new ProjectService($mockedClient);

    
        // Act
        $project = $service->generate();

        // Assert
        $this->assertInstanceOf(Project::class, $project);
        $this->assertEquals('Test Project', $project->name);
        $this->assertEquals('This is a test project description.', $project->description);
        $this->assertEquals(['PHP', 'Laravel'], $project->technologies);
        $this->assertEquals('3 months', $project->expected_length);
    }
}
