<?php

namespace App\Services;

use App\Models\Prescription;

class PrescriptionsService
{
    public function getPrescriptions($userId)
    {
        return Prescription::where('user_id', $userId)->get();
    }
}
