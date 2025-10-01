<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hopital extends Model
{
    use HasFactory;

    protected $table = 'hopitals';

    // Champs assignables en masse
    protected $fillable = [
        'nom',
        'description',
    ];

    /**
     * Relation: un hôpital peut avoir plusieurs services.
     */
    // public function services()
    // {
    //     return $this->hasMany(Service::class, 'hopital_id', 'id');
    // }
}
