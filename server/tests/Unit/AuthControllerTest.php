<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    public function user_cannot_login_more_than_five_times_in_a_minute()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        for ($i = 0; $i < 5; $i++) {
            $response = $this->post('/login', [
                'email' => 'test@example.com',
                'password' => 'wrong-password',
            ]);

            $response->assertStatus(401);
        }

        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(429);
    }

    public function successful_login_resets_login_attempts()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        for ($i = 0; $i < 4; $i++) {
            $this->post('/login', [
                'email' => 'test@example.com',
                'password' => 'wrong-password',
            ]);
        }

        $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'correct-password',
        ]);

        $key = 'login-attempts:' . $this->app['request']->ip();
        $this->assertTrue(RateLimiter::remaining($key, 1) > 0);
    }

    public function user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'correct-password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'user',
            'authorisation' => ['token']
        ]);
    }
}
