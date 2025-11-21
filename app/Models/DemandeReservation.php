<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeReservation extends Model
{
    use HasFactory;

    protected $table = 'demande_reservations';

    // Champs assignables en masse
    protected $fillable = [
        'user_id',
        'salle_id',
        'date_reunion',
        'heure_debut',
        'duree',
        'sujet',
        'materiels',
        'autre_materiel',
        'commentaire',
        'statut',
        'motif_refus',
    ];

    /**
     * Relation: une demande appartient à un utilisateur.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Relation: une demande concerne une salle.
     */
    public function salle()
    {
        return $this->belongsTo(Salle::class, 'salle_id', 'id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class, 'demande_id');
    }

    /**
     * Les statuts possibles pour la demande.
     */
    public const STATUTS = ['attente', 'validee', 'refusee'];
}
