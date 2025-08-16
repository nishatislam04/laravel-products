<?php

namespace App\Jobs;

use App\Mail\VendorOtpMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Log;
use Mail;

class SendOtpEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public $user,
        public $otp,
        public $expiresAt
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->user->email)->send(new VendorOtpMail($this->user, $this->otp['otp_code'], $this->otp['otp_expires_at']->diffForHumans()));
    }
}
