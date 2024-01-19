<?php
namespace App\Http\Controllers;

use App\Services\DiagnosisService;
use Illuminate\Http\Request;

class SymptomController extends Controller {
    protected $symptomService;

    public function __construct(DiagnosisService $symptomService) {
        $this->symptomService = $symptomService;
    }

    public function createSymptom(Request $request) {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'symptom_description' => 'required|string',
        ]);

        try {
            $symptom = $this->symptomService->createSymptom(
                $validatedData['patient_id'],
                $validatedData['symptom_description']
            );

            return response()->json(['message' => 'symptom recorded successfully', 'symptom' => $symptom]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
