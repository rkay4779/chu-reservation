<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeReservation extends Model
{
    use HasFactory;

    protected $table = 'demandes_reservations';

    // Champs assignables en masse
    protected $fillable = [
        'utilisateur_id',
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
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id', 'id');
    }

    /**
     * Relation: une demande concerne une salle.
     */
    public function salle()
    {
        return $this->belongsTo(Salle::class, 'salle_id', 'id');
    }

    /**
     * Les statuts possibles pour la demande.
     */
    public const STATUTS = ['attente', 'validee', 'refusee'];
}
