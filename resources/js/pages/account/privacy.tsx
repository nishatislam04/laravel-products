"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { AlertTriangle, Clock, Download, Eye, Globe, Monitor, Shield, Smartphone, Trash2 } from "lucide-react";
import { useState } from "react";

interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ConnectedApp {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  connectedDate: string;
  lastUsed: string;
}

interface PrivacyProps {
  privacySettings: {
    profileVisibility: "public" | "private" | "friends";
    showOnlineStatus: boolean;
    allowDataCollection: boolean;
    personalizedAds: boolean;
    thirdPartySharing: boolean;
    marketingCommunications: boolean;
    dataRetention: string;
  };
  loginSessions: LoginSession[];
  connectedApps: ConnectedApp[];
}

const defaultPrivacySettings: PrivacyProps["privacySettings"] = {
  profileVisibility: "public",
  showOnlineStatus: true,
  allowDataCollection: true,
  personalizedAds: true,
  thirdPartySharing: true,
  marketingCommunications: true,
  dataRetention: "1 year",
};

export default function Privacy({ privacySettings, loginSessions = [], connectedApps = [] }: PrivacyProps) {
  const [settings, setSettings] = useState(privacySettings || defaultPrivacySettings);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const mockLoginSessions: LoginSession[] = [
    {
      id: "1",
      device: "iPhone 14 Pro",
      browser: "Safari 17.0",
      location: "Dhaka, Bangladesh",
      ipAddress: "103.***.***.***",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Windows PC",
      browser: "Chrome 120.0",
      location: "Dhaka, Bangladesh",
      ipAddress: "103.***.***.***",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Android Phone",
      browser: "Chrome Mobile 120.0",
      location: "Chittagong, Bangladesh",
      ipAddress: "45.***.***.***",
      lastActive: "1 day ago",
      isCurrent: false,
    },
  ];

  const mockConnectedApps: ConnectedApp[] = [
    {
      id: "1",
      name: "Google Account",
      description: "Sign in with Google and sync your preferences",
      permissions: ["Basic profile info", "Email address"],
      connectedDate: "2024-01-15",
      lastUsed: "2024-01-20",
    },
    {
      id: "2",
      name: "Facebook",
      description: "Share products and connect with friends",
      permissions: ["Basic profile info", "Friend list", "Post to timeline"],
      connectedDate: "2024-01-10",
      lastUsed: "2024-01-18",
    },
  ];

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    console.log("Save privacy settings:", settings);
    // Handle save with Inertia
  };

  const handleTerminateSession = (sessionId: string) => {
    console.log("Terminate session:", sessionId);
    // Handle session termination
  };

  const handleRevokeApp = (appId: string) => {
    console.log("Revoke app access:", appId);
    // Handle app revocation
  };

  const handleDownloadData = () => {
    console.log("Download user data");
    // Handle data download
  };

  const handleDeleteAccount = () => {
    console.log("Delete account request:", deleteReason);
    // Handle account deletion
    setIsDeleteDialogOpen(false);
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes("iphone") || device.toLowerCase().includes("android")) {
      return <Smartphone className="h-5 w-5" />;
    }
    return <Monitor className="h-5 w-5" />;
  };

  return (
    <AccountLayout>
      <Head title="Privacy & Security - Account" />

      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-red-500">Privacy & Security</h1>
          <p className="text-gray-600">Manage your privacy settings and account security</p>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select
                    id="profileVisibility"
                    value={settings.profileVisibility}
                    onChange={(e) => handleSelectChange("profileVisibility", e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                  >
                    <option value="public">Public - Anyone can see your profile</option>
                    <option value="private">Private - Only you can see your profile</option>
                    <option value="friends">Friends - Only your connections can see</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showOnlineStatus">Show Online Status</Label>
                    <p className="text-sm text-gray-600">Let others see when you're online</p>
                  </div>
                  <Switch
                    id="showOnlineStatus"
                    checked={settings.showOnlineStatus}
                    onCheckedChange={(checked) => handleSwitchChange("showOnlineStatus", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowDataCollection">Data Collection</Label>
                    <p className="text-sm text-gray-600">Allow us to collect data to improve your experience</p>
                  </div>
                  <Switch
                    id="allowDataCollection"
                    checked={settings.allowDataCollection}
                    onCheckedChange={(checked) => handleSwitchChange("allowDataCollection", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="personalizedAds">Personalized Advertisements</Label>
                    <p className="text-sm text-gray-600">Show ads based on your interests and activity</p>
                  </div>
                  <Switch
                    id="personalizedAds"
                    checked={settings.personalizedAds}
                    onCheckedChange={(checked) => handleSwitchChange("personalizedAds", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="thirdPartySharing">Third-party Data Sharing</Label>
                    <p className="text-sm text-gray-600">Share data with trusted partners for better services</p>
                  </div>
                  <Switch
                    id="thirdPartySharing"
                    checked={settings.thirdPartySharing}
                    onCheckedChange={(checked) => handleSwitchChange("thirdPartySharing", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention Period</Label>
                  <select
                    id="dataRetention"
                    value={settings.dataRetention}
                    onChange={(e) => handleSelectChange("dataRetention", e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500"
                  >
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                    <option value="5years">5 Years</option>
                    <option value="indefinite">Indefinite</option>
                  </select>
                  <p className="text-sm text-gray-600">How long we keep your data after account deletion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Active Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLoginSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center space-x-4">
                      {getDeviceIcon(session.device)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{session.device}</h4>
                          {session.isCurrent && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{session.browser}</p>
                        <p className="text-sm text-gray-600">
                          <Globe className="mr-1 inline h-3 w-3" />
                          {session.location} • {session.ipAddress}
                        </p>
                        <p className="text-sm text-gray-500">
                          <Clock className="mr-1 inline h-3 w-3" />
                          {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connected Apps */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConnectedApps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{app.name}</h4>
                      <p className="mb-2 text-sm text-gray-600">{app.description}</p>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {app.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Connected: {app.connectedDate} • Last used: {app.lastUsed}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeApp(app.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Revoke Access
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div>
                  <h4 className="font-medium text-gray-900">Download Your Data</h4>
                  <p className="text-sm text-gray-600">Get a copy of all your data in a downloadable format</p>
                </div>
                <Button variant="outline" onClick={handleDownloadData} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
                <div>
                  <h4 className="flex items-center space-x-2 font-medium text-red-900">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Delete Account</span>
                  </h4>
                  <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
                </div>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center space-x-2">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Account</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <h4 className="mb-2 font-medium text-red-900">Warning: This action cannot be undone</h4>
                        <ul className="space-y-1 text-sm text-red-700">
                          <li>• All your personal data will be permanently deleted</li>
                          <li>• Your order history will be removed</li>
                          <li>• You will lose access to your wishlist and saved items</li>
                          <li>• Any pending orders will be cancelled</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deleteReason">Please tell us why you're leaving (optional)</Label>
                        <Textarea
                          id="deleteReason"
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                          placeholder="Your feedback helps us improve..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete My Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="bg-red-500 text-white hover:bg-red-600">
              Save Privacy Settings
            </Button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
