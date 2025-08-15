<?php

namespace App\Enums\Vendors;

use App\Interface\BaseEnumInterface;

enum VendorOtpStatusEnum: string implements BaseEnumInterface
{
    case COMPLETE = 'complete';
    case INCOMPLETE = 'incomplete';

    public function label(): string
    {
        return match ($this) {
            self::COMPLETE => 'Complete',
            self::INCOMPLETE => 'Incomplete',
        };
    }

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
