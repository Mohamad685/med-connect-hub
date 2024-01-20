<?php

namespace App\Providers;

use App\Services\DiagnosisService;
use App\Services\LabResultService;
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

        $this->app->bind(DiagnosisService::class, function ($app) {
            return new DiagnosisService();
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
