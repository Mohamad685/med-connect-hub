<?php

use App\Services\RegistrationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $registrationService;

    public function setUp(): void
    {
        parent::setUp();
        $this->registrationService = $this->app->make(RegistrationService::class);
    }

    public function it_should_not_allow_common_passwords()
    {
        $userData = [
            'email' => 'test@example.com',
            'password' => 'password',
            'role' => 'patient',
            'user_name' => 'testuser',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address' => '123 Main St',
            'age' => 30,
            'phone_number' => '1234567890',
            'gender' => 'male',
            'insurance_company_id' => 1,
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors('password');
    }

    public function it_registers_a_new_user_successfully()
    {
        $userData = [
            'email' => 'newuser@example.com',
            'password' => 'uniquePassword123',
            'role' => 'doctor',
            'user_name' => 'newuser',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'specialty' => 'Cardiology',
            'age' => 40,
            'phone_number' => '0987654321',
            'license_id' => 'DOC123',
            'gender' => 'female',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasNoErrors();
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);
    }

    public function it_does_not_allow_duplicate_email()
    {
        $userData = [
            'email' => 'duplicate@example.com',
            'password' => 'ValidPassword123',
            'role' => 'patient',
            'user_name' => 'firstuser',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address' => '123 Main St',
            'age' => 30,
            'phone_number' => '1234567890',
            'gender' => 'male',
            'insurance_company_id' => 1, 
        ];
        $this->post('/register', $userData);

        $duplicateUserData = [
            'email' => 'duplicate@example.com',
            'password' => 'AnotherValidPassword123',
            'role' => 'doctor',
            'user_name' => 'seconduser',
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'specialty' => 'Cardiology',
            'age' => 40,
            'phone_number' => '0987654321',
            'license_id' => 'DOC123',
            'gender' => 'female',
        ];
        $response = $this->post('/register', $duplicateUserData);

        $response->assertSessionHasErrors('email');
    }
}
