<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HopitalController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SecretaireSalleController;
use App\Http\Controllers\JourFerieController;
use Illuminate\Support\Str;
use App\Http\Middleware\CheckRole;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/dashboard', function (Request $request) {
    $user = $request->user();
    abort_if(!$user, 401);

    $role = Str::lower(Str::ascii(optional($user->profil)->libelle ?? ''));

    return $role === 'admin'
        ? redirect('/admin/dashboard')
        : ($role === 'secretaire'
            ? redirect('/secretaire/dashboard')
            : redirect('/utilisateur/dashboard'));
})->name('dashboard')->middleware(['auth','verified']);

/** DASHBOARDS PAR RÔLE */
Route::middleware(['auth','verified', CheckRole::class . ':admin'])->group(function () {
    // 👉 rend le composant "dashboard" => resources/js/pages/dashboard.tsx
    Route::get('/admin/dashboard', fn () => Inertia::render('dashboard'))
        ->name('admin.dashboard');
});

Route::middleware(['auth','verified', CheckRole::class . ':secretaire'])->group(function () {
    // 👉 rend "secretaire/dashboard" => resources/js/pages/secretaire/dashboard.tsx
    Route::get('/secretaire/dashboard', fn () => Inertia::render('secretaire/dashboard'))
        ->name('secretaire.dashboard');
});

Route::middleware(['auth','verified', CheckRole::class . ':utilisateur'])->group(function () {
    // 👉 rend "utilisateur/dashboard" => resources/js/pages/utilisateur/dashboard.tsx
    Route::get('/utilisateur/dashboard', fn () => Inertia::render('utilisateur/dashboard'))
        ->name('utilisateur.dashboard');
});
Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class)->only(['index', 'create', 'store']);
});
Route::resource('hopitaux', HopitalController::class);
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/hopitaux/create', [HopitalController::class, 'create'])->name('hopitaux.create');
    Route::post('/hopitaux', [HopitalController::class, 'store'])->name('hopitaux.store');
});

Route::resource('/admin/salles', SalleController::class)->names('salles');
Route::prefix('admin')->group(function () {
    Route::get('/salles/create', [SalleController::class, 'create'])->name('salles.create');
    Route::post('/salles', [SalleController::class, 'store'])->name('salles.store');
});
Route::middleware(['auth', 'verified']) // or whatever you use
    ->group(function () {
        Route::get('/admin/salles/affecter-secretaire', [SecretaireSalleController::class, 'index'])
            ->name('admin.salles.affectation.index');

        Route::post('/admin/salles/affecter-secretaire', [SecretaireSalleController::class, 'store'])
            ->name('admin.salles.affectation.store');
    });
// Route::get('/admin/salles/affecter-secretaire', [SecretaireSalleController::class, 'index'])
//     ->name('admin.salles.affectation.index');
// Route::post('/admin/salles/affecter-secretaire', [SecretaireSalleController::class, 'store'])
//     ->name('admin.salles.affectation.store');

// Route::prefix('admin')->middleware(['auth'])->group(function () {
//     Route::get('joursferies', [JourFerieController::class, 'index'])->name('joursferies.index');
//     Route::post('joursferies', [JourFerieController::class, 'store'])->name('joursferies.store');
// });

Route::get('/admin/joursferies/gestion', [JourFerieController::class, 'index'])
    ->name('admin.joursferies.gestion');
Route::post('/admin/joursferies', [JourFerieController::class, 'store'])
    ->name('admin.joursferies.store');

// Route::get('/secretaire/dashboard', fn() => Inertia::render('secretaire/dashboard'))
//     ->name('secretaire.dashboard')
//     ->middleware(['auth', 'verified']);

// // Utilisateur (resources/js/pages/utilisateur/dashboard.tsx)
// Route::get('/utilisateur/dashboard', fn() => Inertia::render('utilisateur/dashboard'))
//     ->name('utilisateur.dashboard')
//     ->middleware(['auth', 'verified']);
Route::get('/{any}', function () {
    return Inertia::render('dashboard'); // or your home page
})->where('any', '.*');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
