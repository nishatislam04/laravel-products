<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorApplyRequest;
use App\Models\Vendor;
use App\Services\VendorApplyServices;
use App\Traits\GeneratesOTP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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

        $otpData = $this->vendorApplyServices->storeVendorApplication($validatedData);

        return redirect()->route('vendor.apply.otp.page')->with(
            'success',
            'Vendor application submitted successfully!',
        )->with([
            'response' => $otpData,
        ]);
    }

    public function storeOtp(Request $request)
    {
        $validatedData = $request->validate([
            'otp_code' => 'required|numeric',
            'vendor_id' => 'required|numeric|exists:vendors,id',
        ]);

        $vendor = Vendor::find($validatedData['vendor_id']);

        $result = $this->validateOtp($vendor, $validatedData['otp_code']);

        if ($result['status'] === false) {
            return back()->withErrors([
                'otp_code' => $result['data']['message'],
                'otp_attempts' => (string) $result['data']['attempts'],
                'otp_maxAttempts' => (string) $result['data']['maxAttempts'],
                'otp_expiresAt' => (string) $result['data']['expiresAt'],
            ]);
        }

        return redirect()->route('home.page')->with('success', 'Vendor otp verified successfully!');
    }
}
