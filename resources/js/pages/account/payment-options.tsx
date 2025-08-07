"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { CreditCard, Edit, Plus, Smartphone, Trash2 } from "lucide-react";
import { useState } from "react";

interface PaymentMethod {
  id: number;
  type: "card" | "mobile" | "bank";
  name: string;
  details: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  provider: string;
}

interface PaymentOptionsProps {
  paymentMethods: PaymentMethod[];
}

export default function PaymentOptions({ paymentMethods = [] }: PaymentOptionsProps) {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  const [paymentType, setPaymentType] = useState<"card" | "mobile" | "bank">("card");
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    mobileNumber: "",
    provider: "",
    accountNumber: "",
    bankName: "",
    isDefault: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment method data:", { ...formData, type: paymentType });
    // Handle form submission with Inertia
    setIsAddingPayment(false);
    setEditingPayment(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      mobileNumber: "",
      provider: "",
      accountNumber: "",
      bankName: "",
      isDefault: false,
    });
    setPaymentType("card");
  };

  const handleDelete = (paymentId: number) => {
    console.log("Delete payment method:", paymentId);
    // Handle delete with Inertia
  };

  const handleSetDefault = (paymentId: number) => {
    console.log("Set default payment method:", paymentId);
    // Handle set default with Inertia
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const PaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Payment Type</Label>
        <div className="flex space-x-4">
          {[
            { value: "card", label: "Credit/Debit Card" },
            { value: "mobile", label: "Mobile Banking" },
            { value: "bank", label: "Bank Account" },
          ].map((type) => (
            <label key={type.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentType"
                value={type.value}
                checked={paymentType === type.value}
                onChange={(e) => setPaymentType(e.target.value as any)}
                className="text-red-500 focus:ring-red-500"
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentType === "card" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" required />
            </div>
          </div>
        </>
      )}

      {paymentType === "mobile" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <select
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={(e) => setFormData((prev) => ({ ...prev, provider: e.target.value }))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Provider</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="upay">Upay</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>
        </>
      )}

      {paymentType === "bank" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Account Holder Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
        </>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleInputChange}
          className="rounded border-gray-300 text-red-500 focus:ring-red-500"
        />
        <Label htmlFor="isDefault">Set as default payment method</Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddingPayment(false);
            setEditingPayment(null);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
          {editingPayment ? "Update Payment Method" : "Add Payment Method"}
        </Button>
      </div>
    </form>
  );

  return (
    <AccountLayout>
      <Head title="Payment Options - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">My Payment Options</h1>
            <p className="text-gray-600">Manage your payment methods for faster checkout</p>
          </div>
          <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 text-white hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <PaymentForm />
            </DialogContent>
          </Dialog>
        </div>

        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CreditCard className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No payment methods found</h3>
              <p className="mb-4 text-center text-gray-600">
                Add a payment method to make checkout faster and more convenient.
              </p>
              <Button onClick={() => setIsAddingPayment(true)} className="bg-red-500 text-white hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`relative ${method.isDefault ? "ring-2 ring-red-500" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getPaymentIcon(method.type)}
                      <CardTitle className="text-lg">{method.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && <Badge className="bg-red-500 text-white hover:bg-red-500">Default</Badge>}
                      <Badge variant="outline" className="capitalize">
                        {method.provider}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-gray-600">{method.details}</p>
                    {method.lastFour && <p className="text-gray-600">**** **** **** {method.lastFour}</p>}
                    {method.expiryDate && <p className="text-gray-600">Expires: {method.expiryDate}</p>}
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Set as Default
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(method.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
