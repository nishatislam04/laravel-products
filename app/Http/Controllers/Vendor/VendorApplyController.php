<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Vendor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class VendorApplyController extends Controller {

    public function index() {
        $user = Auth::user();
        return Inertia::render('vendor-admin/vendor-apply', [
            'user' => $user,
        ]);
    }

    public function store(Request $request) {
        $existingUser = Auth::user();

        if ($existingUser) {
            $validatedData = $this->whenUserExists($request);
        } else {
            $validatedData = $this->whenUserDoesNotExist($request);
        }

        // Create new user
        $user = $existingUser;
        if (!$user) {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'] ? Hash::make($validatedData['password']) :
                    Hash::make('12345678'),
            ]);
        }

        if (!$existingUser) Auth::login($user, true);

        Vendor::create([
            'user_id' => $user->id,
            'store_name' => $validatedData['store_name'],
            'slug' => $validatedData['slug'],
            'logo' => $validatedData['logo'] ?? null,
            'banner' => $validatedData['banner'] ?? null,
            'email' => $user->email,
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'country' => $validatedData['country'],
            'postal_code' => $validatedData['postal_code'],
            'business_name' => $validatedData['business_name'],
            'business_type' => $validatedData['business_type'],
            'tax_id' => $validatedData['tax_id'],
            'national_id' => $validatedData['national_id'],
            'trade_license' => $validatedData['trade_license'],
            'license_expiry' => $validatedData['license_expiry'],
        ]);

        return redirect()->route('home.page')->with('success', 'Vendor application submitted successfully!');
    }

    public function whenUserExists($request) {
        return $request->validate([
            'store_name' => 'required|string|max:255|unique:vendors,store_name',
            'slug' => 'required|string|max:255|unique:vendors,slug',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'phone' => 'nullable|numeric|unique:vendors,phone',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'business_name' => 'nullable|string|max:255|unique:vendors,business_name',
            'business_type' => 'nullable|in:Sole Proprietorship,Partnership,Limited Liability Company (LLC),Corporation,Cooperative,Non-Profit Organization',
            'tax_id' => 'nullable|numeric|unique:vendors,tax_id',
            'national_id' => 'nullable|numeric|unique:vendors,national_id',
            'trade_license' => 'nullable|numeric|unique:vendors,trade_license',
            'license_expiry' => 'nullable|date',
        ]);
    }

    public function whenUserDoesNotExist($request) {
        return $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:vendors,email|unique:users,email',
            'password' => 'required|string|min:8',
            'store_name' => 'required|string|max:255|unique:vendors,store_name',
            'slug' => 'required|string|max:255|unique:vendors,slug',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'phone' => 'nullable|numeric|unique:vendors,phone',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'business_name' => 'nullable|string|max:255|unique:vendors,business_name',
            'business_type' => 'nullable|in:Sole Proprietorship,Partnership,Limited Liability Company (LLC),Corporation,Cooperative,Non-Profit Organization',
            'tax_id' => 'nullable|numeric|unique:vendors,tax_id',
            'national_id' => 'nullable|numeric|unique:vendors,national_id',
            'trade_license' => 'nullable|numeric|unique:vendors,trade_license',
            'license_expiry' => 'nullable|date',
        ]);
    }
}
