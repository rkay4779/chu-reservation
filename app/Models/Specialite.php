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
        'service_id'
    ];

    /**
     * Relation: une spécialité peut avoir plusieurs utilisateurs (si besoin).
     */
    public function users()
    {
        return $this->hasMany(User::class, 'specialite_id', 'id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
