"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Head } from "@inertiajs/react";
import { useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const orderItems: OrderItem[] = [
  {
    id: 1,
    name: "LCD Monitor",
    image: "/images/placeholder.svg?height=60&width=60&text=LCD+Monitor",
    price: 650,
    quantity: 1,
  },
  {
    id: 2,
    name: "H1 Gamepad",
    image: "/images/placeholder.svg?height=60&width=60&text=H1+Gamepad",
    price: 1100,
    quantity: 1,
  },
];

export default function Billing() {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couponCode, setCouponCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyCoupon = () => {
    console.log("Apply coupon:", couponCode);
    // Handle coupon application logic
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Place order:", { formData, paymentMethod, saveInfo });
    // Handle order placement logic
  };

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Billing Details - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Billing Details Form */}
            <div>
              <h1 className="mb-8 text-3xl font-bold text-gray-900">Billing Details</h1>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm text-gray-600">
                    First Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm text-gray-600">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <Label htmlFor="streetAddress" className="text-sm text-gray-600">
                    Street Address<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Apartment */}
                <div className="space-y-2">
                  <Label htmlFor="apartment" className="text-sm text-gray-600">
                    Apartment, floor, etc. (optional)
                  </Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    type="text"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Town/City */}
                <div className="space-y-2">
                  <Label htmlFor="townCity" className="text-sm text-gray-600">
                    Town/City<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="townCity"
                    name="townCity"
                    type="text"
                    value={formData.townCity}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm text-gray-600">
                    Phone Number<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="emailAddress" className="text-sm text-gray-600">
                    Email Address<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full rounded-sm border-0 bg-gray-100 py-6 focus:bg-white focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Save Information Checkbox */}
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="saveInfo"
                    checked={saveInfo}
                    onCheckedChange={(checked) => setSaveInfo(checked)}
                    className="data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
                  />
                  <Label htmlFor="saveInfo" className="text-sm text-gray-700">
                    Save this information for faster check-out next time
                  </Label>
                </div>
              </form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="mt-22 lg:pl-8">
              {/* Order Items */}
              <div className="mb-6 space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between border-b border-gray-400 py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold">${total}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center space-x-2">
                      <span>Bank</span>
                      <div className="ml-2 flex items-center space-x-1">
                        <img src="/images/placeholder.svg?height=20&width=30&text=Visa" alt="Visa" className="h-5" />
                        <img
                          src="/images/placeholder.svg?height=20&width=30&text=MC"
                          alt="Mastercard"
                          className="h-5"
                        />
                        <img
                          src="/images/placeholder.svg?height=20&width=30&text=PayPal"
                          alt="PayPal"
                          className="h-5"
                        />
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Coupon Code */}
              <div className="mb-6 flex space-x-3">
                <Input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border-gray-300 py-7 focus:border-red-500 focus:ring-red-500"
                />
                <Button
                  size="lg"
                  type="button"
                  className="bg-red-500 px-6 text-white hover:bg-red-600"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </Button>
              </div>

              {/* Place Order Button */}
              <Button
                size="lg"
                type="submit"
                className="mt-4 w-full bg-red-500 py-6 text-lg font-medium text-white hover:bg-red-600"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
