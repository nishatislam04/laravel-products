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
