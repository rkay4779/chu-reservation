<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecretaireSalle extends Model
{
    use HasFactory;

    protected $table = 'secretaire_salle';

    // Champs assignables en masse
    protected $fillable = [
        'secretaire_id',
        'salle_id',
    ];

    /**
     * Relation: un secrétaire est un utilisateur.
     */
    public function secretaire()
    {
        return $this->belongsTo(Utilisateur::class, 'secretaire_id', 'id');
    }

    /**
     * Relation: une salle.
     */
    public function salle()
    {
        return $this->belongsTo(Salle::class, 'salle_id', 'id');
    }
}
