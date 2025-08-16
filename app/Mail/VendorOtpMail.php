<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VendorOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        protected User $user,
        protected $otp,
        protected $otp_expires_at
    ) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: 'onboarding@resend.dev',
            subject: 'Vendor Otp',
        );
    }

    /**
     * Get the message content definition.
     * we will send only user name and otp
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.vendor-otp',
            with: [
                'userName' => $this->user->name,
                'email' => $this->user->email,
                'otp' => $this->otp,
                'otp_expires_at' => $this->otp_expires_at,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
