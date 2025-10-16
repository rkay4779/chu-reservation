<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
        'success' => fn () => session('success'),
    ]);
    Inertia::setRootView('app'); // keep this if it’s already here

    // 👇 Tell Inertia to load from lowercase "pages"
    Inertia::version(fn () => md5_file(public_path('mix-manifest.json')));
    Inertia::share([]);
    }
}
