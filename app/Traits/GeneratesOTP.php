<?php

namespace App\Traits;

use App\Enums\Vendors\VendorOtpStatusEnum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

trait GeneratesOTP
{
    /**
     * Generate a secure 6-digit OTP and store it on the vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @param  int  $expiryMinutes
     * @param  int  $maxAttempts
     * @return array
     */
    public function generateOtp($vendor, $expiryMinutes = 5, $maxAttempts = 3)
    {
        $otp = random_int(100000, 999999);

        $data = $vendor->update([
            'otp_code' => Hash::make($otp),
            'otp_created_at' => now(),
            'otp_expires_at' => now()->addMinutes($expiryMinutes),
            'otp_attempts' => 0,
            'otp_last_sent_at' => now(),
            'otp_max_attempts' => $maxAttempts,
        ]);

        return [
            'otp_code' => $otp,
            'otp_expires_at' => $vendor->otp_expires_at,
            'otp_attempts' => $vendor->otp_attempts,
            'otp_max_attempts' => $vendor->otp_max_attempts,
        ];
    }

    /**
     * Validate the given OTP.
     *
     * @param  \App\Models\Vendor  $vendor
     * @param  string  $inputOtp
     * @return array
     */
    public function validateOtp($vendor, $inputOtp)
    {
        // Expired?
        if (now()->greaterThan($vendor->otp_expires_at)) {
            // ! update otp realted fields

            return ['status' => false, 'data' => ['message' => 'OTP expired', 'maxAttempts' => $vendor->otp_max_attempts, 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // hit max attempts
        if ($vendor->otp_attempts >= $vendor->otp_max_attempts) {
            // ! update otp realted fields
            return ['status' => false, 'data' => ['message' => 'Too many incorrect attempts', 'maxAttempts' => $vendor->otp_max_attempts, 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // Check OTP. when does not match
        if (!Hash::check($inputOtp, $vendor->otp_code)) {
            $vendor->increment('otp_attempts');
            return ['status' => false, 'data' => ['message' => 'Invalid OTP', 'maxAttempts' => $vendor->otp_max_attempts, 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // OTP valid — clear it
        $vendor->update([
            'otp_code' => null,
            'otp_created_at' => null,
            'otp_expires_at' => null,
            'otp_attempts' => 0,
            'otp_status' => VendorOtpStatusEnum::COMPLETE,
        ]);

        session()->forget('otp_vendor_id');
        return ['status' => true, 'data' => ['message' => 'OTP verified successfully']];
    }

    /**
     * Check if vendor can request a new OTP.
     * vendor can request a new OTP after 60 seconds
     *
     * @param  \App\Models\Vendor  $vendor
     * @param  int  $cooldownSeconds
     * @return bool
     */
    public function canResendOtp($vendor, $cooldownSeconds = 60)
    {
        if (!$vendor->otp_last_sent_at)
            return true;

        return now()->diffInSeconds($vendor->otp_last_sent_at) >= $cooldownSeconds;
    }
}
