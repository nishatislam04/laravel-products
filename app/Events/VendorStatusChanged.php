<?php

namespace App\Events;

use App\Enums\Vendors\VendorStatusEnum;
use App\Models\Vendor;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VendorStatusChanged {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Vendor $vendor;
    public string $status;

    /**
     * Create a new event instance.
     */
    public function __construct(Vendor $vendor, string $status) {
        $this->vendor = $vendor;
        $this->status = $status;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array {
        return [new PrivateChannel("channel-name")];
    }
}
