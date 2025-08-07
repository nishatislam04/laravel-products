import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import SimpleLayout from "@/layouts/simple-layout";
import { User } from "@/types/user";
import { useForm } from "@inertiajs/react";
import { AlertCircle, Building2, FileText, MapPin, Store, Upload } from "lucide-react";
import { FormEventHandler } from "react";

type VendorApplicationForm = {
  name?: string;
  password?: string;
  email: string;

  // Store branding
  store_name: string;
  slug: string;
  logo: File | null;
  banner: File | null;

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

const businessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Company (LLC)",
  "Corporation",
  "Cooperative",
  "Non-Profit Organization",
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "Mexico",
];

export default function VendorApply({ user }: { user: User }) {
  const { data, setData, post, processing, errors, progress } = useForm<VendorApplicationForm>({
    name: "",
    email: user?.email ?? "",
    password: "",

    // Store branding
    store_name: "",
    slug: "",
    logo: null,
    banner: null,

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

  // Auto-generate slug from store name
  const handleStoreNameChange = (value: string) => {
    setData("store_name", value);
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setData("slug", slug);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (user) {
      setData("email", user?.email);
      setData("name", user?.name);
    }

    console.log("before", errors);

    post(route("vendor.apply.store"), {
      forceFormData: true, // Important for file uploads
    });
    console.log("after", errors);
  };

  return (
    <SimpleLayout title="Apply to Become a Vendor">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Apply to Become a Vendor</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Join our marketplace and start selling your products to thousands of customers. Fill out the application
            form below and we'll review your submission within 2-3 business days.
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please ensure all information is accurate. Incomplete or false information may result in application
            rejection.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Store Information */}
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
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      placeholder="John Doe"
                      required
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      placeholder="vendor@example.com"
                      required
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      placeholder="********"
                      required
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
                <div className="space-y-2">
                  <Label htmlFor="store_name">Store Name *</Label>
                  <Input
                    id="store_name"
                    type="text"
                    value={data.store_name}
                    onChange={(e) => handleStoreNameChange(e.target.value)}
                    placeholder="Your Store Name"
                    className={errors.store_name ? "border-red-500" : ""}
                    required
                  />
                  {errors.store_name && <p className="text-sm text-red-500">{errors.store_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Store URL Slug *</Label>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      yourstore.com/
                    </span>
                    <Input
                      id="slug"
                      type="text"
                      value={data.slug}
                      onChange={(e) => setData("slug", e.target.value)}
                      placeholder="store-url"
                      className={`rounded-l-none ${errors.slug ? "border-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logo">Store Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setData("logo", e.target.files?.[0] || null)}
                      className={errors.logo ? "border-red-500" : ""}
                    />
                    <Upload className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Recommended: 200x200px, PNG or JPG</p>
                  {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="banner">Store Banner</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="banner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setData("banner", e.target.files?.[0] || null)}
                      className={errors.banner ? "border-red-500" : ""}
                    />
                    <Upload className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">Recommended: 1200x400px, PNG or JPG</p>
                  {errors.banner && <p className="text-sm text-red-500">{errors.banner}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
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
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address </Label>
                <Textarea
                  id="address"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  placeholder="123 Business Street, Suite 100"
                  className={errors.address ? "border-red-500" : ""}
                  rows={3}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City </Label>
                  <Input
                    id="city"
                    type="text"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    placeholder="New York"
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province </Label>
                  <Input
                    id="state"
                    type="text"
                    value={data.state}
                    onChange={(e) => setData("state", e.target.value)}
                    placeholder="NY"
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country </Label>
                  <Select value={data.country} onValueChange={(value) => setData("country", value)}>
                    <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code </Label>
                  <Input
                    id="postal_code"
                    type="text"
                    value={data.postal_code}
                    onChange={(e) => setData("postal_code", e.target.value)}
                    placeholder="10001"
                    className={errors.postal_code ? "border-red-500" : ""}
                  />
                  {errors.postal_code && <p className="text-sm text-red-500">{errors.postal_code}</p>}
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="business_name">Legal Business Name </Label>
                  <Input
                    id="business_name"
                    type="text"
                    value={data.business_name}
                    onChange={(e) => setData("business_name", e.target.value)}
                    placeholder="ABC Company LLC"
                    className={errors.business_name ? "border-red-500" : ""}
                  />
                  {errors.business_name && <p className="text-sm text-red-500">{errors.business_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type </Label>
                  <Select value={data.business_type} onValueChange={(value) => setData("business_type", value)}>
                    <SelectTrigger className={errors.business_type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.business_type && <p className="text-sm text-red-500">{errors.business_type}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID / EIN</Label>
                  <Input
                    id="tax_id"
                    type="text"
                    value={data.tax_id}
                    onChange={(e) => setData("tax_id", e.target.value)}
                    placeholder="12-3456789"
                    className={errors.tax_id ? "border-red-500" : ""}
                  />
                  {errors.tax_id && <p className="text-sm text-red-500">{errors.tax_id}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="national_id">National ID / SSN</Label>
                  <Input
                    id="national_id"
                    type="text"
                    value={data.national_id}
                    onChange={(e) => setData("national_id", e.target.value)}
                    placeholder="123-45-6789"
                    className={errors.national_id ? "border-red-500" : ""}
                  />
                  {errors.national_id && <p className="text-sm text-red-500">{errors.national_id}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="trade_license">Trade License Number</Label>
                  <Input
                    id="trade_license"
                    type="text"
                    value={data.trade_license}
                    onChange={(e) => setData("trade_license", e.target.value)}
                    placeholder="TL-123456789"
                    className={errors.trade_license ? "border-red-500" : ""}
                  />
                  {errors.trade_license && <p className="text-sm text-red-500">{errors.trade_license}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license_expiry">License Expiry Date</Label>
                  <Input
                    id="license_expiry"
                    type="date"
                    value={data.license_expiry}
                    onChange={(e) => setData("license_expiry", e.target.value)}
                    className={errors.license_expiry ? "border-red-500" : ""}
                  />
                  {errors.license_expiry && <p className="text-sm text-red-500">{errors.license_expiry}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
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

          {progress && (
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          )}
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By submitting this application, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Vendor Agreement
            </a>
            .
          </p>
        </div>
      </div>
    </SimpleLayout>
  );
}
