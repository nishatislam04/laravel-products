"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

interface AddressBookProps {
  addresses: Address[];
}

export default function AddressBook({ addresses = [] }: AddressBookProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    type: "home",
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
    console.log("Address data:", formData);
    // Handle form submission with Inertia
    setIsAddingAddress(false);
    setEditingAddress(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      type: "home",
      isDefault: false,
    });
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      type: address.type,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
  };

  const handleDelete = (addressId: number) => {
    console.log("Delete address:", addressId);
    // Handle delete with Inertia
  };

  const handleSetDefault = (addressId: number) => {
    console.log("Set default address:", addressId);
    // Handle set default with Inertia
  };

  const AddressForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Address Type</Label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as any }))}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
        >
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDefault"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleInputChange}
          className="rounded border-gray-300 text-red-500 focus:ring-red-500"
        />
        <Label htmlFor="isDefault">Set as default address</Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddingAddress(false);
            setEditingAddress(null);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
          {editingAddress ? "Update Address" : "Add Address"}
        </Button>
      </div>
    </form>
  );

  return (
    <AccountLayout>
      <Head title="Address Book - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">Address Book</h1>
            <p className="text-gray-600">Manage your delivery addresses</p>
          </div>
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 text-white hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <AddressForm />
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No addresses found</h3>
              <p className="mb-4 text-center text-gray-600">
                Add your first address to make checkout faster and easier.
              </p>
              <Button onClick={() => setIsAddingAddress(true)} className="bg-red-500 text-white hover:bg-red-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {addresses.map((address) => (
              <Card key={address.id} className={`relative ${address.isDefault ? "ring-2 ring-red-500" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{address.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {address.isDefault && <Badge className="bg-red-500 text-white hover:bg-red-500">Default</Badge>}
                      <Badge variant="outline" className="capitalize">
                        {address.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{address.phone}</p>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center space-x-2">
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefault(address.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Set as Default
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog
                        open={editingAddress?.id === address.id}
                        onOpenChange={(open) => {
                          if (!open) {
                            setEditingAddress(null);
                            resetForm();
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(address)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Address</DialogTitle>
                          </DialogHeader>
                          <AddressForm />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(address.id)}
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
