<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;

class VendorManageController extends Controller {

    public function approveVendor(Request $request) {
        $vendor = Vendor::find($request->vendorId);
        $vendor->status = 'approved';
        $vendor->save();

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor approved successfully!');
    }

    public function rejectVendor(Request $request) {
        $vendor = Vendor::find($request->vendorId);
        $vendor->status = 'rejected';
        $vendor->save();

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor rejected successfully!');
    }
}
