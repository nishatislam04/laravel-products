<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();

            // User reference
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');

            // Store branding
            $table->string('store_name')->unique();
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();

            // Contact & location
            $table->string('email');
            $table->string('phone')->unique();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('location')->nullable(); // if you need map features

            // Legal & business info
            $table->string('business_name')->nullable();
            $table->string('business_type')->nullable(); // Sole Proprietorship, etc.
            $table->string('tax_id')->nullable();
            $table->string('national_id')->nullable();
            $table->string('trade_license')->nullable();
            $table->date('license_expiry')->nullable();

            // Store settings
            $table->boolean('is_active')->default(false); // Controlled by admin
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_note')->nullable();

            // Commission
            $table->decimal('commission_rate', 5, 2)->default(10); // % per sale

            // Performance
            $table->integer('total_products')->default(0);
            $table->integer('total_orders')->default(0);
            $table->float('rating')->default(0);

            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('vendors');
    }
};
