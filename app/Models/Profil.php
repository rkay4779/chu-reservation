<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    use HasFactory;

    protected $table = 'profils';

    // Champs assignables en masse
    protected $fillable = [
        'libelle',
    ];

    /**
     * Relation: un profil a plusieurs utilisateurs.
     */
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'profil_id', 'id');
    }
}
