<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class openAIValidationController extends Controller
{
    public function validateDiagnosis($id)
    {
        $apiKey = env('OPENAI_SECRET_KEY');
        \Log::info("API Key present: " . ($apiKey ? 'Yes' : 'No'));

        $baseUrl = 'https://api.openai.com';
        $patient = Patient::with(['labResults', 'symptoms', 'diagnosis', 'prescriptions'])->find($id);
        if (!$patient) {
            return response()->json(['error' => 'Patient not found'], 404);
        }

        $diagnosesText = $patient->diagnosis->map(function ($diagnosis) {
            return $diagnosis->diagnosis_description;
        })->join(', ');
    
        $prescriptionsText = $patient->prescriptions->map(function ($prescription) {
            return $prescription->medication_description;
        })->join(', ');
    
        $symptomsText = $patient->symptoms->map(function ($symptom) {
            return $symptom->symptom_description;
        })->join(', ');
    
        $labResultsText = $patient->labResults->map(function ($labResult) {
            return $labResult->result;
        })->join(', ');
    
        $prompt = "Given the lab results: $labResultsText, and symptoms: $symptomsText, is the diagnosis: $diagnosesText, and the prescriptions: $prescriptionsText correct?";
    

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,

            ])->post("$baseUrl/v1/completions", [
                        'model' => 'gpt-3.5-turbo-instruct',
                        'prompt' => $prompt,
                        'max_tokens' => 2000,
                        
                    ]);
                    \Log::info("Request to OpenAI", [
                        'headers' => ['Authorization' => 'Bearer ' . $apiKey],
                        'body' => [
                            'model' => 'gpt-3.5-turbo-instruct',
                            'prompt' => $prompt,
                            'max_tokens' => 2000
                        ]
                        ]);
                    

            if ($response->successful()) {
                $result = $response->json();               
                $textResponse = $result['choices'][0]['text'];

                return response()->json(['text' => $textResponse]);

            } else {
                return response()->json(['error' => 'Failed to get a response from OpenAI'], 500);
            }
        } catch (\Exception $e) {
            \Log::error($e->getMessage());


            return response()->json(['error' => 'An error occurred processing the OpenAI request'], 500);
        }
    }
}