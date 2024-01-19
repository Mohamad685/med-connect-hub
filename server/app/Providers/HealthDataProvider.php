<?php

namespace App\Providers;

use App\Services\DiagnosisService;
use Illuminate\Support\ServiceProvider;

class HealthDataProvider extends ServiceProvider
{
    /**
     * Register services.
     */

        public function register()
        {
            $this->app->bind(DiagnosisService::class, function ($app) {
                return new DiagnosisService();
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
