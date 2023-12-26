<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'adress',
        'age',
        'phone_number'];

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }
}

