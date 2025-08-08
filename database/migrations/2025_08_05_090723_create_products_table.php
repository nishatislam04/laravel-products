<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            // $table->id();
            // $table->string('name');
            // $table->string('slug')->unique();
            // $table->longText('description')->nullable();
            // $table->string('thumbnail')->nullable();
            // $table->decimal('price', 10, 2);
            // $table->integer('stock')->default(0);
            // $table->boolean('is_active')->default(true);

            // $table->foreignId('category_id')->constrained()->onDelete('cascade');
            // $table->foreignId('brand_id')->constrained()->onDelete('cascade');

            // $table->timestamps();
            $table->id();

            // Basic Info
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade'); // Link to Vendor
            $table->string('name');
            $table->string('slug')->unique();
            $table->longText('description')->nullable();

            // Pricing
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable(); // For discounts
            $table->date('sale_start')->nullable();
            $table->date('sale_end')->nullable();

            // Stock & SKU
            $table->string('sku')->nullable()->unique();
            $table->integer('stock')->default(0);
            $table->enum('stock_status', ['in_stock', 'out_of_stock', 'pre_order'])->default('in_stock');

            // Media
            $table->string('thumbnail')->nullable(); // Main Image
            $table->json('images')->nullable(); // Additional Images

            // Shipping
            $table->decimal('weight', 8, 2)->nullable();
            $table->decimal('length', 8, 2)->nullable();
            $table->decimal('width', 8, 2)->nullable();
            $table->decimal('height', 8, 2)->nullable();

            // Category & Brand
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->nullable()->constrained()->onDelete('set null');

            // SEO
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('tags')->nullable();

            // Status & Review
            $table->boolean('is_active')->default(true);
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending');

            // Return & Warranty
            $table->integer('return_days')->nullable();
            $table->string('warranty_type')->nullable(); // e.g., "Manufacturer", "Seller"
            $table->integer('warranty_period')->nullable(); // in months

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('products');
    }
};
