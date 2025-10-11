<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Admin (top-level dashboard.tsx)
Route::get('/dashboard', fn() => Inertia::render('dashboard'))
    ->name('dashboard')
    ->middleware(['auth', 'verified']); // adjust middleware as you need

// Secrétaire (resources/js/pages/secretaire/dashboard.tsx)
Route::get('/secretaire/dashboard', fn() => Inertia::render('secretaire/dashboard'))
    ->name('secretaire.dashboard')
    ->middleware(['auth', 'verified']);

// Utilisateur (resources/js/pages/utilisateur/dashboard.tsx)
Route::get('/utilisateur/dashboard', fn() => Inertia::render('utilisateur/dashboard'))
    ->name('utilisateur.dashboard')
    ->middleware(['auth', 'verified']);

Route::get('/admin/users/create', [UserController::class, 'create'])
    ->name('admin.users.create')
    ->middleware(['auth', 'verified', 'role:admin']);

// store user
Route::post('/admin/users', [UserController::class, 'store'])
    ->name('admin.users.store')
    ->middleware(['auth', 'verified', 'role:admin']);    
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
