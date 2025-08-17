<?php

namespace App\Mail;

use App\Enums\Vendors\VendorStatusEnum;
use App\Models\Vendor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class VendorStatusMail extends Mailable {
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected Vendor $vendor, protected string $status) {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope {
        return new Envelope(from: "onboarding@resend.dev", subject: "Your Vendor Status");
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content {
        lg("Vendor status changed -- mail", [
            "vendor" => $this->vendor,
            "status" => $this->status
        ]);

        return new Content(
            view: "mails.vendor-status",
            with: [
                "user_name" => $this->vendor->user->name,
                "vendor_name" => $this->vendor->store_name,
                "vendor_status" => $this->status
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array {
        return [];
    }
}
