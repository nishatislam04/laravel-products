# Enum

i will show you how to setup enum in this codebase

## Steps

1. create enum file in app/Enums directory

```bash
php artisan make:enum Enums/[resource - name]/ExampleNameEnum
```

2. define the enum class

```php
enum ExampleNameEnum: string implements BaseEnumInterface
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';

    // helper function
    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::APPROVED => 'Approved',
            self::REJECTED => 'Rejected',
        };
    }

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
```

3. update the model with casting

```php
protected $casts = [
    'status' => ExampleNameEnum::class,
];
```

### usage

1. in migration

```php
$table->enum('status', ExampleNameEnum::values()->default(ExampleNameEnum::PENDING));
```

2. in controller

```php
$vendor->status = ExampleNameEnum::APPROVED;

if ($vendor->status === ExampleNameEnum::PENDING) {
    // do something
}

echo $vendor->status->label(); // "Pending"

```

3. in validation

```php
$validator = Validator::make($data, [
    'status' => ['required', Rule::in(ExampleNameEnum::values())],
]);
```
