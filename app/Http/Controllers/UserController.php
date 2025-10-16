<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\Profil;
use App\Models\Service;
use App\Models\Specialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * (Optionnel) Liste des utilisateurs
     */
    
    // public function index()
    // {
    // $filters = request()->only(['name', 'service_id', 'specialite_id']);

    // $query = User::with(['profil:id,libelle', 'service:id,libelle', 'specialite:id,libelle'])
    //     ->orderBy('name');

    // if (!empty($filters['name'])) {
    //     $query->where('name', 'like', '%' . $filters['name'] . '%');
    // }

    // if (!empty($filters['service_id'])) {
    //     $query->where('service_id', $filters['service_id']);
    // }

    // if (!empty($filters['specialite_id'])) {
    //     $query->where('specialite_id', $filters['specialite_id']);
    // }

    // $users = $query->paginate(10)->withQueryString();

    // return Inertia::render('admin/users/index', [
    //     'users'        => $users,
    //     'filters'      => $filters,
    //     'services'     => \App\Models\Service::select('id', 'libelle')->orderBy('libelle')->get(),
    //     'specialites'  => \App\Models\Specialite::select('id', 'libelle')->orderBy('libelle')->get(),
    // ]);
    // }
    public function index()
    {
    $filters = request()->only(['name', 'service_id', 'specialite_id', 'profil_id']);

    $query = User::with(['profil:id,libelle', 'service:id,libelle', 'specialite:id,libelle'])
        ->orderBy('name');

    if (!empty($filters['name'])) {
        $query->where('name', 'like', '%' . $filters['name'] . '%');
    }

    if (!empty($filters['service_id'])) {
        $query->where('service_id', $filters['service_id']);
    }

    if (!empty($filters['specialite_id'])) {
        $query->where('specialite_id', $filters['specialite_id']);
    }

    if (!empty($filters['profil_id'])) {
        $query->where('profil_id', $filters['profil_id']);
    }

    $users = $query->paginate(10)->withQueryString();

    return Inertia::render('admin/users/index', [
        'users'        => $users,
        'filters'      => $filters,
        'services'     => \App\Models\Service::select('id', 'libelle')->orderBy('libelle')->get(),
        'specialites'  => \App\Models\Specialite::select('id', 'libelle')->orderBy('libelle')->get(),
        'profils'      => \App\Models\Profil::select('id', 'libelle')->orderBy('libelle')->get(),
    ]);
    }



    /**
     * Formulaire de création.
     * → Renvoie profils, services, specialites (avec service_id si présent en BD)
     */
    public function create()
    {
        $profils  = Profil::select('id', 'libelle')->orderBy('id')->get();
        $services = Service::select('id', 'libelle')->orderBy('libelle')->get();

        if (Schema::hasColumn('specialites', 'service_id')) {
            $specialites = Specialite::select('id', 'libelle', 'service_id')->orderBy('libelle')->get();
        } else {
            // fallback: pas de colonne service_id → on met null pour ne pas casser le front
            $specialites = Specialite::select('id', 'libelle')->orderBy('libelle')->get()
                ->map(function ($s) { $s->service_id = null; return $s; });
        }

        return Inertia::render('admin/users/create', [
            'profils'     => $profils,
            'services'    => $services,
            'specialites' => $specialites,
        ]);
    }

    /**
     * Enregistrement d'un utilisateur.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        // Si la colonne existe, on peut renforcer la cohérence service ⇄ spécialité
        if (Schema::hasColumn('specialites', 'service_id')
            && !empty($data['specialite_id'])
            && !empty($data['service_id'])) {

            $matches = Specialite::where('id', $data['specialite_id'])
                ->where(function ($q) use ($data) {
                    $q->where('service_id', $data['service_id'])
                      ->orWhereNull('service_id'); // tolère spécialités orphelines si tu en as
                })
                ->exists();

            if (!$matches) {
                return back()->withErrors([
                    'specialite_id' => "La spécialité choisie n'appartient pas au service sélectionné.",
                ])->withInput();
            }
        }

        User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['password']),
            'telephone'     => $data['telephone'] ?? null,
            'profil_id'     => $data['profil_id'],
            'specialite_id' => $data['specialite_id'] ?? null,
            'service_id'    => $data['service_id'] ?? null,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur ajouté avec succès.');
    }
}
