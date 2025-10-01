<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialite extends Model
{
    use HasFactory;

    protected $table = 'specialites';

    // Champs assignables en masse
    protected $fillable = [
        'libelle',
    ];

    /**
     * Relation: une spécialité peut avoir plusieurs utilisateurs (si besoin).
     */
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'specialite_id', 'id');
    }
}
