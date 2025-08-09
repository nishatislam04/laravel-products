<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // === Top-Level Categories ===
        $categories = [
            'Electronics' => [
                'Computers & Laptops' => [
                    'Gaming Laptops',
                    'Business Laptops',
                    '2-in-1 Laptops'
                ],
                'Mobile Phones' => [
                    'Smartphones',
                    'Feature Phones',
                    'Refurbished Phones'
                ],
                'Televisions' => [
                    'LED TVs',
                    'OLED TVs',
                    'Smart TVs'
                ]
            ],
            'Fashion' => [
                'Men\'s Clothing' => [
                    'T-Shirts',
                    'Shirts',
                    'Jeans'
                ],
                'Women\'s Clothing' => [
                    'Dresses',
                    'Tops',
                    'Skirts'
                ],
                'Accessories' => [
                    'Watches',
                    'Belts',
                    'Hats'
                ]
            ],
            'Home & Kitchen' => [
                'Furniture' => [
                    'Sofas',
                    'Beds',
                    'Dining Tables'
                ],
                'Appliances' => [
                    'Refrigerators',
                    'Microwaves',
                    'Washing Machines'
                ],
                'Decor' => [
                    'Wall Art',
                    'Lighting',
                    'Rugs'
                ]
            ]
        ];

        // === Insert Categories Recursively ===
        foreach ($categories as $parentName => $subCategories) {
            $parent = Category::create([
                'name' => $parentName,
                'slug' => Str::slug($parentName),
                'parent_id' => null,
                // 'sort_order' => 0,
                'status' => 'active'
            ]);

            foreach ($subCategories as $childName => $grandChildren) {
                // If $grandChildren is array => we have 3 levels
                if (is_array($grandChildren)) {
                    $child = Category::create([
                        'name' => $childName,
                        'slug' => Str::slug($childName),
                        'parent_id' => $parent->id,
                        // 'sort_order' => 0,
                        'status' => 'active'
                    ]);

                    foreach ($grandChildren as $grandChildName) {
                        Category::create([
                            'name' => $grandChildName,
                            'slug' => Str::slug($grandChildName),
                            'parent_id' => $child->id,
                            // 'sort_order' => 0,
                            'status' => 'active'
                        ]);
                    }
                } else {
                    // If no grandchildren, just create as child
                    Category::create([
                        'name' => $grandChildren,
                        'slug' => Str::slug($grandChildren),
                        'parent_id' => $parent->id,
                        // 'sort_order' => 0,
                        'status' => 'active'
                    ]);
                }
            }
        }
    }
}
