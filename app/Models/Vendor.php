<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model {
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
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
