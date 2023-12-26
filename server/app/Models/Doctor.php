<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ["user_id",
        'first_name',
        'last_name',
        'specialty',
        'age',
        'phone_number',
        'license_id'];

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}
