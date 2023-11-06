<?php

namespace App\Services;

use App\Contracts\OpenAiClientInterface;
use OpenAI\Client;

class OpenAiClientWrapper implements OpenAiClientInterface
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function completions()
    {
        return $this->client->completions();
    }
}
