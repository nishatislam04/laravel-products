<?php

namespace App\Models;

use App\Enums\Vendors\VendorOtpStatusEnum;
use App\Enums\Vendors\VendorStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_name',
        'slug',
        'logo',
        'banner',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'location',
        'business_name',
        'business_type',
        'tax_id',
        'national_id',
        'trade_license',
        'license_expiry',
        'is_active',
        'status',
        'admin_note',
        'commission_rate',
        'total_products',
        'total_orders',
        'rating',
        'otp_code',
        'otp_max_attempts',
        'otp_created_at',
        'otp_expires_at',
        'otp_attempts',
        'otp_last_sent_at',
        'otp_status',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'status' => VendorStatusEnum::class,
        'otp_status' => VendorOtpStatusEnum::class,
        'otp_created_at' => 'datetime',
        'otp_expires_at' => 'datetime',
        'otp_last_sent_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
