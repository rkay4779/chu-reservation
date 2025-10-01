<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $table = 'participants';

    // Champs assignables en masse
    protected $fillable = [
        'demande_id',
        'type',
        'valeur',
    ];

    /**
     * Relation: un participant appartient à une demande.
     */
    public function demande()
    {
        return $this->belongsTo(DemandeReservation::class, 'demande_id', 'id');
    }

    /**
     * Les types possibles de participants.
     */
    public const TYPES = ['groupe', 'profil', 'nom', 'nouveau'];
}
