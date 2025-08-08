<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'price' => 'required|numeric',
            'sale_price' => 'nullable|numeric',
            'sale_start' => 'nullable|date',
            'sale_end' => 'nullable|date',
            'sku' => 'required|string|max:255|unique:products,sku',
            'stock' => 'required|numeric',
            'stock_status' => 'required|in:in_stock,out_of_stock,pre_order',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // do we need this?
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'height' => 'nullable|numeric',

            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'tags' => 'nullable|string',
            // 'approval_status' => 'required|in:pending,approved,rejected',
            'warranty_type' => 'required|string',
            'return_days' => 'required|numeric',
            'warranty_period' => 'required|numeric',
        ]);
    }
}
