<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'specialite_id',
        'service_id',
        'profil_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int,string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        // 'hashed' cast requires Laravel 10+ and will hash on set
        'password' => 'hashed',
    ];

    /**
     * Relations
     */
    public function specialite(): BelongsTo
    {
        return $this->belongsTo(Specialite::class, 'specialite_id', 'id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }

    public function profil(): BelongsTo
    {
        return $this->belongsTo(Profil::class, 'profil_id', 'id');
    }

    /**
     * Check profil by libelle (case-insensitive).
     */
    public function isProfil(string $libelle): bool
    {
        $p = $this->profil;
        if (! $p) {
            return false;
        }

        return strcasecmp(trim($p->libelle), trim($libelle)) === 0;
    }
}
