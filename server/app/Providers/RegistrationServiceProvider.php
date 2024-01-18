<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\RegistrationService;

class RegistrationServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('RegistrationService', function ($app) {
            return new RegistrationService();
        });
    }
}
