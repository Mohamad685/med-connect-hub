<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class Authenticate extends Middleware
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, \Closure $next, ...$guards)
    {
        if ($this->auth->guard($guards)->guest()) {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                if (!$user) {
                    throw new JWTException('User not found');
                }
            } catch (JWTException $e) {
                return $this->unauthenticated($request, $guards);
            }
        }
        
        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

    /**
     * Handle unauthenticated user.
     */
    protected function unauthenticated($request, $guards)
    {
        return $request->expectsJson()
            ? response()->json(['message' => 'Unauthorized'], 401)
            : redirect()->guest(route('login'));
    }
}
