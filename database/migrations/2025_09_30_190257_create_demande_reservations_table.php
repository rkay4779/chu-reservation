<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demande_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
            $table->foreignId('salle_id')->constrained('salles')->onDelete('cascade');

            $table->date('date_reunion');
            $table->time('heure_debut');
            $table->integer('duree');
            $table->string('sujet', 255);          // longueur max 255 caractères
            $table->string('materiels', 500)->nullable(); // liste de matériels séparés par des virgules
            $table->string('autre_materiel', 255)->nullable();
            $table->string('commentaire', 500)->nullable();
            $table->enum('statut', ['attente', 'validee', 'refusee'])->default('attente');
            $table->string('motif_refus', 500)->nullable();
                    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_reservations');
    }
};
