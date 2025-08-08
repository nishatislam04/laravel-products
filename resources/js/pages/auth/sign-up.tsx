"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, Link, useForm } from "@inertiajs/react";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function SignUp() {
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
    post(route("signup"));
  }

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google clicked");
    // Handle Google sign up logic here
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Sign Up - Exclusive" />

      <Header />

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

            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                  <p className="text-gray-600">Enter your details below</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="sr-only">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      className="w-full rounded-none border-0 border-b border-gray-300 bg-transparent px-0 py-3 transition-all duration-500 placeholder:text-gray-500 focus-visible:border-b-4 focus-visible:ring-0"
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

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

                  <Button
                    size="lg"
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-red-500 px-4 py-3 font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Create Account
                  </Button>

                  <Button
                    size="lg"
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignUp}
                    className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign up with Google</span>
                  </Button>

                  <div className="text-center">
                    <p className="text-sm leading-loose text-gray-600">
                      Already have account?{" "}
                      <Link
                        href={route("signin.page")}
                        className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
