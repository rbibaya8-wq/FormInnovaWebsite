<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class SuperAdmin extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];
}