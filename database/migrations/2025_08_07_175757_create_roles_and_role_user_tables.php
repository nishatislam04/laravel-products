<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        // Roles table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->enum('name', ['user', 'super_admin', 'vendor_admin', 'vendor_staff'])->unique();
            $table->string('label')->nullable();
            $table->timestamps();
        });

        // Pivot table: user_role
        Schema::create('role_user', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->primary(['user_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('roles');
        Schema::dropIfExists('role_user');
    }
};
