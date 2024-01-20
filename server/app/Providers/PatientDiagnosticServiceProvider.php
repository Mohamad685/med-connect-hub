<?php

namespace App\Providers;

use App\Services\LabResultService;
use App\Services\PatientDiagnosisService;
use App\Services\PrescriptionService;
use App\Services\SymptomService;
use Illuminate\Support\ServiceProvider;

class PatientDiagnosticServiceProvider extends ServiceProvider
{
 
    public function register(): void
    {
        $this->app->bind(LabResultService::class, function ($app) {
            return new LabResultService();
        });

        $this->app->bind(PatientDiagnosisService::class, function ($app) {
            return new PatientDiagnosisService();
        });
        $this->app->bind(PrescriptionService::class, function ($app) {
            return new PrescriptionService();
        });
        $this->app->bind(SymptomService::class, function ($app) {
            return new SymptomService();
        });
    }

    public function boot(): void
    {
        //
    }
}
