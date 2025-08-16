<?php

namespace App\Http\Controllers\Page;

use App\Enums\Vendors\VendorOtpStatusEnum;
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

        // CHECK OTP STATUS
        $this->checkOtpStatus($vendor);

        // CALCULATE TIME LEFT
        $timeLeft = $this->calculateTimeLeft($vendor);

        // CHECK RESEND COOLDOWN
        $resendCooldownData = $this->checkResendCooldown($vendor);

        return Inertia::render('vendor-apply/vendor-apply-otp', [
            'vendor_id' => $vendorId,
            'otp_metaData' => [
                'attempts' => $vendor?->otp_attempts,
                'maxAttempts' => $vendor?->otp_max_attempts,
                'expiresAt' => $timeLeft,
                'canResend' => $resendCooldownData['canResend'],
                'resendCooldown' => $resendCooldownData['resendCooldown'],
            ]
        ]);
    }

    private function checkOtpStatus($vendor)
    {
        if ($vendor->otp_status === VendorOtpStatusEnum::COMPLETE) {
            session()->forget('otp_vendor_id');

            return Inertia::render('vendor-apply/vendor-apply-otp', [
                'vendor_id' => $vendor->id,
                'otp_metaData' => [
                    'attempts' => $vendor->otp_attempts,
                    'maxAttempts' => $vendor->otp_max_attempts,
                    'expiresAt' => $vendor->otp_expires_at,
                    'canResend' => $vendor->otp_last_sent_at,
                    'resendCooldown' => $vendor?->otp_resend_cooldown_seconds,
                ]
            ])->with('success', 'Vendor otp verified successfully!');
        }
    }

    private function calculateTimeLeft($vendor)
    {
        $expiresAt = $vendor?->otp_expires_at;

        return max(
            0,
            (int) Carbon::now()->diffInSeconds(Carbon::parse($expiresAt), false)  // cast to int
        );
    }

    private function checkResendCooldown($vendor)
    {
        $now = Carbon::now();
        $canResend = false;
        $resendCooldown = 0;  // seconds until unlock

        if ($vendor->otp_last_sent_at) {
            // Time difference in seconds since last OTP sent
            $secondsSinceLastSend = $vendor->otp_last_sent_at->diffInSeconds($now);

            if ($vendor->otp_attempts >= $vendor->otp_max_attempts) {
                // Max attempts reached → 1 hour cooldown
                if ($secondsSinceLastSend >= $vendor->otp_resend_cooldown_max_attempts_seconds) {
                    $canResend = true;
                } else {
                    $resendCooldown = $vendor->otp_resend_cooldown_max_attempts_seconds - $secondsSinceLastSend;
                }
            } else {
                // Not max attempts → 3 minutes cooldown
                if ($secondsSinceLastSend >= $vendor->otp_resend_cooldown_seconds) {
                    $canResend = true;
                } else {
                    $resendCooldown = $vendor->otp_resend_cooldown_seconds - $secondsSinceLastSend;
                }
            }
        } else {
            // No previous OTP sent → can resend immediately
            $canResend = true;
        }

        return [
            'canResend' => $canResend,
            'resendCooldown' => $resendCooldown,
        ];
    }
}
