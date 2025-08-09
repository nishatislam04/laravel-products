<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Category;

class SuperAdminPageController extends Controller {

    public function overviewSection() {
        return Inertia::render('super-admin/overview');
    }

    public function vendorSection() {
        $vendors = Vendor::where('status', 'Pending')->get();

        return Inertia::render('super-admin/vendors', [
            'vendors' => $vendors,
        ]);
    }

    public function userSection() {
        return Inertia::render('super-admin/users');
    }

    public function orderSection() {
        return Inertia::render('super-admin/orders');
    }

    public function categorySection() {
        $categories = Category::all();
        return Inertia::render('super-admin/categories', [
            'categories' => $categories,
        ]);
    }

    public function productSection() {
        return Inertia::render('super-admin/products');
    }

    public function marketingSection() {
        return Inertia::render('super-admin/marketing');
    }

    public function analyticsSection() {
        return Inertia::render('super-admin/analytics');
    }

    public function settingsSection() {
        return Inertia::render('super-admin/settings');
    }
}
