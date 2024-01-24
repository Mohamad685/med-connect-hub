<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class openAIValidationController extends Controller
{
    public function validateDiagnosis($patientId)
    {
        // Retrieve patient data based on patientId
        $patient = Patient::find($patientId);
        if (!$patient) {
            return response()->json(['error' => 'Patient not found'], 404);
        }

        $labResults = $patient->labResults; 
        $symptoms = $patient->symptoms; 
        $diagnoses = $patient->diagnoses; 
        $prescriptions = $patient->prescriptions; 

        // Create a prompt for OpenAI
        $prompt .= "Given the lab results: $labResults, and symptoms: $symptoms, 
        is the diagnosis: $diagnoses, and the prescription: $prescriptions correct? Respond by yes or no";
        $prompt .= '\n In case of rejection , Give me a brief small text about the reason';

        // API call to OpenAI
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openai.api_key'),
        ])->post('https://api.openai.com/v1/completions', [
            'model' => 'text-davinci-003',
            'prompt' => $prompt,
            'temperature' => 0.5,
            'max_tokens' => 3000,
        ]);

        if ($response->successful()) {
            $result = $response->json();
            $text = $result['choices'][0]['text'] ?? 'Response not available';
            return response()->json(['message' => $text]);
        }

        return response()->json(['error' => 'Failed to get a response from OpenAI'], 500);
    }
}
