<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{

    use SoftDeletes;
    protected $fillable = ["user_id",
        'first_name',
        'last_name',
        'specialty',
        'age',
        'phone_number',
        'license_id',
        'gender'];

    // public function user()
    // {
    //     return $this->morphOne(User::class, 'userable');
    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function patients(){
        return $this->belongsToMany(Patient::class, 'doctors_patients');
    }

    public function patient(){
        return $this->belongsToMany(Patient::class, 'doctors_patients');
    }
}
