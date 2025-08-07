<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $roles = [
            ['name' => 'user', 'label' => 'User'],
            ['name' => 'super_admin', 'label' => 'Super Admin'],
            ['name' => 'vendor_admin', 'label' => 'Vendor Admin'],
            ['name' => 'vendor_staff', 'label' => 'Vendor Staff'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
