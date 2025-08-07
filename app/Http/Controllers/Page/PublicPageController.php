<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PublicPageController extends Controller {
    public function index() {
        $user = Auth::user();

        return Inertia::render('public-pages/index', [
            'user' => $user,
        ]);
    }

    public function contact() {
        return Inertia::render('public-pages/contact');
    }

    public function about() {
        return Inertia::render('public-pages/about');
    }
}
