<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\PatientRegistrationService;

class PatientRegistrationServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(PatientRegistrationService::class, function ($app) {
            return new PatientRegistrationService();
        });
    }

    public function boot()
    {
        // Bootstrapping code here, if necessary
    }
}
