<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        // Generate a realistic product name
        $name = $this->faker->unique()->words(3, true);

        // Optional sale prices
        $hasSale = $this->faker->boolean(30); // 30% chance product has a sale

        return [
            // Foreign keys
            'vendor_id' => Vendor::factory(), // Creates a vendor if not passed
            'category_id' => Category::factory(),
            'brand_id' => Brand::factory(),

            // Basic Info
            'name' => $name,
            'slug' => Str::slug($name . '-' . Str::random(6)),
            'description' => $this->faker->paragraphs(3, true),

            // Pricing
            'price' => $this->faker->randomFloat(2, 5, 500),
            'sale_price' => $hasSale
                ? $this->faker->randomFloat(2, 5, 400)
                : null,
            'sale_start' => $hasSale ? now()->subDays(rand(0, 5)) : null,
            'sale_end' => $hasSale ? now()->addDays(rand(1, 10)) : null,

            // Stock & SKU
            'sku' => strtoupper(Str::random(8)),
            'stock' => $this->faker->numberBetween(0, 100),
            'stock_status' => $this->faker->randomElement(['in_stock', 'out_of_stock', 'pre_order']),

            // Media
            'thumbnail' => $this->faker->imageUrl(640, 480, 'products', true),
            'images' => json_encode([
                $this->faker->imageUrl(640, 480, 'products', true),
                $this->faker->imageUrl(640, 480, 'products', true)
            ]),

            // Shipping
            'weight' => $this->faker->randomFloat(2, 0.1, 10),
            'length' => $this->faker->randomFloat(2, 5, 50),
            'width' => $this->faker->randomFloat(2, 5, 50),
            'height' => $this->faker->randomFloat(2, 5, 50),

            // SEO
            'meta_title' => $name,
            'meta_description' => $this->faker->sentence(12),
            'tags' => implode(',', $this->faker->words(5)),

            // Status
            'is_active' => $this->faker->boolean(80), // 80% active
            'approval_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),

            // Return & Warranty
            'return_days' => $this->faker->randomElement([null, 7, 14, 30]),
            'warranty_type' => $this->faker->randomElement([null, 'Manufacturer', 'Seller']),
            'warranty_period' => $this->faker->randomElement([null, 6, 12, 24]),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
