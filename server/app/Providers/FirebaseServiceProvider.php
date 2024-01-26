<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Database;
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
        $this->app->singleton(Factory::class, function ($app) {
            $factory = new Factory();

            // Ensure the service account path is correctly specified in your .env file
            if (file_exists($serviceAccountPath = base_path(env('FIREBASE_CREDENTIALS')))) {
                $factory = $factory->withServiceAccount($serviceAccountPath);
            }

            return $factory;
        });

        $this->app->singleton(Database::class, function ($app) {
            /** @var Factory $factory */
            $factory = $app->make(Factory::class);
            return $factory->createDatabase();
        });
    }
    public function boot()
    {
        //
    }
}
