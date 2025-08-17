<?php

namespace App\Jobs;

use App\Enums\Vendors\VendorStatusEnum;
use App\Mail\VendorStatusMail;
use App\Models\Vendor;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendVendorStatusEmailJob implements ShouldQueue {
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $vendorId, public string $status) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void {
        $vendor = Vendor::with("user")->findOrFail($this->vendorId);

        lg("Vendor status changed -- job", [
            "vendor" => $vendor,
            "status" => $this->status
        ]);

        Mail::to($vendor->user->email)->send(new VendorStatusMail($vendor, $this->status));
    }
}
