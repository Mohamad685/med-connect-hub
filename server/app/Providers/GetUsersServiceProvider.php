<?php

namespace App\Providers;

use App\Services\GetUsersService;
use Illuminate\Support\ServiceProvider;

class GetUsersServiceProvider extends ServiceProvider
{
    
    public function register()
    {
        $this->app->singleton(GetUsersService::class, function ($app) {
            return new GetUsersService();
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
