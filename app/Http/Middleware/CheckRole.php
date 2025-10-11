<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $roles = null)
    {
        $user = $request->user();

        // If not logged in - redirect to login
        if (! $user) {
            return redirect()->route('login');
        }

        // If no roles provided, allow (or you could abort)
        if (! $roles) {
            return $next($request);
        }

        // Parse allowed roles (Admin, Secretaire etc.) - safe
        $allowed = array_map('strtolower', array_map('trim', explode(',', (string) $roles)));
        $userRole = strtolower(optional($user->profil)->libelle ?? '');

        if (in_array($userRole, $allowed, true)) {
            return $next($request);
        }

        abort(403, 'Accès non autorisé.');
    }
}
