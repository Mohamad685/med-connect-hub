<?php

namespace App\Services;

use App\Models\LabResult;

class LabResultService
{
    public function getLabResults($userId)
    {
        return LabResult::where('user_id', $userId)->get();
    }
}
