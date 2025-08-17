<?php

namespace App\Listeners;

use App\Events\VendorStatusChanged;
use App\Jobs\SendVendorStatusEmailJob;
use App\Mail\VendorStatusMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendVendorStatusEmail implements ShouldQueue {
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(VendorStatusChanged $event): void {
        $vendor = $event->vendor;
        $status = $event->status;

        lg("Vendor status changed -- listener", [
            "vendor" => $vendor,
            "status" => $status
        ]);

        SendVendorStatusEmailJob::dispatch($vendor->id, $status);
    }
}
