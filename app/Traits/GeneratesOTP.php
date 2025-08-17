<?php

namespace App\Traits;

use App\Enums\Vendors\VendorOtpStatusEnum;
use App\Enums\Vendors\VendorStatusEnum;
use App\Models\Vendor;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

trait GeneratesOTP
{
    private function generateOtpCode($vendor)
    {
        $otpLength = $vendor->otp_length ?? 6;

        $min = pow(10, $otpLength - 1);
        $max = pow(10, $otpLength) - 1;

        $otp = random_int($min, $max);

        return $otp;
    }

    /**
     * Generate a secure 6-digit OTP and store it on the vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return array
     */
    public function generateOtp($vendor)
    {
        $otp = $this->generateOtpCode($vendor);

        $expiredMinutes = 30;

        $vendor->update([
            'otp_code' => Hash::make($otp),
            'otp_created_at' => now(),
            'otp_attempts' => 0,
            'otp_last_sent_at' => now(),
            'otp_expires_at' => now()->addMinutes($expiredMinutes),
        ]);

        $vendor = Vendor::find($vendor->id);

        return [
            'otp_code' => $otp,
            'otp_expires_at' => $vendor->otp_expires_at,
            'otp_attempts' => $vendor->otp_attempts,
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
        // When Expired
        if (now()->greaterThan($vendor->otp_expires_at)) {
            $vendor->update([
                'otp_code' => null,
                'otp_created_at' => null,
                'otp_expires_at' => null,
                'otp_attempts' => 0,
                'otp_last_sent_at' => null,
                'otp_status' => VendorOtpStatusEnum::INCOMPLETE,
            ]);

            return ['status' => false, 'data' => ['message' => 'OTP expired', 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // hit max attempts
        if ($vendor->otp_attempts >= $vendor->otp_max_attempts) {
            $vendor->update([
                'otp_code' => null,
                'otp_created_at' => null,
                'otp_expires_at' => null,
                'otp_attempts' => 0,
                'otp_last_sent_at' => null,
                'otp_status' => VendorOtpStatusEnum::INCOMPLETE,
            ]);

            return ['status' => false, 'data' => ['message' => 'Too many incorrect attempts', 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // Check OTP. when does not match
        if (! Hash::check($inputOtp, $vendor->otp_code)) {
            $vendor->increment('otp_attempts');

            return ['status' => false, 'data' => ['message' => 'Invalid OTP', 'maxAttempts' => $vendor->otp_max_attempts, 'attempts' => $vendor->otp_attempts, 'expiresAt' => $vendor->otp_expires_at]];
        }

        // OTP valid. clear it
        $vendor->update([
            'otp_code' => null,
            'otp_length' => 0,
            // 'otp_created_at' => null,
            'otp_expires_at' => null,
            'otp_attempts' => 0,
            // 'otp_last_sent_at' => null,
            'otp_max_attempts' => 0,
            'otp_resend_cooldown_seconds' => 0,
            'otp_resend_cooldown_max_attempts_seconds' => 0,
            'otp_status' => VendorOtpStatusEnum::COMPLETE,
            'status' => VendorStatusEnum::PENDING,
        ]);

        // session()->forget('otp_vendor_id'); // maybe flush it later

        return ['status' => true, 'data' => ['message' => 'OTP verified successfully']];
    }

    /**
     * Check if vendor can request a new OTP.
     * vendor can request a new OTP after 60 seconds
     *
     * @param  \App\Models\Vendor  $vendor
     * @return bool
     */
    public function canResendOtp($vendor)
    {
        $now = now();

        $canResend = false;
        $resendCooldown = 0;

        if (! $vendor->otp_last_sent_at) {
            // No OTP ever sent → can resend immediately
            $canResend = true;
        } else {
            $secondsSinceLastSend = $vendor->otp_last_sent_at->diffInSeconds($now);

            if ($vendor->otp_attempts >= $vendor->otp_max_attempts) {
                // Max attempts reached. Use longer cooldown
                $cooldown = $vendor->otp_resend_cooldown_max_attempts_seconds ?? 3600;

                if ($secondsSinceLastSend >= $cooldown) {
                    $canResend = true;
                } else {
                    $resendCooldown = $cooldown - $secondsSinceLastSend;
                }
            } else {
                // Not max attempts. Use normal cooldown
                $cooldown = $vendor->otp_resend_cooldown_seconds ?? 300;

                if ($secondsSinceLastSend >= $cooldown) {
                    $canResend = true;
                } else {
                    $resendCooldown = $cooldown - $secondsSinceLastSend;
                }
            }
        }

        return [
            'canResend' => $canResend,
            'resendCooldown' => $resendCooldown,
        ];
    }
}
