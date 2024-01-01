<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsDoctor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // In your custom middleware (e.g., IsDoctor.php)
    public function handle($request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role == 'doctor') {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

}
