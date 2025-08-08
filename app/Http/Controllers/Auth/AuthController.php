<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller {

    public function showSigninForm() {
        return Inertia::render('auth/sign-in');
    }

    /**
     * Sign in to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function signin(Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, true)) {
            return redirect()->route('home.page');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function showSignupForm() {
        return Inertia::render('auth/sign-up');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function signup(Request $request) {
        $credentials = $request->only('name', 'email', 'password');

        $user = $this->createUserForSignup($credentials);

        $user->roles()->attach(Role::where('name', 'user')->first());

        Auth::login($user, true);

        return redirect()->route('home.page');
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $credentials
     * @return \App\Models\User
     */
    public function createUserForSignup($credentials) {
        return User::create([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
        ]);
    }

    public function signout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('home.page');
    }
}
