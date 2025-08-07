"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { Camera } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  avatar?: string;
}

interface ProfileProps {
  userReceive: User;
}

const defaultUser = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  gender: "",
  avatar: "",
};

export default function Profile({ userReceive }: ProfileProps) {
  const user = userReceive || defaultUser;
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile update:", formData);
    // Handle form submission with Inertia
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      dateOfBirth: user.dateOfBirth || "",
      gender: user.gender || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <AccountLayout>
      <Head title="My Profile - Account" />

      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-red-500">Edit Your Profile</h1>
          <p className="text-gray-600">Manage your personal information and account settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/images/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="bg-red-500 text-2xl font-bold text-white">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Profile Picture</h3>
              <p className="text-sm text-gray-600">Upload a new profile picture</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                className="w-full rounded-md border-0 bg-gray-100 px-3 py-2 focus:bg-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
              rows={3}
            />
          </div>

          {/* Password Changes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Password Changes</h3>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                placeholder="Current Password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                placeholder="New Password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500"
                placeholder="Confirm New Password"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel} className="px-8">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 px-8 text-white hover:bg-red-600">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
