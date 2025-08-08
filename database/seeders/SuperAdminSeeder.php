<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $role = Role::firstOrCreate(
            ['name' => 'super_admin'],
            ['label' => 'Super Admin']
        );

        $user = User::firstOrCreate(
            ['email' => 'nishatislam3108@gmail.com'],
            [
                'name' => 'Nishat Islam',
                'password' => Hash::make('12345678'),
                'status' => 'active',
            ]
        );

        if (! $user->roles->contains($role->id)) {
            $user->roles()->attach($role->id);
        }

        $this->command->info('Super Admin user seeded.');
    }
}
