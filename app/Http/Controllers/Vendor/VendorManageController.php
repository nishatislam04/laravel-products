<?php

namespace App\Http\Controllers\Vendor;

use App\Enums\Vendors\VendorStatusEnum;
use App\Events\VendorStatusChanged;
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

        $roles = Role::where('name', 'vendor_admin')->first();

        $this->approveVendorLogic($vendor, $roles);

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

        $this->rejectVendorLogic($vendor);

        return redirect()->route('super-admin.vendors.page')->with('success', 'Vendor rejected successfully!');
    }

    private function approveVendorLogic($vendor, $roles)
    {
        $vendor->status = VendorStatusEnum::APPROVED;
        $vendor->save();

        $vendor->user->roles()->sync([
            $roles->id
        ]);

        $vendor->user->status = 'active';
        $vendor->user->save();

        event(new VendorStatusChanged($vendor, "approved"));
    }

    private function rejectVendorLogic($vendor)
    {
        $vendor->status = VendorStatusEnum::REJECTED;
        $vendor->save();

        event(new VendorStatusChanged($vendor, "rejected"));
    }
}
