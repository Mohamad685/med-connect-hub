<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class FirebaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('firebase', function ($app) {
            $serviceAccount = ServiceAccount::fromJsonFile(config('firebase.credentials'));
            $firebase = (new Factory())
                ->withServiceAccount($serviceAccount)
                ->create();

            return $firebase;
        });
    }

  
    public function boot()
    {
        //
    }
}
