<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/signup', function () {
    return Inertia::render('sign-up');
})->name('signup');

Route::get('/signin', function () {
    return Inertia::render('sign-in');
})->name('signin');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/wishlist', function () {
    return Inertia::render('wishlist');
})->name('wishlist');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('/billing', function () {
    return Inertia::render('billing');
})->name('billing');

Route::get('/product-show', function () {
    return Inertia::render('product-show');
})->name('product-show');

Route::get('/account/settings', function () {
    return Inertia::render('account/settings');
})->name('settings');

Route::get('/account/profile', function () {
    return Inertia::render('account/profile');
})->name('profile');

Route::get('/account/addresses', function () {
    return Inertia::render('account/address-book');
})->name('addresses');

Route::get('/account/payment-options', function () {
    return Inertia::render('account/payment-options');
})->name('payment-options');

Route::get('/account/orders', function () {
    return Inertia::render('account/orders');
})->name('orders');

Route::get('/account/returns', function () {
    return Inertia::render('account/returns');
})->name('returns');

Route::get('/account/wishlists', function () {
    return Inertia::render('account/wishlists');
})->name('wishlists');

Route::get('/account/privacy', function () {
    return Inertia::render('account/privacy');
})->name('privacy');

Route::get('/account/notifications', function () {
    return Inertia::render('account/notifications');
})->name('notifications');

Route::get('/account/cancellations', function () {
    return Inertia::render('account/cancellations');
})->name('cancellations');

Route::get('/account/help-center', function () {
    return Inertia::render('account/help-center');
})->name('help-center');

// super-admin

Route::get('/super-admin/dashboard', function () {
    return Inertia::render('super-admin/dashboard');
})->name('super-admin.dashboard');

Route::get('/super-admin/vendors', function () {
    return Inertia::render('super-admin/vendors');
})->name('super-admin.vendors');

Route::get('/super-admin/users', function () {
    return Inertia::render('super-admin/users');
})->name('super-admin.users');

Route::get('/super-admin/orders', function () {
    return Inertia::render('super-admin/orders');
})->name('super-admin.orders');

Route::get('/super-admin/categories', function () {
    return Inertia::render('super-admin/categories');
})->name('super-admin.categories');

Route::get('/super-admin/products', function () {
    return Inertia::render('super-admin/products');
})->name('super-admin.products');

Route::get('/super-admin/marketing', function () {
    return Inertia::render('super-admin/marketing');
})->name('super-admin.marketing');

Route::get('/super-admin/analytics', function () {
    return Inertia::render('super-admin/analytics');
})->name('super-admin.analytics');

Route::get('/super-admin/settings', function () {
    return Inertia::render('super-admin/settings');
})->name('super-admin.settings');


// vendor-admin
Route::get('/vendor-admin/dashboard', function () {
    return Inertia::render('vendor-admin/dashboard');
})->name('vendor-admin.dashboard');

Route::get('/vendor-admin/staffs', function () {
    return Inertia::render('vendor-admin/staffs');
})->name('vendor-admin.staffs');

Route::get('/vendor-admin/products', function () {
    return Inertia::render('vendor-admin/products');
})->name('vendor-admin.products');

Route::get('/vendor-admin/orders', function () {
    return Inertia::render('vendor-admin/orders');
})->name('vendor-admin.orders');

Route::get('/vendor-admin/refunds', function () {
    return Inertia::render('vendor-admin/refunds');
})->name('vendor-admin.refunds');

Route::get('/vendor-admin/analytics', function () {
    return Inertia::render('vendor-admin/analytics');
})->name('vendor-admin.analytics');

Route::get('/vendor-admin/reviews', function () {
    return Inertia::render('vendor-admin/reviews');
})->name('vendor-admin.reviews');

Route::get('/vendor-admin/settings', function () {
    return Inertia::render('vendor-admin/settings');
})->name('vendor-admin.settings');
