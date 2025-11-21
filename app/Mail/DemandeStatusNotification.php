<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DemandeStatusNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $demande;

    public $statut;

    public $secretaire;

    public $motif;

    public function __construct($demande, $statut, $secretaire, $motif = null)
    {
        $this->demande = $demande;
        $this->statut = $statut;
        $this->secretaire = $secretaire;
        $this->motif = $motif;
    }

    public function build()
    {
        $objet = "[$this->statut] Demande de réservation de salle";

        // Définit dynamiquement l'expéditeur
        return $this->from($this->secretaire->email, $this->secretaire->name)
            ->subject($objet)
            ->view('emails.demande-status');
    }
}
