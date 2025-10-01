<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    // Champs assignables en masse
    protected $fillable = [
        'libelle',
    ];

    /**
     * Relation: un service peut avoir plusieurs utilisateurs.
     */
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'service_id', 'id');
    }

    /**
     * Relation: un service peut être utilisé dans plusieurs demandes de réservation.
     */
    public function demandes()
    {
        return $this->hasMany(Demande::class, 'service_id', 'id');
    }
}
