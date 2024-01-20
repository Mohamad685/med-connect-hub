<?php

namespace App\Services;
use App\Models\Symptom;


class SymptomService
{
    public function Symptoms($userId)
    {
        return Symptom::where('user_id', $userId)->get();
    }
}
