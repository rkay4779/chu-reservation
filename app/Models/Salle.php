<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $table = 'salles';

    // Champs assignables en masse
    protected $fillable = [
        'nom',
        'description',
        'capacite',
        'hopital_id',
    ];

    /**
     * Relation: une salle appartient à un hôpital.
     */
    public function hopital()
    {
        return $this->belongsTo(Hopital::class, 'hopital_id', 'id');
    }
}
