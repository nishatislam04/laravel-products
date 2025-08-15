<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @property-read bool|null $products_exists
 * @method static \Database\Factories\BrandFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Brand whereUpdatedAt($value)
 */
	class Brand extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int|null $parent_id
 * @property string|null $image
 * @property string|null $icon
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Category> $children
 * @property-read int|null $children_count
 * @property-read bool|null $children_exists
 * @property-read Category|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @property-read bool|null $products_exists
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $vendor_id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string $price
 * @property string|null $sale_price
 * @property string|null $sale_start
 * @property string|null $sale_end
 * @property string|null $sku
 * @property int $stock
 * @property string $stock_status
 * @property string|null $thumbnail
 * @property \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductImage> $images
 * @property string|null $weight
 * @property string|null $length
 * @property string|null $width
 * @property string|null $height
 * @property int $category_id
 * @property int|null $brand_id
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $tags
 * @property int $is_active
 * @property string $approval_status
 * @property int|null $return_days
 * @property string|null $warranty_type
 * @property int|null $warranty_period
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Brand|null $brand
 * @property-read \App\Models\Category $category
 * @property-read int|null $images_count
 * @property-read bool|null $images_exists
 * @method static \Database\Factories\ProductFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereApprovalStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereBrandId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereReturnDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSaleEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSalePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSaleStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereStockStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereVendorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWarrantyPeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWarrantyType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWidth($value)
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $product_id
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Product $product
 * @method static \Database\Factories\ProductImageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereUrl($value)
 */
	class ProductImage extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $label
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @property-read bool|null $users_exists
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $status
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read bool|null $notifications_exists
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read bool|null $roles_exists
 * @property-read \App\Models\Vendor|null $vendor
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $user_id
 * @property string $store_name
 * @property string|null $description
 * @property string $slug
 * @property string|null $logo
 * @property string|null $banner
 * @property string $email
 * @property string $phone
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $postal_code
 * @property string|null $location
 * @property string|null $business_name
 * @property string|null $business_type
 * @property string|null $tax_id
 * @property string|null $national_id
 * @property string|null $trade_license
 * @property string|null $license_expiry
 * @property bool $is_active
 * @property \App\Enums\Vendors\VendorStatusEnum $status
 * @property string|null $admin_note
 * @property string $commission_rate
 * @property int $total_products
 * @property int $total_orders
 * @property float $rating
 * @property string|null $otp_code
 * @property string|null $otp_created_at
 * @property string|null $otp_expires_at
 * @property int $otp_attempts
 * @property string|null $otp_last_sent_at
 * @property mixed $otp_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\VendorFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereAdminNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereBusinessName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereBusinessType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereLicenseExpiry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereNationalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpLastSentAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereOtpStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereStoreName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereTaxId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereTotalOrders($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereTotalProducts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereTradeLicense($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Vendor whereUserId($value)
 */
	class Vendor extends \Eloquent {}
}

