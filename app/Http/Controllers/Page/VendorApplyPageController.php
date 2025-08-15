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

        return Inertia::render('vendor-apply/vendor-apply', [
            'user' => $user
        ]);
    }

    public function showOtpPage()
    {
        $vendorId = session('otp_vendor_id');

        return Inertia::render('vendor-apply/vendor-apply-otp', [
            'vendor_id' => $vendorId
        ]);
    }
}
