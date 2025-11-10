<?php

namespace App\Http\Controllers;

use App\Models\DemandeReservation;
use App\Models\Salle;
use App\Models\JourFerie;
use App\Models\Hopital;
use App\Models\Groupe;
use App\Models\User;
use App\Models\SecretaireSalle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Auth;

class DemandeReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard(Request $request)
    {
    $user = auth()->user();

    // Get the latest 5 demandes of this user that were accepted or refused
    $latestDemandes = DemandeReservation::where('user_id', $user->id)
        ->whereIn('statut', ['validée', 'refusée'])
        ->orderByDesc('updated_at') // show the most recently changed status
        ->take(5)
        ->get();

    return Inertia::render('utilisateur/dashboard', [
        'latestDemandes' => $latestDemandes,
    ]);
    }

    public function secretaireDashboard()
    {
    $user = auth()->user();

    // Récupérer les salles du secrétaire
    $salleIds = $user->salles()->pluck('salles.id');
    // dd($salleIds);
    // Compter les demandes en attente dans les salles du secrétaire
    $pendingCount = DemandeReservation::whereIn('salle_id', $salleIds)
        ->where('statut', 'attente')
        ->count();

    return Inertia::render('secretaire/dashboard', [
        'pendingCount' => $pendingCount,
    ]);
    }


    public function index()
    {
    // Récupère les ID des salles liées au secrétaire connecté
    $salleIds = DB::table('secretaire_salles')
        ->where('secretaire_id', Auth::id())
        ->pluck('salle_id');

    // Filtre les demandes dans ces salles uniquement
    $demandes = DemandeReservation::with(['user.service', 'salle'])
        ->where('statut', 'attente')
        ->whereIn('salle_id', $salleIds)
        ->get()
        ->map(fn($d) => [
            'id' => $d->id,
            'date' => $d->date_reunion,
            'heure' => $d->heure_debut . ' - ' . $d->heure_fin,
            'salle' => optional($d->salle)->nom ?? '—',
            'demandeur' => optional($d->user)->name ?? '—',
            'service' => optional(optional($d->user)->service)->nom ?? '—',
            'sujet' => $d->sujet ?? '—',
            'statut' => $d->statut,
        ]);

    $joursFeries = JourFerie::all();

    return Inertia::render('secretaire/demandes/demandes', [
        'demandes' => $demandes,
        'joursFeries' => $joursFeries,
    ]);
    }
    public function accepter(Request $request, $id)
    {
    $demande = DemandeReservation::findOrFail($id);
    $demande->statut = 'validee';
    $demande->save();

    session()->flash('reservation_notification_' . $demande->user_id, 'Votre demande a été acceptée.');
    return back()->with('success', 'Demande acceptée.');
    }
    public function refuser(Request $request, $id)
    {
    $request->validate([
        'motif_refus' => 'nullable|string|max:255',
    ]);

    $demande = DemandeReservation::findOrFail($id);
    $demande->statut = 'Refusée';
    $demande->motif_refus = $request->motif_refus;
    $demande->save();

    session()->flash('reservation_notification_' . $demande->user_id, 'Votre demande a été refusée.');
    return back()->with('success', 'Demande refusée.');

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('utilisateur/Demandereservation/demande', [
        'salles' => Salle::all(),
        'groupes' => Groupe::with('utilisateurs')->get(),
        'joursFeries' => JourFerie::orderBy('date')->get(),
        'utilisateurs' => User::with('profil:id,libelle')->get(['id','name','email','profil_id']),
        ]);
    }
    public function historiqueSecretaire()
    {
    $secretaireId = Auth::id();

    // Étape 1 : Récupérer les ID des salles liées au secrétaire
    $salleIds = DB::table('secretaire_salles')
        ->where('secretaire_id', $secretaireId)
        ->pluck('salle_id');

    // Étape 2 : Récupérer les demandes des salles, avec relations
    $demandes = DemandeReservation::with(['salle', 'user']) // pour accéder à d.salle.nom et d.user.name
        ->whereIn('salle_id', $salleIds)
        ->orderBy('date_reunion', 'desc') // ✅ Utilise `orderBy` au lieu de `latest`
        ->get();

    return Inertia::render('secretaire/demandes/historiquedemandes', [
        'demandes' => $demandes,
    ]);
    }

    public function consultationDisponibilite(Request $request)
    {
    $date = $request->input('date', now()->format('Y-m-d'));
    $hopitalId = $request->input('hopital_id');

    $salles = Salle::when($hopitalId, fn($q) => $q->where('hopital_id', $hopitalId))->get();
    $hopitaux = Hopital::all();

    $reservations = DemandeReservation::whereDate('date_reunion', $date)
        ->when($hopitalId, fn($q) => $q->whereHas('salle', fn($sq) => $sq->where('hopital_id', $hopitalId)))
        ->get(['id', 'salle_id', 'heure_debut', 'duree', 'statut']);

    return Inertia::render('utilisateur/consultationdisponibilte', [
        'salles' => $salles,
        'reservations' => $reservations,
        'date' => $date,
        'hopitaux' => $hopitaux,
        'selectedHopitalId' => $hopitalId,
    ]);
    }


    public function historique()
    {
        $user = auth()->user();

        $demandes = DemandeReservation::with('salle')
        ->where('user_id', $user->id)
        ->latest()
        ->get();

        return Inertia::render('utilisateur/historiquedemandes', [
            'demandes' => $demandes
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */

    // public function store(Request $request)
    // {
    // $data = $request->validate([
    //     'salle_id' => 'required|exists:salles,id',
    //     'date' => 'required|date',
    //     'heure_debut' => 'required',
    //     'heure_fin' => 'required',
    //     'ordre_du_jour' => 'required|string|max:255',
    //     'materiel' => 'nullable|array',
    //     'autre_materiel' => 'nullable|string|max:255',
    //     'commentaire' => 'nullable|string|max:500',
    //     'participants' => 'nullable|array',
    //     'participants.*.type' => 'required|string|in:groupe,profil,nom,nouveau',
    //     'participants.*.valeur' => 'required|string|max:255',
    // ]);

    // if (!auth()->check()) {
    //     return redirect()->back()->withErrors(['auth' => 'Utilisateur non connecté.']);
    // }

    // // ✅ Ajout utilisateur connecté
    // $data['user_id'] = auth()->id();
    // $data['statut'] = 'attente';

    // // ✅ Traitement du matériel
    // $data['materiels'] = isset($data['materiel']) ? implode(', ', $data['materiel']) : null;

    // // ✅ Renommer les champs
    // $data['date_reunion'] = $data['date'];
    // $data['sujet'] = $data['ordre_du_jour'];

    // // ✅ Calcul durée
    // $dureeMinutes = (strtotime($data['heure_fin']) - strtotime($data['heure_debut'])) / 60;
    // $data['duree'] = max(1, (int) $dureeMinutes);

    // // ✅ Nettoyer avant insertion
    // unset($data['date'], $data['ordre_du_jour'], $data['materiel'], $data['participants']);

    // // ✅ Création de la demande
    // $demande = DemandeReservation::create($data);

    // // ✅ Ajout des participants
    // if ($request->has('participants')) {
    //     foreach ($request->participants as $participant) {
    //         $demande->participants()->create([
    //             'type' => $participant['type'],
    //             'valeur' => $participant['valeur'],
    //         ]);
    //     }
    // }

    // return redirect()->back()->with('success', 'Demande envoyée avec succès avec participants.');
    // }

//     public function store(Request $request)
// {
//     $data = $request->validate([
//         'salle_id' => 'required|exists:salles,id',
//         'date' => 'required|date',
//         'heure_debut' => 'required',
//         'heure_fin' => 'required',
//         'ordre_du_jour' => 'required|string|max:255',
//         'materiel' => 'nullable|array',
//         'autre_materiel' => 'nullable|string|max:255',
//         'commentaire' => 'nullable|string|max:500',
//         'participants' => 'nullable|array',
//         'participants.*.type' => 'required|string|in:groupe,profil,nom,nouveau',
//         'participants.*.valeur' => 'required|string|max:255',
//     ]);

//     if (!auth()->check()) {
//         return redirect()->back()->withErrors(['auth' => 'Utilisateur non connecté.']);
//     }

//     $data['user_id'] = auth()->id();
//     $data['statut'] = 'attente';
//     $data['materiels'] = isset($data['materiel']) ? implode(', ', $data['materiel']) : null;
//     $data['date_reunion'] = $data['date'];
//     $data['sujet'] = $data['ordre_du_jour'];

//     $dureeMinutes = (strtotime($data['heure_fin']) - strtotime($data['heure_debut'])) / 60;
//     $data['duree'] = max(1, (int) $dureeMinutes);

//     // ✅ Nettoyage
//     unset($data['date'], $data['ordre_du_jour'], $data['materiel'], $data['participants']);

//     // ✅ Création de la demande
//     $demande = DemandeReservation::create($data);

//     // ✅ Ajout des participants
//     if ($request->has('participants')) {
//         Log::info('Participants reçus côté backend', $request->participants);

//         foreach ($request->participants as $participant) {
//             Log::info('Création participant:', $participant);

//             if (isset($participant['type'], $participant['valeur'])) {
//                 $valeur = $participant['valeur'];

//                 // 🔹 Si le type = "profil" et la valeur est un ID utilisateur → on récupère son nom
//                 if ($participant['type'] === 'profil' && is_numeric($valeur)) {
//                     $user = \App\Models\User::find($valeur);
//                     if ($user) {
//                         $valeur = $user->name;
//                     }
//                 }

//                 // 🔹 Si le type = "groupe" → on peut garder le nom déjà envoyé depuis le front
//                 // 🔹 Si le type = "nom" → c’est déjà un nom libre
//                 // 🔹 Si le type = "nouveau" → contient déjà "Nom <Email>"

//                 $demande->participants()->create([
//                     'type' => $participant['type'],
//                     'valeur' => $valeur,
//                 ]);
//             }
//         }
//     } else {
//         Log::warning('Aucun participant reçu');
//     }

//     return redirect()->back()->with('success', 'Demande envoyée avec succès avec participants.');
// }
    public function store(Request $request)
    {
    $data = $request->validate([
        'salle_id' => 'required|exists:salles,id',
        'date' => 'required|date',
        'heure_debut' => 'required',
        'heure_fin' => 'required',
        'ordre_du_jour' => 'required|string|max:255',
        'materiel' => 'nullable|array',
        'autre_materiel' => 'nullable|string|max:255',
        'commentaire' => 'nullable|string|max:500',
        'participants' => 'nullable|array',
        'participants.*.type' => 'required|string|in:groupe,profil,nom,nouveau',
        'participants.*.valeur' => 'required|string|max:255',
    ]);
    if (empty($request->participants) && $request->has('typeParticipant') && $request->has('valeur')) {
        $request->merge([
            'participants' => [
                [
                    'type' => $request->typeParticipant,
                    'valeur' => $request->valeur,
                ]
            ]
        ]);
    }

    if (!auth()->check()) {
        return redirect()->back()->withErrors(['auth' => 'Utilisateur non connecté.']);
    }

    $data['user_id'] = auth()->id();
    $data['statut'] = 'attente';
    $data['materiels'] = isset($data['materiel']) ? implode(', ', $data['materiel']) : null;
    $data['date_reunion'] = $data['date'];
    $data['sujet'] = $data['ordre_du_jour'];

    $dureeMinutes = (strtotime($data['heure_fin']) - strtotime($data['heure_debut'])) / 60;
    $data['duree'] = max(1, (int) $dureeMinutes);

    unset($data['date'], $data['ordre_du_jour'], $data['materiel'], $data['participants']);

    $demande = DemandeReservation::create($data);

    // ✅ Ajout des participants
    if ($request->has('participants')) {
        foreach ($request->participants as $participant) {
            if (!isset($participant['type'], $participant['valeur'])) continue;

            $valeur = $participant['valeur'];

            // 🔹 Cas profil → on récupère le nom à partir de l’ID utilisateur
            if ($participant['type'] === 'profil' && is_numeric($valeur)) {
                $user = \App\Models\User::find($valeur);
                if ($user) $valeur = $user->name;
            }

            // 🔹 Cas "nouveau" → créer l’utilisateur invité
            if ($participant['type'] === 'nouveau') {
                // Extraire nom et email depuis "Nom <email>"
                if (preg_match('/^(.*?)\s*<(.+?)>$/', $valeur, $matches)) {
                    $nom = trim($matches[1]);
                    $email = trim($matches[2]);

                    // Vérifie si un utilisateur avec ce mail existe déjà
                    $existingUser = \App\Models\User::where('email', $email)->first();

                    if (!$existingUser) {
                        $invite = \App\Models\User::create([
                            'name' => $nom,
                            'email' => $email,
                            'profil_id' => 4, // profil "invite"
                            'password' => bcrypt('invite123'), // mot de passe par défaut
                        ]);
                        Log::info("✅ Nouvel utilisateur invité créé : {$invite->email}");
                    } else {
                        Log::info("ℹ️ Utilisateur invité déjà existant : {$existingUser->email}");
                    }
                }
            }

            // ✅ Enregistrement du participant
            $demande->participants()->create([
                'type' => $participant['type'],
                'valeur' => $valeur,
            ]);
        }
    }

    return redirect()->back()->with('success', 'Demande envoyée avec succès avec participants.');
    }


    /**
     * Display the specified resource.
     */
    public function show(DemandeReservation $demandeReservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DemandeReservation $demandeReservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DemandeReservation $demandeReservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DemandeReservation $demandeReservation)
    {
        //
    }
}
