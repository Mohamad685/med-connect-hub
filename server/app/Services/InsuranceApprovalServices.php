<?php
namespace App\Services;

use App\Models\InsuranceApproval;

class InsuranceApprovalService
{
    public function updateApprovalStatus($approvalId, $status)
    {
        $approval = InsuranceApproval::findOrFail($approvalId);
        $approval->status = $status;
        $approval->save();

        return $approval;
    }
}