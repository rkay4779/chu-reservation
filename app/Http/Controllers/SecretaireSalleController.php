<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Salle;
use App\Models\SecretaireSalle;

class SecretaireSalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        dd('Index method hit');
        $secretaires = User::whereHas('profil', function ($query) {
            $query->where('nom', 'secretaire');
        })->select('id', 'name')->get();

        $salles = Salle::select('id', 'nom')->get();

        return Inertia::render('admin/salles/affecter-secretaire', [
            'secretaires' => $secretaires,
            'salles' => $salles,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'secretaire_id' => 'required|exists:users,id',
            'salle_id' => 'required|exists:salles,id',
        ]);

        // Avoid duplicates
        SecretaireSalle::firstOrCreate($validated);

        return redirect()
            ->route('admin.salles.affectation.index')
            ->with('success', 'Salle affectée au secrétaire avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SecretaireSalle $secretaireSalle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SecretaireSalle $secretaireSalle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SecretaireSalle $secretaireSalle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SecretaireSalle $secretaireSalle)
    {
        //
    }
    
}
