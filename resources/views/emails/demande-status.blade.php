<p>Bonjour {{ $demande->user->name }},</p>

<p>
    Nous vous informons que votre demande de réservation de salle a été 
    <strong>{{ $statut }}</strong>.
</p>

<p>
    <strong>Détails de la demande :</strong><br>
    📅 Date : {{ $demande->date_reunion }}<br>
    🕘 Heure : {{ $demande->heure_debut }} (durée : {{ $demande->duree }} minutes)<br>
    🏢 Salle : {{ $demande->salle->nom }}<br>
    📌 Sujet : {{ $demande->sujet }}
</p>

@if($statut === 'Refusée' && $motif)
<p><strong>Motif du refus :</strong> {{ $motif }}</p>
@endif

<br>
<p>Cette décision a été prise par <strong>{{ $secretaire->name }}</strong>.</p>

<p>Merci de votre compréhension,</p>
<p>L’équipe de gestion des réservations</p>
