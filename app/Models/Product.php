<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\StockOrderStatus;

class Product extends Model {
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'name',
        'slug',
        'description',
        'thumbnail',
        'images',
        'category_id',
        'brand_id',
        'sale_price',
        'sale_start',
        'sale_end',
        'stock_quantity',
        'stock_status',
        'weight',
        'length',
        'width',
        'height',
        'sku',
        'price',
        'stock',
        'return_days',
        'warranty_type',
        'warranty_period',
        'meta_title',
        'meta_description',
        'tags',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function brand() {
        return $this->belongsTo(Brand::class);
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }
}
