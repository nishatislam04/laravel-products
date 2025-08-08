<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VendorFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $storeName = $this->faker->unique()->company();
        $slug = Str::slug($storeName);

        return [
            'user_id' => User::factory(), // automatically creates user
            'store_name' => $storeName,
            'description' => $this->faker->paragraph(),
            'slug' => $slug,
            'logo' => $this->faker->imageUrl(200, 200, 'business', true, 'logo'),
            'banner' => $this->faker->imageUrl(1200, 300, 'business', true, 'banner'),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'country' => $this->faker->country(),
            'postal_code' => $this->faker->postcode(),
            'location' => $this->faker->latitude() . ', ' . $this->faker->longitude(),

            'business_name' => $this->faker->company(),
            'business_type' => $this->faker->randomElement(['Sole Proprietorship', 'Partnership', 'Corporation']),
            'tax_id' => strtoupper(Str::random(10)),
            'national_id' => $this->faker->numerify('############'),
            'trade_license' => strtoupper(Str::random(8)),
            'license_expiry' => $this->faker->optional()->dateTimeBetween('+1 year', '+5 years'),

            'is_active' => $this->faker->boolean(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'admin_note' => $this->faker->optional()->sentence(),

            'commission_rate' => $this->faker->randomFloat(2, 5, 20),
            'total_products' => $this->faker->numberBetween(0, 500),
            'total_orders' => $this->faker->numberBetween(0, 1000),
            'rating' => $this->faker->randomFloat(1, 0, 5),
        ];
    }
}
