<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ensure users exists
        if (! Schema::hasTable('users')) {
            // If users doesn't exist, abort gracefully so dev can create users first
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            // add telephone if not present
            if (! Schema::hasColumn('users', 'telephone')) {
                $table->string('telephone')->nullable()->after('password');
            }

            // add fk columns (nullable)
            if (! Schema::hasColumn('users', 'profil_id')) {
                $table->unsignedBigInteger('profil_id')->nullable()->after('telephone');
            }

            if (! Schema::hasColumn('users', 'specialite_id')) {
                $table->unsignedBigInteger('specialite_id')->nullable()->after('profil_id');
            }

            if (! Schema::hasColumn('users', 'service_id')) {
                $table->unsignedBigInteger('service_id')->nullable()->after('specialite_id');
            }
        });

        // add foreign key constraints in a second Schema::table call
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasTable('profils') && Schema::hasColumn('users', 'profil_id')) {
                $table->foreign('profil_id')->references('id')->on('profils')->nullOnDelete();
            }

            if (Schema::hasTable('specialites') && Schema::hasColumn('users', 'specialite_id')) {
                $table->foreign('specialite_id')->references('id')->on('specialites')->nullOnDelete();
            }

            if (Schema::hasTable('services') && Schema::hasColumn('users', 'service_id')) {
                $table->foreign('service_id')->references('id')->on('services')->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('users')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            // drop FKs if exist then columns
            try {
                $table->dropForeign(['profil_id']);
            } catch (\Throwable $e) {
            }
            try {
                $table->dropForeign(['specialite_id']);
            } catch (\Throwable $e) {
            }
            try {
                $table->dropForeign(['service_id']);
            } catch (\Throwable $e) {
            }

            if (Schema::hasColumn('users', 'profil_id')) {
                $table->dropColumn('profil_id');
            }
            if (Schema::hasColumn('users', 'specialite_id')) {
                $table->dropColumn('specialite_id');
            }
            if (Schema::hasColumn('users', 'service_id')) {
                $table->dropColumn('service_id');
            }
            if (Schema::hasColumn('users', 'telephone')) {
                $table->dropColumn('telephone');
            }
        });
    }
};
