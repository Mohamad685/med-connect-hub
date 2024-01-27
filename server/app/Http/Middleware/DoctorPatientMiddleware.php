<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DoctorPatientMiddleware
{
  
    public function handle(Request $request, Closure $next): Response
    {
        
            $user = Auth::user();
            if ($user->role === 'doctor' || $user->role === 'patient') {
                return $next($request);
            }
    
            return response()->json(['message' => 'Unauthorized'], 403);
          }
}
