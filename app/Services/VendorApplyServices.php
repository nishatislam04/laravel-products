<?php

namespace App\Services;

use App\Mail\VendorOtpMail;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class VendorApplyServices
{
  /**
   * Store a new vendor application.
   *
   * @param array $data Validated request data
   * @return \App\Models\Vendor
   */
  public function storeVendorApplication(array $data): Vendor
  {
    $existingUser = Auth::user();

    $user = $existingUser;
    if (!$user) {
      $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => !empty($data['password'])
          ? Hash::make($data['password'])
          : Hash::make('12345678'),
      ]);

      Auth::login($user, true);
    }

    $vendor = Vendor::create([
      ...$data,
      'user_id' => $user->id,
    ]);

    $otp = rand(1000, 9999);
    // $user->update(['otp' => $otp]);

    Mail::to($user->email)->send(new VendorOtpMail($user, $otp));

    return $vendor;
  }
}
