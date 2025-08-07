import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import VendorLayout from "@/layouts/vendor-layout";
import { Bell, CreditCard, Globe, Package, Save, Shield, Store, Truck, Upload } from "lucide-react";
import { useState } from "react";

export default function VendorSettings() {
  const [settings, setSettings] = useState({
    // Store Information
    storeName: "TechGear Solutions",
    storeDescription: "Premium electronics and tech accessories for modern lifestyle",
    storeEmail: "contact@techgear.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Tech Street, Silicon Valley, CA 94000",
    storeWebsite: "https://techgear.com",

    // Business Information
    businessName: "TechGear Solutions LLC",
    taxId: "12-3456789",
    businessType: "LLC",

    // Notifications
    orderNotifications: true,
    lowStockAlerts: true,
    reviewNotifications: true,
    promotionalEmails: false,

    // Shipping
    freeShippingThreshold: "50",
    processingTime: "1-2",
    shippingFrom: "California, USA",

    // Payment
    paymentMethod: "bank_transfer",
    bankAccount: "**** **** **** 1234",

    // Store Policies
    returnPolicy: "30-day return policy",
    shippingPolicy: "Free shipping on orders over $50",
    privacyPolicy: "We protect your privacy",

    // SEO
    metaTitle: "TechGear Solutions - Premium Electronics",
    metaDescription: "Shop premium electronics and tech accessories",
    storeKeywords: "electronics, tech, gadgets, accessories",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving vendor settings:", settings);
    // Here you would typically send the settings to your backend
  };

  return (
    <VendorLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
            <p className="text-muted-foreground">Manage your store information and preferences</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
            <CardDescription>Basic information about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/images/placeholder.svg?height=80&width=80" />
                <AvatarFallback>TG</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
                <p className="mt-1 text-sm text-muted-foreground">Recommended: 200x200px, PNG or JPG</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                value={settings.storeDescription}
                onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input
                  id="storePhone"
                  value={settings.storePhone}
                  onChange={(e) => handleInputChange("storePhone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeWebsite">Website</Label>
                <Input
                  id="storeWebsite"
                  value={settings.storeWebsite}
                  onChange={(e) => handleInputChange("storeWebsite", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeAddress">Store Address</Label>
              <Textarea
                id="storeAddress"
                value={settings.storeAddress}
                onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>Legal business information for tax and compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={settings.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input id="taxId" value={settings.taxId} onChange={(e) => handleInputChange("taxId", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={settings.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="Corporation">Corporation</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new orders</p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => handleInputChange("orderNotifications", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert when product inventory is running low</p>
              </div>
              <Switch
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => handleInputChange("lowStockAlerts", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Review Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when customers leave reviews</p>
              </div>
              <Switch
                checked={settings.reviewNotifications}
                onCheckedChange={(checked) => handleInputChange("reviewNotifications", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Promotional Emails</Label>
                <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
              </div>
              <Switch
                checked={settings.promotionalEmails}
                onCheckedChange={(checked) => handleInputChange("promotionalEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Settings
            </CardTitle>
            <CardDescription>Configure shipping options and policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange("freeShippingThreshold", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processingTime">Processing Time (days)</Label>
                <Input
                  id="processingTime"
                  value={settings.processingTime}
                  onChange={(e) => handleInputChange("processingTime", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingFrom">Shipping From</Label>
              <Input
                id="shippingFrom"
                value={settings.shippingFrom}
                onChange={(e) => handleInputChange("shippingFrom", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Configure how you receive payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={settings.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Bank Account</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="bankAccount"
                  value={settings.bankAccount}
                  onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                  disabled
                />
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Store Policies
            </CardTitle>
            <CardDescription>Set your store policies and terms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="returnPolicy">Return Policy</Label>
              <Textarea
                id="returnPolicy"
                value={settings.returnPolicy}
                onChange={(e) => handleInputChange("returnPolicy", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shippingPolicy">Shipping Policy</Label>
              <Textarea
                id="shippingPolicy"
                value={settings.shippingPolicy}
                onChange={(e) => handleInputChange("shippingPolicy", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacyPolicy">Privacy Policy</Label>
              <Textarea
                id="privacyPolicy"
                value={settings.privacyPolicy}
                onChange={(e) => handleInputChange("privacyPolicy", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>Optimize your store for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange("metaTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={settings.metaDescription}
                onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeKeywords">Store Keywords</Label>
              <Input
                id="storeKeywords"
                value={settings.storeKeywords}
                onChange={(e) => handleInputChange("storeKeywords", e.target.value)}
                placeholder="electronics, tech, gadgets"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
