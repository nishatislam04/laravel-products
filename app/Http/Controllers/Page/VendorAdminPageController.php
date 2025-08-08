<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Brand;

class VendorAdminPageController extends Controller {
    public function overviewSection() {
        return Inertia::render('vendor-admin/overview');
    }

    public function staffsSection() {
        return Inertia::render('vendor-admin/staffs');
    }

    public function productsSection() {
        $categories = Category::all();
        $brands = Brand::all();
        $stockStatusEnum = [
            ['label' => 'In Stock', 'value' => 'in_stock'],
            ['label' => 'Out of Stock', 'value' => 'out_of_stock'],
            ['label' => 'Pre Order', 'value' => 'pre_order'],
        ];
        $warrentTypeEnum = [
            ['label' => 'Manufacturer', 'value' => 'manufacturer'],
            ['label' => 'Seller', 'value' => 'seller'],
        ];
        return Inertia::render('vendor-admin/products', [
            'categories' => $categories,
            'brands' => $brands,
            'stockStatusEnum' => $stockStatusEnum,
            'warrentTypeEnum' => $warrentTypeEnum,
        ]);
    }

    public function ordersSection() {
        return Inertia::render('vendor-admin/orders');
    }

    public function refundsSection() {
        return Inertia::render('vendor-admin/refunds');
    }

    public function analyticsSection() {
        return Inertia::render('vendor-admin/analytics');
    }

    public function reviewsSection() {
        return Inertia::render('vendor-admin/reviews');
    }

    public function settingsSection() {
        return Inertia::render('vendor-admin/settings');
    }
}
