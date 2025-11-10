<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Models\Hopital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\SecretaireSalle;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function mesSalles()
{
    $secretaireId = Auth::id();

    // Get salles via secretaire_salles pivot
    $salles = Salle::whereHas('secretaires', function ($query) use ($secretaireId) {
        $query->where('secretaire_id', $secretaireId);
    })
    ->with('hopital:id,nom') // Load hopital name
    ->get(['id', 'nom', 'capacite', 'hopital_id']);

    return Inertia::render('secretaire/salle/mesSalles', [
        'salles' => $salles,
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hopitaux = Hopital::select('id', 'nom')->get();

        return Inertia::render('admin/salles/create', [
            'hopitaux' => $hopitaux,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'capacite' => 'required|integer|min:1',
            'hopital_id' => 'required|exists:hopitals,id',
        ]);

        Salle::create($validated);

        return redirect()->route('salles.create')->with('success', 'Salle ajoutée avec succès.');
    }
    // public function affecterSecretaireForm()
    // {
    // $secretaires = User::whereHas('profil', function ($query) {
    //     $query->where('nom', 'secretaire');
    // })->select('id', 'name')->get();

    // $salles = Salle::select('id', 'nom')->get();

    // return Inertia::render('admin/salles/affectationSalleSecretaire', [
    //     'secretaires' => $secretaires,
    //     'salles' => $salles,
    //     'success' => session('success'),
    // ]);
    // }

    // public function affecterSecretaire(Request $request)
    // {
    // $validated = $request->validate([
    //     'secretaire_id' => 'required|exists:users,id',
    //     'salle_id' => 'required|exists:salles,id',
    // ]);

    // // Évite les doublons
    // SecretaireSalle::firstOrCreate($validated);

    // return redirect()->route('salles.affecterSecretaireForm')->with('success', 'Salle affectée au secrétaire avec succès.');
    // }
    /**
     * Display the specified resource.
     */
    public function show(Salle $salle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Salle $salle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Salle $salle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salle $salle)
    {
        //
    }
}
