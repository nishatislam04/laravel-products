<?php

namespace App\Traits;

use App\Enums\Vendors\VendorOtpStatusEnum;
use Illuminate\Support\Facades\Hash;

trait GeneratesOTP
{
    /**
     * Generate a secure 6-digit OTP and store it on the vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @param  int  $expiryMinutes
     * @return int
     */
    public function generateOtp($vendor, $expiryMinutes = 5)
    {
        // Generate random 6-digit number
        $otp = random_int(100000, 999999);

        // Save hashed OTP and timestamps
        $vendor->update([
            'otp_code' => Hash::make($otp),  // hashed for security
            'otp_created_at' => now(),
            'otp_expires_at' => now()->addMinutes($expiryMinutes),
            'otp_attempts' => 0,
            'otp_last_sent_at' => now(),
        ]);

        return $otp;
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
        $maxAttempts = 3;
        // Expired?
        if (now()->greaterThan($vendor->otp_expires_at)) {
            return ['status' => false, 'message' => 'OTP expired'];
        }

        // Too many attempts?
        if ($vendor->otp_attempts >= $maxAttempts) {
            return ['status' => false, 'message' => 'Too many incorrect attempts'];
        }

        // Check OTP. when does not match
        if (!Hash::check($inputOtp, $vendor->otp_code)) {
            $vendor->increment('otp_attempts');
            return ['status' => false, 'message' => 'Invalid OTP'];
        }

        // OTP valid — clear it
        $vendor->update([
            'otp_code' => null,
            'otp_created_at' => null,
            'otp_expires_at' => null,
            'otp_attempts' => 0,
            'otp_status' => VendorOtpStatusEnum::COMPLETE,
        ]);

        return ['status' => true, 'message' => 'OTP verified successfully'];
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
