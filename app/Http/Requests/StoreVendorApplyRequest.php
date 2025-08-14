<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreVendorApplyRequest extends FormRequest
{
    /**
     * We will think about this later. who can make this request? and who; cant
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->store_name),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => auth()->check() ? 'nullable|string|max:255' : 'required|string|max:255',
            'email' => auth()->check() ? 'nullable|email' : 'required|email|unique:vendors,email|unique:users,email',
            'password' => auth()->check() ? 'nullable|string|min:8' : 'required|string|min:8',
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
        ];
    }
}
