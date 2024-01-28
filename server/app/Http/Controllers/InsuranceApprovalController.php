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
        \Log::info('Update status request received', ['approvalId' => $approvalId, 'request' => $request->all()]);

        $validated = $request->validate([
            'status' => 'required|in:Accepted,Rejected',
        ]);

        $status = $validated['status'];
        $approval = $this->insuranceApprovalService->updateApprovalStatus($approvalId, $status);
        
        \Log::info('Approval status updated', ['approval' => $approval]);

        return response()->json(['message' => 'Insurance approval status updated', 'approval' => $approval]);
    }
}