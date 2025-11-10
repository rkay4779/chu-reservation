<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;  
use Inertia\Inertia;

class GroupeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['profil', 'service', 'specialite'])->get();
        $groupes = Groupe::with([
            'utilisateurs.profil',
            'utilisateurs.service',
            'utilisateurs.specialite',
        ])->get();

        return Inertia::render('admin/groupes/gestion', [
            'users' => $users,
            'groupes' => $groupes,
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
        $request->validate([
            'utilisateurs' => 'array',
            'nom' => 'required|string|unique:groupes,nom',
            'utilisateurs.*' => 'exists:users,id',

        ]);

        $groupe = Groupe::create(['nom' => $request->nom]);
        $groupe->utilisateurs()->attach($request->utilisateurs);

        return redirect()->back()->with('success', 'Groupe créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Groupe $groupe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Groupe $groupe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Groupe $groupe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function removeUser(Groupe $groupe ,User $user)
    {
        $groupe->utilisateurs()->detach($user->id);
        return redirect()->back()->with('success', 'Utilisateur retiré du groupe avec succès.');

    }
    public function destroy(Groupe $groupe)
    {
        DB::transaction(function () use ($groupe) {
            // detach all pivot records
            $groupe->utilisateurs()->detach();
            // delete the group
            $groupe->delete();
        });

        return redirect()->back()->with('success', 'Groupe supprimé avec succès.');
    }

}
