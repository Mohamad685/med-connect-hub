<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Firestore;
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
            $factory = (new Factory());

            if (file_exists($serviceAccountPath = config('firebase.credentials'))) {
                $factory = $factory->withServiceAccount($serviceAccountPath);
            }

            return $factory;

        });
        $this->app->singleton(Firestore::class, function ($app) {
            $factory = $app->make(Factory::class); 
            return $factory->createFirestore();
        });
    }

    public function boot()
    {
        //
    }
}
