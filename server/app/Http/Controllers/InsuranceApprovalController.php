<?php
namespace App\Http\Controllers;

use App\Services\InsuranceApprovalService;
use Illuminate\Http\Request;

class InsuranceApprovalController extends Controller
{
    protected $approvalService;

    public function __construct(InsuranceApprovalService $approvalService)
    {
        $this->approvalService = $approvalService;
    }

    public function updateStatus(Request $request, $approvalId)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Accepted,Rejected',
        ]);
        $status = $validated['status'];
        $approval = $this->approvalService->updateApprovalStatus($approvalId, $status);

        return response()->json($approval);
    }

}
