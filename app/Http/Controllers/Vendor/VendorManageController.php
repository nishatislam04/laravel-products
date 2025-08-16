<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorManageController extends Controller
{
    /**
     * Approve a vendor in super admin panel
     */
    public function approveVendor(Request $request)
    {
        $validatedData = $request->validate([
            'vendorId' => 'required|numeric|exists:vendors,id',
        ]);

        $vendor = Vendor::find($validatedData['vendorId']);
        $user = $vendor->user;
        $roles = Role::where('name', 'vendor_admin')->first();

        $vendor->status = 'approved';
        $vendor->save();

        $user->roles()->sync([
            $roles->id
        ]);

        $user->status = 'active';
        $user->save();

        // !@todo - will send user an email here

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor approved successfully!');
    }

    /**
     * Reject a vendor in super admin panel
     */
    public function rejectVendor(Request $request)
    {
        $validatedData = $request->validate([
            'vendorId' => 'required|numeric|exists:vendors,id',
        ]);

        $vendor = Vendor::find($validatedData['vendorId']);

        $vendor->status = 'rejected';
        $vendor->save();

        // !@todo - will send user an email here

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor rejected successfully!');
    }
}
