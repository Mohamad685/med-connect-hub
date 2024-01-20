<?php

namespace App\Services;

use App\Models\Prescription;

class PrescriptionService
{
    public function getPrescriptions($userId)
    {
        return Prescription::where('user_id', $userId)->get();
    }
}
