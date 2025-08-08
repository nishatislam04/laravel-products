"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function SignIn() {
  const {
    data,
    setData,
    post,
    processing,
    errors,
    isDirty,
    setDefaults,
    reset,
    setError,
    clearErrors,
    progress,
    transform,
  } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("signin"));
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Handle forgot password logic here
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Sign In - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Illustration */}
            <div className="hidden lg:block">
              <div className="flex h-full min-h-[500px] items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-200 p-8 lg:p-12">
                <img
                  src="/images/placeholder.svg?height=400&width=400&text=Shopping+Cart+Phone+Bags"
                  alt="Shopping illustration with cart, phone and bags"
                  className="h-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Sign In to Exclusive</h1>
                  <p className="text-gray-600">Enter your details below</p>
                </div>

                {/* Sign In Form */}
                <form onSubmit={submit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="sr-only">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      className="w-full rounded-none border-0 border-b border-gray-300 bg-transparent px-0 py-3 transition-all duration-500 placeholder:text-gray-500 focus-visible:border-b-4 focus-visible:ring-0"
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="sr-only">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      className="w-full rounded-none border-0 border-b border-gray-300 bg-transparent px-0 py-3 transition-all duration-500 placeholder:text-gray-500 focus-visible:border-b-4 focus-visible:ring-0"
                      required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>

                  {/* Sign In Button and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      type="submit"
                      disabled={processing}
                      className="rounded-md bg-red-500 px-10 py-6 font-medium text-white transition-colors hover:bg-red-600"
                    >
                      Sign In
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleForgotPassword}
                      className="h-auto p-0 font-medium text-red-500 hover:bg-transparent hover:text-red-600"
                    >
                      Forget Password?
                    </Button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <div className="pt-4 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href={route("signup.page")}
                      className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
