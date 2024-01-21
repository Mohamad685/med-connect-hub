<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\RegistrationService;

class RegistrationServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(RegistrationService::class, function ($app) {
            return new RegistrationService();
        });
    }
}
