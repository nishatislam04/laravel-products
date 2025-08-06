"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Head } from "@inertiajs/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "LCD Monitor",
    image: "/images/placeholder.svg?height=80&width=80&text=LCD+Monitor",
    price: 650,
    quantity: 1,
    slug: "lcd-monitor",
  },
  {
    id: 2,
    name: "H1 Gamepad",
    image: "/images/placeholder.svg?height=80&width=80&text=H1+Gamepad",
    price: 550,
    quantity: 2,
    slug: "h1-gamepad",
  },
];

interface CartTableRowProps {
  item: CartItem;
  onQuantityChange: (itemId: number, newQuantity: number) => void;
}

function CartTableRow({ item, onQuantityChange }: CartTableRowProps) {
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    onQuantityChange(item.id, newQuantity);
  };

  const subtotal = item.price * item.quantity;

  return (
    <tr className="border-b border-gray-100">
      {/* Product */}
      <td className="px-3 py-6 pr-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
            <img src={item.image || "/images/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-6 font-medium text-gray-900">${item.price}</td>

      {/* Quantity */}
      <td className="px-6 py-6">
        <div className="flex w-20 items-center rounded border border-gray-300">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="flex-1 text-center text-sm font-medium">{item.quantity.toString().padStart(2, "0")}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-6 pl-6 font-medium text-gray-900">${subtotal}</td>
    </tr>
  );
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
  };

  const handleReturnToShop = () => {
    console.log("Return to shop");
    // Handle navigation back to shop
  };

  const handleUpdateCart = () => {
    console.log("Update cart");
    // Handle cart update logic
  };

  const handleApplyCoupon = () => {
    console.log("Apply coupon:", couponCode);
    // Handle coupon application logic
  };

  const handleProceedToCheckout = () => {
    console.log("Proceed to checkout");
    // Handle checkout navigation
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Cart - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Cart Table */}
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-3 py-4 pr-6 text-left text-sm font-medium text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantity</th>
                  <th className="py-4 pl-6 text-left text-sm font-medium text-gray-900">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartTableRow key={item.id} item={item} onQuantityChange={handleQuantityChange} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex justify-between">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 px-12 py-2 text-gray-700 hover:bg-gray-50"
              onClick={handleReturnToShop}
            >
              Return To Shop
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 px-12 py-2 text-gray-700 hover:bg-gray-50"
              onClick={handleUpdateCart}
            >
              Update Cart
            </Button>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Coupon Section */}
            <div className="mt-6 flex space-x-4">
              <Input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border-gray-300 py-7 focus:border-red-500 focus:ring-red-500"
              />
              <Button
                size="lg"
                className="bg-red-500 px-6 py-2 text-white hover:bg-red-600"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </Button>
            </div>

            {/* Cart Total */}
            <div className="ml-auto flex w-full justify-end">
              <div className="w-full max-w-md rounded-lg border border-gray-300 p-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Cart Total</h3>

                <div className="space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${subtotal}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">Free</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="font-bold">${total}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="mt-6 w-full bg-red-500 py-3 text-white hover:bg-red-600"
                  onClick={handleProceedToCheckout}
                >
                  Process to checkout
                </Button>
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
