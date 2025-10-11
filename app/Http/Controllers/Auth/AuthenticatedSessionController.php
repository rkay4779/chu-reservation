<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $user = $request->validateCredentials();

    //     if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
    //         $request->session()->put([
    //             'login.id' => $user->getKey(),
    //             'login.remember' => $request->boolean('remember'),
    //         ]);

    //         return to_route('two-factor.login');
    //     }

    //     Auth::login($user, $request->boolean('remember'));

    //     $request->session()->regenerate();

    //     return redirect()->intended(route('dashboard', absolute: false));
    // }
    //fixed store
    public function store(LoginRequest $request): RedirectResponse
    {
    $user = $request->validateCredentials();

    if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
        $request->session()->put([
            'login.id' => $user->getKey(),
            'login.remember' => $request->boolean('remember'),
        ]);

        return to_route('two-factor.login');
    }

    Auth::login($user, $request->boolean('remember'));

    $request->session()->regenerate();

    // Redirect based on profil (uses helper on User model)
    $authenticatedUser = Auth::user();

    if ($authenticatedUser) {
        // Admin -> top-level dashboard.tsx
        if ($authenticatedUser->isProfil('Admin')) {
            return redirect()->route('dashboard'); // points to resources/js/pages/dashboard.tsx
        }

        // Secrétaire -> resources/js/pages/secretaire/dashboard.tsx
        if ($authenticatedUser->isProfil('Secrétaire') || $authenticatedUser->isProfil('Secretaire')) {
            return redirect()->route('secretaire.dashboard');
        }

        // Utilisateur -> resources/js/pages/utilisateur/dashboard.tsx
        if ($authenticatedUser->isProfil('Utilisateur')) {
            return redirect()->route('utilisateur.dashboard');
        }
    }

    // Fallback: default dashboard route
    return redirect()->route('dashboard');
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
