<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InsuranceApproval;
use Illuminate\Support\Facades\Validator;

class InsuranceApprovalController extends Controller
{
    public function createRequest(Request $request)
    {
        $validator = validator::make($request->all(), [
            'medical_record_id' => 'required|exists:medical_records,id',
            'insurance_company_id' => 'required|exists:insurance_companies,id',
            'lab_result_id' => 'required|exists:lab_results,id',
            'symptoms_id' => 'required|exists:symptoms,id',
            'prescription_id' => 'required|exists:prescriptions,id',
            'diagnosis_id' => 'required|exists:diagnoses,id'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $insuranceApproval = InsuranceApproval::create([
            'medical_record_id' => $request->medical_record_id,
            'insurance_company_id' => $request->insurance_company_id,
            'lab_result_id' => $request->lab_result_id,
            'symptoms_id' => $request->symptoms_id,
            'prescription_id' => $request->prescription_id,
            'diagnosis_id' => $request->diagnosis_id,
            'approved' => null
        ]);
        return response()->json([
            'message' => 'Insurance approval request created successfully.',
            'insuranceApproval' => $insuranceApproval
        ], 201);
    }
    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'approved' => 'required|boolean'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    $insuranceApproval = InsuranceApproval::find($id);
    if (!$insuranceApproval) {
        return response()->json(['message' => 'Insurance approval not found.'], 404);
    }

    $insuranceApproval->approved = $request->approved;
    $insuranceApproval->save();

    return response()->json([
        'message' => 'Insurance approval status updated successfully.',
        'insuranceApproval' => $insuranceApproval
    ], 200);
}
}


