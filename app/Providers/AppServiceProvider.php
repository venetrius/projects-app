<?php

namespace App\Providers;

use App\Services\ProjectService;
use Illuminate\Support\ServiceProvider;
use OpenAI;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('OpenAiClient', function ($app) {
            $yourApiKey = getenv('OPEN_AI_KEY');
            return OpenAI::client($yourApiKey);
        });

        $this->app->when(ProjectService::class)
            ->needs('$openAiClient')
            ->give('OpenAiClient');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
