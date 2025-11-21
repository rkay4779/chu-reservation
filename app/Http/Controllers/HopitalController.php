<?php

namespace App\Http\Controllers;

use App\Models\Hopital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HopitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/hopitals/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:hopitals,nom',
            'description' => 'nullable|string|max:1000',
        ]);

        Hopital::create($validated);

        return redirect()->route('hopitaux.create')->with('success', 'Hôpital ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hopital $hopital)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hopital $hopital)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hopital $hopital)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hopital $hopital)
    {
        //
    }
}
