<?php

namespace App\Interface;

interface BaseEnumInterface
{
    public static function values(): array;
    public function label(): string;
}
