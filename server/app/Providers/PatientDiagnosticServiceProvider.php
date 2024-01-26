<?php

namespace App\Providers;

use App\Services\PatientDiagnosisService;
use App\Services\PatientLabResultsService;
use App\Services\PatientMedicalHistoriesService;
use App\Services\PatientMedicationHistoriesService;
use App\Services\PatientPrescriptionsService;
use App\Services\PatientSymptomsService;
use Illuminate\Support\ServiceProvider;

class PatientDiagnosticServiceProvider extends ServiceProvider
{
 
    public function register(): void
    {
        $this->app->bind(PatientLabResultsService::class, function ($app) {
            return new PatientLabResultsService();
        });

        $this->app->bind(PatientDiagnosisService::class, function ($app) {
            return new PatientDiagnosisService();
        });
        $this->app->bind(PatientPrescriptionsService::class, function ($app) {
            return new PatientPrescriptionsService();
        });
        $this->app->bind(PatientSymptomsService::class, function ($app) {
            return new PatientSymptomsService();
        });
        
    }

    public function boot(): void
    {
        //
    }
}
