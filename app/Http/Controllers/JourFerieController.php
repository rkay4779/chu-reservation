<?php

namespace App\Http\Controllers;

use App\Models\JourFerie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JourFerieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $joursFeries = JourFerie::orderBy('date')->get();

        return Inertia::render('admin/joursferies/gestion', [
            'joursFeries' => $joursFeries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'description' => 'required|string|max:255',
            'type' => 'required|in:nationale,religieuse,scolaire',
        ]);

        JourFerie::create($validated);

        return back()->with('success', 'Jour férié ajouté avec succès !');
    }

    /**
     * Display the specified resource.
     */
    public function show(JourFerie $jourFerie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JourFerie $jourFerie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JourFerie $jourFerie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JourFerie $jourFerie)
    {
        //
    }
}
