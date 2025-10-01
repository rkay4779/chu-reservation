<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    // Champs assignables en masse
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'specialite_id',
        'service_id',
        'profil_id',
    ];

    // Champs à cacher pour la sérialisation
    protected $hidden = [
        'password',
    ];

    /**
     * Relations
     */
    public function specialite()
    {
        return $this->belongsTo(Specialite::class, 'specialite_id', 'id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    public function profil()
    {
        return $this->belongsTo(Profil::class, 'profil_id', 'id');
    }
}
