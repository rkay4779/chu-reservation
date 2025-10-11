<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Models\Profil;
use App\Models\Service;
use App\Models\Specialite;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $users = User::with(['profil', 'service', 'specialite'])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/users/create', [
            'profils'      => Profil::select('id', 'libelle')->orderBy('id')->get(),
            'services'     => Service::select('id', 'libelle')->orderBy('libelle')->get(),
            'specialites'  => Specialite::select('id', 'libelle', 'service_id')->orderBy('libelle')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'telephone'     => $request->telephone,
            'profil_id'     => $request->profil_id,
            'specialite_id' => $request->specialite_id,
            'service_id'    => $request->service_id,
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Utilisateur ajouté avec succès.');
    }
}



