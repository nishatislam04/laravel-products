<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\Vendor;

class VendorManageController extends Controller {

    public function approveVendor(Request $request) {
        $vendor = Vendor::find($request->vendorId);
        $user = $vendor->user;
        $roles = Role::where('name', 'vendor_admin')->first();

        $vendor->status = 'approved';
        $vendor->save();

        $user->roles()->sync([
            $roles->id
        ]);

        $user->status = 'active';
        $user->save();

        // will send user an email here

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor approved successfully!');
    }

    public function rejectVendor(Request $request) {
        $vendor = Vendor::find($request->vendorId);
        $vendor->status = 'rejected';
        $vendor->save();

        // will send user an email here

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor rejected successfully!');
    }
}
