import { DateField } from "@/components/form/DateField";
import { FileField } from "@/components/form/FileField";
import { SelectField, type SelectOption } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInertiaForm } from "@/hooks/useInertiaForm";
import { User } from "@/types/user";
import { Building2, FileText, MapPin, Store } from "lucide-react";
import React from "react";

export type VendorApplicationForm = {
  name?: string;
  password?: string;
  email: string;
  // Store branding
  store_name: string;
  slug: string;
  logo: File | null | undefined;
  banner: File | null | undefined;
  // Contact & location
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  // Legal & business info
  business_name: string;
  business_type: string;
  tax_id: string;
  national_id: string;
  trade_license: string;
  license_expiry: string;
};

const businessTypes: SelectOption[] = [
  { value: "Sole Proprietorship", label: "Sole Proprietorship" },
  { value: "Partnership", label: "Partnership" },
  { value: "Limited Liability Company (LLC)", label: "Limited Liability Company (LLC)" },
  { value: "Corporation", label: "Corporation" },
  { value: "Cooperative", label: "Cooperative" },
  { value: "Non-Profit Organization", label: "Non-Profit Organization" },
];

const countries: SelectOption[] = [
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "India", label: "India" },
  { value: "Brazil", label: "Brazil" },
  { value: "Mexico", label: "Mexico" },
];

export const VendorApplyForm: React.FC<{ user?: User | null }> = ({ user }) => {
  const { data, setData, errors, processing, post, handleChange, handleFile } = useInertiaForm<VendorApplicationForm>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    // Store branding
    store_name: "",
    slug: "",
    // slug handled in backend
    logo: undefined,
    banner: undefined,
    // Contact & location
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    // Legal & business info
    business_name: "",
    business_type: "",
    tax_id: "",
    national_id: "",
    trade_license: "",
    license_expiry: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure existing user email/name are set from prop
    if (user) {
      setData("email", user.email as string);
      setData("name", user.name as string);
    }

    post(route("vendor.apply.store"), {
      forceFormData: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Account (only when no user) */}
      {!user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create User Account
            </CardTitle>
            <CardDescription>
              This vendor doesn’t have a user account. Provide credentials to create one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                id="name"
                label="Full Name *"
                value={data.name}
                onChange={handleChange("name")}
                error={errors.name}
                placeholder="John Doe"
              />
              <TextField
                id="email"
                type="email"
                label="Email Address *"
                value={data.email}
                onChange={handleChange("email")}
                error={errors.email}
                placeholder="vendor@example.com"
              />
              <TextField
                id="password"
                type="password"
                label="Password *"
                value={data.password}
                onChange={handleChange("password")}
                error={errors.password}
                placeholder="********"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Information
          </CardTitle>
          <CardDescription>Basic information about your store and brand</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              id="store_name"
              label="Store Name *"
              value={data.store_name}
              onChange={handleChange("store_name")}
              error={errors.store_name}
              placeholder="Your Store Name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FileField
              id="logo"
              label="Store Logo"
              accept="image/*"
              onChange={handleFile("logo")}
              error={errors.logo}
            />
            <FileField
              id="banner"
              label="Store Banner"
              accept="image/*"
              onChange={handleFile("banner")}
              error={errors.banner}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Contact & Location
          </CardTitle>
          <CardDescription>Your contact details and business location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              id="phone"
              type="tel"
              label="Phone Number"
              value={data.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
              placeholder="+880 1XXXXXXXXX"
            />
          </div>

          <TextAreaField
            id="address"
            label="Business Address"
            value={data.address}
            onChange={handleChange("address")}
            error={errors.address}
            placeholder="House 12, Road 34, Dhanmondi, Dhaka"
            rows={3}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TextField
              id="city"
              label="City"
              value={data.city}
              onChange={handleChange("city")}
              error={errors.city}
              placeholder="Dhaka"
            />
            <TextField
              id="state"
              label="State/Province"
              value={data.state}
              onChange={handleChange("state")}
              error={errors.state}
              placeholder="Dhaka"
            />
            <SelectField
              label="Country"
              value={data.country}
              onValueChange={(v) => setData("country", v)}
              options={countries}
              error={errors.country}
              placeholder="Select country"
            />
            <TextField
              id="postal_code"
              label="Postal Code"
              value={data.postal_code}
              onChange={handleChange("postal_code")}
              error={errors.postal_code}
              placeholder="1207"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>Legal and business registration details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              id="business_name"
              label="Legal Business Name"
              value={data.business_name}
              onChange={handleChange("business_name")}
              error={errors.business_name}
              placeholder="ABC Company Ltd."
            />
            <SelectField
              label="Business Type"
              value={data.business_type}
              onValueChange={(v) => setData("business_type", v)}
              options={businessTypes}
              error={errors.business_type}
              placeholder="Select business type"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              id="tax_id"
              label="Tax ID / TIN"
              value={data.tax_id}
              onChange={handleChange("tax_id")}
              error={errors.tax_id}
              placeholder="1234567890"
            />
            <TextField
              id="national_id"
              label="National ID"
              value={data.national_id}
              onChange={handleChange("national_id")}
              error={errors.national_id}
              placeholder="NID Number"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              id="trade_license"
              label="Trade License Number"
              value={data.trade_license}
              onChange={handleChange("trade_license")}
              error={errors.trade_license}
              placeholder="TL-123456789"
            />
            <DateField
              id="license_expiry"
              label="License Expiry Date"
              value={data.license_expiry}
              onChange={handleChange("license_expiry")}
              error={errors.license_expiry}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-center">
        <Button type="submit" size="lg" disabled={processing} className="w-full px-8 md:w-auto">
          {processing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Submitting Application...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Submit Vendor Application
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default VendorApplyForm;
