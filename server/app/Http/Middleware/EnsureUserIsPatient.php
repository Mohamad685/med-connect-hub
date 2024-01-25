<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsPatient
{
    public function handle($request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role == 'patient') {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

}
