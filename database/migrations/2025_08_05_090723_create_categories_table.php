<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            // Core category fields
            $table->string('name')->unique(); // Display name
            $table->string('slug')->unique(); // URL-friendly version of name

            // Parent category for hierarchy (nullable for top-level)
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('cascade');

            // Optional image/icon for frontend display
            $table->string('image')->nullable(); // Stored in public storage
            $table->string('icon')->nullable(); // Could be a CSS class or icon name

            // SEO fields
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // Description for category page
            $table->text('description')->nullable();

            // Sorting & status
            $table->unsignedInteger('sort_order')->default(0); // For menu ordering
            $table->enum('status', ['active', 'inactive'])->default('active');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('categories');
    }
};
