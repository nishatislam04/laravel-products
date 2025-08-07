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
