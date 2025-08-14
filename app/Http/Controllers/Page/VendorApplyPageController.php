<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VendorApplyPageController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('vendor-admin/vendor-apply', [
            'user' => $user,
        ]);
    }
}
