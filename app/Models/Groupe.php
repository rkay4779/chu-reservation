<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Groupe extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    public function utilisateurs(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'groupe_utilisateur', 'groupe_id', 'utilisateur_id');
    }
}

