<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\OpenAiClientInterface;
use App\Services\OpenAiClientWrapper;
use OpenAI;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(OpenAiClientInterface::class, function ($app) {
            $yourApiKey = getenv('OPEN_AI_KEY');
            $client = OpenAI::client($yourApiKey);
            return new OpenAiClientWrapper($client);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
