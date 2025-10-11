<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],

            // On expose l'user + profil.libelle à Inertia (pour la sidebar)
            'auth' => [
                'user' => fn () => $request->user()
                    ? $request->user()->loadMissing('profil:id,libelle')->only(['id','name','email','profil'])
                    : null,
            ],

            // État initial de la sidebar (si tu l’utilises)
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
