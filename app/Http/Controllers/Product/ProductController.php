<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller {
    public function store(Request $request) {
        $vendor = Auth::user()->vendor;

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'price' => 'required|numeric|min:1',
            'sale_price' => 'nullable|numeric|min:0',
            'sale_start' => 'nullable|date|before:sale_end',
            'sale_end' => 'nullable|date|after:sale_start',
            'sku' => 'required|string|max:255|unique:products,sku',
            'stock' => 'required|numeric|min:1',
            'stock_status' => 'required|in:in_stock,out_of_stock,pre_order',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'images' => 'nullable|array|max:5',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'weight' => 'nullable|numeric|min:1',
            'length' => 'nullable|numeric|min:1',
            'width' => 'nullable|numeric|min:1',
            'height' => 'nullable|numeric|min:1',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:255',
            'warranty_type' => 'required|in:manufacturer,seller',
            'return_days' => 'required|numeric|min:1',
            'warranty_period' => 'required|numeric|min:1',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Store in 'products/thumbnails' folder inside 'public' disk
            $thumbnailPath = $request->file('thumbnail')->store('products/thumbnails', 'public');
            // $thumbnailPath is something like 'products/thumbnails/filename.jpg'
            $validatedData['thumbnail'] = $thumbnailPath;
        }

        // Handle multiple images upload
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            $imagePaths = [];

            foreach ($images as $image) {
                // Store each image in 'products/images' folder inside 'public' disk
                $path = $image->store('products/images', 'public');
                $imagePaths[] = $path;
            }

            // Store JSON array of image paths
            $validatedData['images'] = json_encode($imagePaths);
        }

        $validatedData['vendor_id'] = $vendor->id;

        Product::create($validatedData);

        return redirect()->route('vendor-admin.products.page')->with('success', 'Product created successfully');
    }
}
