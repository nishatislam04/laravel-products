<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
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
        $name = $this->faker->unique()->words(3, true);
        return [
            'name' => $name,
            'slug' => Str::slug($name . '-' . Str::random(6)),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'stock' => $this->faker->numberBetween(0, 10),
            'is_active' => $this->faker->boolean(0),
            'thumbnail' => $this->faker->imageUrl(),
            'category_id' => Category::factory(),
            'brand_id' => Brand::factory(),
        ];
    }
}
