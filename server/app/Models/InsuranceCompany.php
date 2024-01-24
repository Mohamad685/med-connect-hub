<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InsuranceCompany extends Model
{
    use SoftDeletes;
    protected $fillable = [
        "user_id",
        'name',
        'description',
        'phone_number',
        'email',
        'address',
        'coverage_details'
    ];

    // public function user()
    // {
    //     return $this->morphOne(User::class, 'userable');
    // }
    public function patients()
    {
        return $this->hasMany(Patient::class);
    }

    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
}
