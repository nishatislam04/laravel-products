<?php

namespace App\Enums\Vendors;

use App\Interface\BaseEnumInterface;

enum VendorStatusEnum: string implements BaseEnumInterface
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case NEED_OTP = 'need_otp';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::APPROVED => 'Approved',
            self::REJECTED => 'Rejected',
            self::NEED_OTP => 'Need OTP',
        };
    }

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
