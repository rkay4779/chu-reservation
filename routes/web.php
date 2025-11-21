<?php

use App\Http\Controllers\DemandeReservationController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\HopitalController;
use App\Http\Controllers\JourFerieController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\SecretaireSalleController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/dashboard', function (Request $request) {
    $user = $request->user();
    abort_if(! $user, 401);

    $role = Str::lower(Str::ascii(optional($user->profil)->libelle ?? ''));

    return $role === 'admin'
        ? redirect('/admin/dashboard')
        : ($role === 'secretaire'
            ? redirect('/secretaire/dashboard')
            : redirect('/utilisateur/dashboard'));
})->name('dashboard')->middleware(['auth', 'verified']);

/** DASHBOARDS PAR RÔLE */
Route::middleware(['auth', 'verified', CheckRole::class.':admin'])->group(function () {
    // 👉 rend le composant "dashboard" => resources/js/pages/dashboard.tsx
    Route::get('/admin/dashboard', fn () => Inertia::render('dashboard'))
        ->name('admin.dashboard');
});

Route::middleware(['auth', 'verified', CheckRole::class.':secretaire'])->group(function () {
    // 👉 rend "secretaire/dashboard" => resources/js/pages/secretaire/dashboard.tsx
    Route::get('/secretaire/dashboard', fn () => Inertia::render('secretaire/dashboard'))
        ->name('secretaire.dashboard');
});

Route::middleware(['auth', 'verified', CheckRole::class.':utilisateur'])->group(function () {
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
Route::prefix('admin')->group(function () {
    // ✅ Page to show the form
    Route::get('secretairesalle/affectersecretaire', [SecretaireSalleController::class, 'index'])
        ->name('admin.salles.affectation.index');

    // ✅ Handle form submission
    Route::post('secretairesalle/affectersecretaire', [SecretaireSalleController::class, 'store'])
        ->name('admin.salles.affectation.store');
});

Route::middleware(['auth', 'verified'])->prefix('utilisateur')->group(function () {
    // ✅ Page de création d'une demande
    Route::get('demande-reservation', [DemandeReservationController::class, 'create'])
        ->name('utilisateur.demande.create');

    // ✅ Soumission du formulaire
    Route::post('demande-reservation', [DemandeReservationController::class, 'store'])
        ->name('utilisateur.demande.store');
});
Route::middleware(['auth', 'verified'])->prefix('utilisateur')->group(function () {
    Route::get('/historique-demandes', [DemandeReservationController::class, 'historique'])->name('utilisateur.historique');
});
Route::middleware(['auth', 'verified'])->prefix('secretaire')->group(function () {
    Route::get('/demandes/historique', [DemandeReservationController::class, 'historiqueSecretaire'])->name('secretaire.demandes.historique');
});
Route::middleware(['auth', 'verified'])->prefix('utilisateur')->group(function () {
    Route::get('/consultation-disponibilite', [DemandeReservationController::class, 'consultationDisponibilite'])->name('utilisateur.consultation.disponibilite');
});
Route::middleware(['auth', 'verified'])->prefix('utilisateur')->group(function () {
    Route::get('/dashboard', [DemandeReservationController::class, 'dashboard'])->name('utilisateur.dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('secretaire')->group(function () {
    Route::get('/dashboard', [DemandeReservationController::class, 'secretaireDashboard'])->name('secretaire.dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('secretaire')->group(function () {
    Route::get('/mes-salles', [SalleController::class, 'mesSalles'])->name('secretaire.mes-salles');
});
Route::middleware(['auth', 'verified'])->prefix('secretaire')->group(function () {
    Route::get('demandes/demandes', [DemandeReservationController::class, 'index'])->name('secretaire.index');
    Route::post('demandes/{id}/accepter', [DemandeReservationController::class, 'accepter'])->name('demandes.accepter');
    Route::post('demandes/{id}/refuser', [DemandeReservationController::class, 'refuser'])->name('demandes.refuser');

});

Route::get('/admin/joursferies/gestion', [JourFerieController::class, 'index'])
    ->name('admin.joursferies.gestion');
Route::post('/admin/joursferies', [JourFerieController::class, 'store'])
    ->name('admin.joursferies.store');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/groupes', [GroupeController::class, 'index']);
    Route::post('/groupes', [GroupeController::class, 'store']);

    // delete a single user from a group (already had this)
    Route::delete('/groupes/{groupe}/utilisateurs/{user}', [GroupeController::class, 'removeUser']);

    // DELETE whole group (add this)
    Route::delete('/groupes/{groupe}', [GroupeController::class, 'destroy']);
});
Route::get('/{any}', function () {
    return Inertia::render('dashboard'); // or your home page
})->where('any', '.*');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
