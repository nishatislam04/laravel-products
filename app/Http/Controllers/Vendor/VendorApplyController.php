<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorApplyRequest;
use App\Models\Vendor;
use App\Services\VendorApplyServices;
use App\Traits\GeneratesOTP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * This controller is all about vendor apply management
 */
class VendorApplyController extends Controller
{
    use GeneratesOTP;

    protected VendorApplyServices $vendorApplyServices;

    public function __construct(VendorApplyServices $vendorApplyServices)
    {
        $this->vendorApplyServices = $vendorApplyServices;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVendorApplyRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreVendorApplyRequest $request)
    {
        $validatedData = $request->validated();

        $this->vendorApplyServices->storeVendorApplication($validatedData);

        return redirect()->route('vendor.apply.otp.page')->with(
            'success',
            'Vendor application submitted successfully!',
        );
    }

    public function storeOtp(Request $request)
    {
        $validatedData = $request->validate([
            'otp_code' => 'required',
            'vendor_id' => 'required',
        ]);

        $vendor = Vendor::find($validatedData['vendor_id']);

        $this->validateOtp($vendor, $validatedData['otp_code']);

        return redirect()->route('home.page')->with('success', 'Vendor otp verified successfully!');
    }
}
