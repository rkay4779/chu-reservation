<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JourFerie extends Model
{
    use HasFactory;

    protected $table = 'jours_feries';

    // Champs assignables en masse
    protected $fillable = [
        'date',
        'description',
        'type',
    ];

    /**
     * Les types possibles de jours fériés.
     */
    public const TYPES = ['nationale', 'religieuse', 'scolaire'];
}
