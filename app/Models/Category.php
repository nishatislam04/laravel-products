<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    /** @use HasFactory<\Database\Factories\CategoryFactory> */

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'image',
        'description',
        'meta_title',
        'meta_description',
        'icon',
        'sort_order',
        'status',
    ];

    public function products() {
        return $this->hasMany(Product::class);
    }

    /**
     * parent() lets you fetch the immediate parent category (useful for breadcrumbs or hierarchy checks).
     */
    public function parent() {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * children() lets you fetch all categories that have this category as their parent_id — which is exactly what the recursive getIndentedCategories() function was calling.
     */
    public function children() {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
