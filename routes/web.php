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
