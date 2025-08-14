<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Page\PublicPageController;
use App\Http\Controllers\Page\SuperAdminPageController;
use App\Http\Controllers\Page\VendorAdminPageController;
use App\Http\Controllers\Page\VendorApplyPageController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Vendor\VendorApplyController;
use App\Http\Controllers\Vendor\VendorManageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PublicPageController::class, 'index'])->name('home.page');

Route::get('/signin', [AuthController::class, 'showSigninForm'])->name('signin.page');
Route::get('/signup', [AuthController::class, 'showSignupForm'])->name('signup.page');
Route::post('/signin', [AuthController::class, 'signin'])->name('signin');
Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/signout', [AuthController::class, 'signout'])->name('signout');

Route::get('/contact', [PublicPageController::class, 'contact'])->name('contact.page');
Route::get('/about', [PublicPageController::class, 'about'])->name('about.page');

Route::get('/vendor-apply', [VendorApplyPageController::class, 'index'])->name('vendor.apply.page');
Route::post('/vendor-apply', [VendorApplyController::class, 'store'])->name('vendor.apply.store');

Route::get('/super-admin/overview', [SuperAdminPageController::class, 'overviewSection'])->name('super-admin.overview.page');
Route::get('/super-admin/vendors', [SuperAdminPageController::class, 'vendorSection'])->name('super-admin.vendors.page');
Route::get('/super-admin/users', [SuperAdminPageController::class, 'userSection'])->name('super-admin.users.page');
Route::get('/super-admin/orders', [SuperAdminPageController::class, 'orderSection'])->name('super-admin.orders.page');
Route::get('/super-admin/categories', [SuperAdminPageController::class, 'categorySection'])->name('super-admin.categories.page');
Route::get('/super-admin/products', [SuperAdminPageController::class, 'productSection'])->name('super-admin.products.page');
Route::get('/super-admin/marketing', [SuperAdminPageController::class, 'marketingSection'])->name('super-admin.marketing.page');
Route::get('/super-admin/analytics', [SuperAdminPageController::class, 'analyticsSection'])->name('super-admin.analytics.page');
Route::get('/super-admin/settings', [SuperAdminPageController::class, 'settingsSection'])->name('super-admin.settings.page');

Route::post('/super-admin/approve-vendor', [VendorManageController::class, 'approveVendor'])->name('super-admin.approve-vendor');
Route::post('/super-admin/reject-vendor', [VendorManageController::class, 'rejectVendor'])->name('super-admin.reject-vendor');

Route::get('/wishlist', function () {
    return Inertia::render('wishlist');
})->name('wishlist.page');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart.page');

Route::get('/billing', function () {
    return Inertia::render('billing');
})->name('billing.page');

Route::get('/product-show', function () {
    return Inertia::render('product-show');
})->name('product-show.page');

Route::get('/account/settings', function () {
    return Inertia::render('account/settings');
})->name('settings.page');

Route::get('/account/profile', function () {
    return Inertia::render('account/profile');
})->name('profile.page');

Route::get('/account/addresses', function () {
    return Inertia::render('account/address-book');
})->name('addresses.page');

Route::get('/account/payment-options', function () {
    return Inertia::render('account/payment-options');
})->name('payment-options.page');

Route::get('/account/orders', function () {
    return Inertia::render('account/orders');
})->name('orders.page');

Route::get('/account/returns', function () {
    return Inertia::render('account/returns');
})->name('returns.page');

Route::get('/account/wishlists', function () {
    return Inertia::render('account/wishlists');
})->name('wishlists.page');

Route::get('/account/privacy', function () {
    return Inertia::render('account/privacy');
})->name('privacy.page');

Route::get('/account/notifications', function () {
    return Inertia::render('account/notifications');
})->name('notifications.page');

Route::get('/account/cancellations', function () {
    return Inertia::render('account/cancellations');
})->name('cancellations.page');

Route::get('/account/help-center', function () {
    return Inertia::render('account/help-center');
})->name('help-center.page');

Route::get('/vendor-admin/overview', [VendorAdminPageController::class, 'overviewSection'])->name('vendor-admin.overview.page');
Route::get('/vendor-admin/staffs', [VendorAdminPageController::class, 'staffsSection'])->name('vendor-admin.staffs.page');
Route::get('/vendor-admin/products', [VendorAdminPageController::class, 'productsSection'])->name('vendor-admin.products.page');
Route::get('/vendor-admin/orders', [VendorAdminPageController::class, 'ordersSection'])->name('vendor-admin.orders.page');
Route::get('/vendor-admin/refunds', [VendorAdminPageController::class, 'refundsSection'])->name('vendor-admin.refunds.page');
Route::get('/vendor-admin/analytics', [VendorAdminPageController::class, 'analyticsSection'])->name('vendor-admin.analytics.page');
Route::get('/vendor-admin/reviews', [VendorAdminPageController::class, 'reviewsSection'])->name('vendor-admin.reviews.page');
Route::get('/vendor-admin/settings', [VendorAdminPageController::class, 'settingsSection'])->name('vendor-admin.settings.page');

Route::post('/vendor-admin/products/store', [ProductController::class, 'store'])->name('vendor-admin.products.store');

// vendor-admin
// Route::get('/vendor-admin/dashboard', function () {
//     return Inertia::render('vendor-admin/dashboard');
// })->name('vendor-admin.dashboard');

// Route::get('/vendor-admin/staffs', function () {
//     return Inertia::render('vendor-admin/staffs');
// })->name('vendor-admin.staffs');

// Route::get('/vendor-admin/products', function () {
//     return Inertia::render('vendor-admin/products');
// })->name('vendor-admin.products');

// Route::get('/vendor-admin/orders', function () {
//     return Inertia::render('vendor-admin/orders');
// })->name('vendor-admin.orders');

// Route::get('/vendor-admin/refunds', function () {
//     return Inertia::render('vendor-admin/refunds');
// })->name('vendor-admin.refunds');

// Route::get('/vendor-admin/analytics', function () {
//     return Inertia::render('vendor-admin/analytics');
// })->name('vendor-admin.analytics');

// Route::get('/vendor-admin/reviews', function () {
//     return Inertia::render('vendor-admin/reviews');
// })->name('vendor-admin.reviews');

// Route::get('/vendor-admin/settings', function () {
//     return Inertia::render('vendor-admin/settings');
// })->name('vendor-admin.settings');
