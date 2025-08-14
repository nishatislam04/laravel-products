<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorApplyRequest;
use App\Services\VendorApplyServices;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

    public function index()
    {
        $user = Auth::user();

        return Inertia::render('vendor-admin/vendor-apply', [
            'user' => $user,
        ]);
    }

    public function store(StoreVendorApplyRequest $request)
    {
        $validatedData = $request->validated();

        $this->vendorApplyServices->storeVendorApplication($validatedData);

        return redirect()->route('home.page')->with('success', 'Vendor application submitted successfully!');
    }
}
