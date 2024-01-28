<?php
namespace App\Http\Controllers;

use App\Services\InsuranceApprovalService;
use Illuminate\Http\Request;

class InsuranceApprovalController extends Controller
{
    protected $insuranceApprovalService;

    public function __construct(InsuranceApprovalService $insuranceApprovalService)
    {
        $this->insuranceApprovalService = $insuranceApprovalService;
    }

    public function updateStatus(Request $request, $approvalId)
    {

        $validated = $request->validate([
            'status' => 'required|in:Accepted,Rejected',
        ]);

        $status = $validated['status'];
        $approval = $this->insuranceApprovalService->updateApprovalStatus($approvalId, $status);
        
        return response()->json(['message' => 'Insurance approval status updated', 'approval' => $approval]);
    }
}