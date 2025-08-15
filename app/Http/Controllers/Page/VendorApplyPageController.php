<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Carbon\Carbon;
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
        $vendor = Vendor::find($vendorId);

        $expiresAt = $vendor?->otp_expires_at;
        $timeLeft = max(
            0,
            (int) Carbon::now()->diffInSeconds(Carbon::parse($expiresAt), false)  // cast to int
        );

        $now = Carbon::now();
        $canResend = false;
        $resendCooldown = 0;  // seconds until unlock

        if ($vendor->otp_last_sent_at) {
            // Time difference in seconds since last OTP sent
            $secondsSinceLastSend = $vendor->otp_last_sent_at->diffInSeconds($now);

            if ($vendor->otp_attempts >= $vendor->otp_max_attempts) {
                // Max attempts reached → 1 hour cooldown
                if ($secondsSinceLastSend >= 3600) {
                    $canResend = true;
                } else {
                    $resendCooldown = 3600 - $secondsSinceLastSend;
                }
            } else {
                // Not max attempts → 3 minutes cooldown
                if ($secondsSinceLastSend >= 180) {
                    $canResend = true;
                } else {
                    $resendCooldown = 180 - $secondsSinceLastSend;
                }
            }
        } else {
            // No previous OTP sent → can resend immediately
            $canResend = true;
        }

        return Inertia::render('vendor-apply/vendor-apply-otp', [
            'vendor_id' => $vendorId,
            'otp_metaData' => [
                'attempts' => $vendor?->otp_attempts,
                'maxAttempts' => $vendor?->otp_max_attempts,
                'expiresAt' => $timeLeft,
                'canResend' => $canResend,
                'resendCooldown' => $resendCooldown,
            ]
        ]);
    }
}
