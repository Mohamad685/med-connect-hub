<?php

namespace App\Providers;

use App\Services\DiagnosisService;
use App\Services\PatientMedicalHistoriesService;
use App\Services\PatientMedicationHistoriesService;
use Illuminate\Support\ServiceProvider;

class HealthDataProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(DiagnosisService::class, function ($app) {
            return new DiagnosisService();
        });
        $this->app->bind(PatientMedicalHistoriesService::class, function ($app) {
            return new PatientMedicalHistoriesService();
        });
        $this->app->bind(PatientMedicationHistoriesService::class, function ($app) {
            return new PatientMedicationHistoriesService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
