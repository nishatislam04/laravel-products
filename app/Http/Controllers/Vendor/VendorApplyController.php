<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorApplyRequest;
use App\Services\VendorApplyServices;

/**
 * This controller is all about vendor apply management
 */
class VendorApplyController extends Controller
{
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

        return redirect()->route('home.page')->with('success', 'Vendor application submitted successfully!');
    }
}
