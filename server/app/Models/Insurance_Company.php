<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InsuranceCompany extends Model
{
    protected $fillable = [
        "user_id",
        'name',
        'description',
        'phone_number',
        'email',
        'address'];

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}
