<?php

namespace App\Providers;

use App\Services\LabResultService;
use Illuminate\Support\ServiceProvider;

class PatientDiagnosticServiceProvider extends ServiceProvider
{
 
    public function register(): void
    {
        $this->app->bind(LabResultService::class, function ($app) {
            return new LabResultService();
        });
    }

    public function boot(): void
    {
        //
    }
}
