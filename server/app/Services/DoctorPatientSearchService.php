<?php

namespace App\Services;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Collection;

class DoctorPatientSearch
{
    public function doctorSearch(int $id, string $searchTerm): Collection
    {
        $doctor = Doctor::findOrFail($id);
        $searchTerms = explode(' ', trim($searchTerm));

        $patients = $doctor->patients()->where(function ($query) use ($searchTerms) {
            foreach ($searchTerms as $term) {
                $query->where(function ($query) use ($term) {
                    $query->where('first_name', 'LIKE', "%{$term}%")
                        ->orWhere('last_name', 'LIKE', "%{$term}%");
                });
            }
        })->get();

        return $patients;

    }
}
