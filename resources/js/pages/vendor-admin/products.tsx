import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import VendorLayout from "@/layouts/vendor-layout";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { CommandGroup } from "cmdk";
import {
  AlertTriangle,
  Check,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";

// Mock product data for vendor
const vendorProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    sku: "TG-WBH-001",
    category: "Electronics",
    price: "$99.99",
    stock: 45,
    status: "Active",
    rating: 4.5,
    sales: 234,
    revenue: "$23,166",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    sku: "TG-SFW-002",
    category: "Electronics",
    price: "$199.99",
    stock: 12,
    status: "Active",
    rating: 4.8,
    sales: 156,
    revenue: "$31,198",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "USB-C Fast Charger",
    sku: "TG-UFC-003",
    category: "Accessories",
    price: "$24.99",
    stock: 0,
    status: "Out of Stock",
    rating: 4.2,
    sales: 89,
    revenue: "$2,224",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    sku: "TG-WM-004",
    category: "Accessories",
    price: "$29.99",
    stock: 8,
    status: "Low Stock",
    rating: 4.7,
    sales: 145,
    revenue: "$4,349",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    sku: "TG-BS-005",
    category: "Electronics",
    price: "$79.99",
    stock: 67,
    status: "Inactive",
    rating: 4.3,
    sales: 78,
    revenue: "$6,239",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-03-01",
  },
];

const productStats = [
  {
    title: "Total Products",
    value: "45",
    change: "+3",
    icon: Package,
  },
  {
    title: "Active Products",
    value: "38",
    change: "+2",
    icon: Package,
  },
  {
    title: "Low Stock Items",
    value: "5",
    change: "+2",
    icon: AlertTriangle,
  },
  {
    title: "Total Revenue",
    value: "$67,176",
    change: "+12%",
    icon: TrendingUp,
  },
];

// create type for formProduct
type FormProduct = {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category_id: string;
  sale_price: string;
  sale_start: string;
  sale_end: string;
  stock_quantity: string;
  stock_status: string;
  images: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  sku: string;
  category: string;
  brand: string;
  price: string;
  stock: string;
  status: string;
  return_days: string;
  warranty_type: string;
  warranty_period: string;
  meta_title: string;
  meta_description: string;
  tags: string;
};

// ! add props type

export default function VendorProducts({
  categories,
  brands,
  stockStatusEnum,
  warrentTypeEnum,
}: {
  categories: any;
  brands: any;
  stockStatusEnum: any;
  warrentTypeEnum: any;
}) {
  console.log(stockStatusEnum);
  const [searchTerm, setSearchTerm] = useState("");
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValues, setCategoryValues] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const [openBrand, setOpenBrand] = useState(false);
  const [brandValues, setBrandValues] = useState("");
  const [brandInput, setBrandInput] = useState("");

  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, setData, post, processing, errors } = useForm<FormProduct>({
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    category_id: "",
    sale_price: "",
    sale_start: "",
    sale_end: "",
    stock_quantity: "",
    stock_status: "",
    images: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    sku: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    status: "Active",
    return_days: "",
    warranty_type: "",
    warranty_period: "",
    meta_title: "",
    meta_description: "",
    tags: "",
  });
  // Auto-generate slug from store name
  const handleNameChange = (value: string) => {
    setData("name", value);
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setData("slug", slug);
  };

  const itemsPerPage = 5;
  const filteredProducts = vendorProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("vendor.products.store"), {
      forceFormData: true,
    });
    setIsDialogOpen(false);
  };

  return (
    <VendorLayout title="Product Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
            <p className="text-muted-foreground">Manage your product inventory and listings</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="relative">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] min-h-[90vh] max-w-[70vw] min-w-[70vw] overflow-y-auto p-0">
              <DialogHeader className="sticky top-0 z-50 bg-white px-6 py-6">
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product listing for your store.</DialogDescription>
              </DialogHeader>
              <form className="p-6 pt-0" onSubmit={handleSubmit}>
                <section className="grid grid-cols-12 gap-4">
                  {/* basic info container */}
                  <div className="col-span-6 space-y-2 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Basic Info</h3>
                    <div className="">
                      <Label htmlFor="name" className="text-right">
                        Name*
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className={errors.name ? "border-red-500" : ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="slug" className="text-right">
                        slug*
                      </Label>
                      <Input
                        id="slug"
                        name="slug"
                        value={data.slug}
                        className={errors.slug ? "border-red-500" : ""}
                        onChange={(e) => setData("slug", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={data.description}
                        className={errors.description ? "border-red-500" : ""}
                        onChange={(e) => setData("description", e.target.value)}
                      />
                    </div>
                    {/* catgory & brand */}
                    {/* catgory required */}
                    <div className="flex justify-between">
                      <div className="flex w-1/2 flex-col space-y-1">
                        <Label htmlFor="category">Category</Label>
                        <Popover open={openCategory} onOpenChange={setOpenCategory}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCategory}
                              className="w-[200px] justify-between"
                            >
                              {categoryValues ? categoryValues : "Select category..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search framework..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {categories.map((category: any) => (
                                    <CommandItem
                                      key={category.name}
                                      value={category.name}
                                      onSelect={(currentValue) => {
                                        setCategoryInput(currentValue === categoryInput ? "" : currentValue);
                                        setCategoryValues((prev) => (prev !== currentValue ? currentValue : ""));
                                        setOpenCategory(false);
                                      }}
                                    >
                                      {category.name}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          categoryInput === category.name ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* brand optional */}
                      <div className="flex w-1/2 flex-col space-y-1">
                        <Label htmlFor="brand">Brand</Label>
                        <Popover open={openBrand} onOpenChange={setOpenBrand}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openBrand}
                              className="w-[200px] justify-between"
                            >
                              {brandValues ? brandValues : "Select brand..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search framework..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {brands.map((brand: any) => (
                                    <CommandItem
                                      key={brand.name}
                                      value={brand.name}
                                      onSelect={(currentValue) => {
                                        setBrandInput(currentValue === brandInput ? "" : currentValue);
                                        setBrandValues((prev) => (prev !== currentValue ? currentValue : ""));
                                        setOpenBrand(false);
                                      }}
                                    >
                                      {brand.name}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          brandInput === brand.name ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* pricing container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Pricing</h3>
                    <div className="">
                      <Label htmlFor="price" className="text-right">
                        Price*
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className={errors.price ? "border-red-500" : ""}
                        onChange={(e) => setData("price", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="price" className="text-right">
                        Sale price (discount price)
                      </Label>
                      <Input
                        id="sale_price"
                        type="number"
                        name="sale_price"
                        className={errors.sale_price ? "border-red-500" : ""}
                        value={data.sale_price}
                        onChange={(e) => setData("sale_price", e.target.value)}
                      />
                    </div>
                    <div className="my-4">
                      <Label htmlFor="sale_start" className="text-right">
                        Sale start date
                      </Label>
                      <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                            {startDate ? startDate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setStartDate(date);
                              setOpenStartDate(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="my-4">
                      <Label htmlFor="sale_end" className="text-right">
                        Sale end date
                      </Label>
                      <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                            {endDate ? endDate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setEndDate(date);
                              setOpenEndDate(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* stock & sku container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Stock & SKU</h3>
                    <div className="">
                      <Label htmlFor="sku" className="text-right">
                        SKU*
                      </Label>
                      <Input
                        id="sku"
                        type="text"
                        value={data.sku}
                        className={errors.sku ? "border-red-500" : ""}
                        onChange={(e) => setData("sku", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="stock_quantity" className="text-right">
                        Stock Quantity*
                      </Label>
                      <Input
                        id="stock_quantity"
                        type="number"
                        value={data.stock_quantity}
                        className={errors.stock_quantity ? "border-red-500" : ""}
                        onChange={(e) => setData("stock_quantity", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="stock_quantity" className="text-right">
                        Stock Status*
                      </Label>
                      <Select
                        value={data.stock_status}
                        onValueChange={(value) => setData("stock_status", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stock status" />
                        </SelectTrigger>
                        <SelectContent>
                          {stockStatusEnum.map((status: any) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* media container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Media</h3>
                    <div className="my-6">
                      <Label htmlFor="thumbnail" className="text-right">
                        Thumbnail*
                      </Label>
                      <Input
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        className={errors.thumbnail ? "border-red-500" : ""}
                        value={data.thumbnail}
                        onChange={(e) => setData("thumbnail", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="images" className="text-right">
                        Images
                      </Label>
                      <Input
                        id="images"
                        type="file"
                        name="images"
                        className={errors.images ? "border-red-500" : ""}
                        value={data.images}
                        onChange={(e) => setData("images", e.target.value)}
                        required
                        multiple
                      />
                    </div>
                  </div>

                  {/* shipping container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Shipping</h3>
                    <div className="">
                      <Label htmlFor="weight" className="text-right">
                        Weight
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        className={errors.weight ? "border-red-500" : ""}
                        value={data.weight}
                        onChange={(e) => setData("weight", e.target.value)}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="length" className="text-right">
                        Length
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        className={errors.length ? "border-red-500" : ""}
                        value={data.length}
                        onChange={(e) => setData("length", e.target.value)}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="width" className="text-right">
                        Width
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        className={errors.width ? "border-red-500" : ""}
                        value={data.width}
                        onChange={(e) => setData("width", e.target.value)}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="height" className="text-right">
                        Height
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        className={errors.height ? "border-red-500" : ""}
                        value={data.height}
                        onChange={(e) => setData("height", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* seo & marketing container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">SEO & Marketing</h3>
                    <div className="">
                      <Label htmlFor="meta_title" className="text-right">
                        Meta Title
                      </Label>
                      <Input
                        id="meta_title"
                        type="text"
                        className={errors.meta_title ? "border-red-500" : ""}
                        value={data.meta_title}
                        onChange={(e) => setData("meta_title", e.target.value)}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="meta_description" className="text-right">
                        Meta Description
                      </Label>
                      <Textarea
                        id="meta_description"
                        className={errors.meta_description ? "border-red-500" : ""}
                        value={data.meta_description}
                        onChange={(e) => setData("meta_description", e.target.value)}
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="tags" className="text-right">
                        Tags (comma separated)
                      </Label>
                      <Input
                        id="tags"
                        type="text"
                        className={errors.tags ? "border-red-500" : ""}
                        value={data.tags}
                        onChange={(e) => setData("tags", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* return & warranty container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Return & Warranty</h3>
                    <div className="">
                      <Label htmlFor="return_days" className="text-right">
                        Return Days*
                      </Label>
                      <Input
                        id="return_days"
                        type="number"
                        className={errors.return_days ? "border-red-500" : ""}
                        value={data.return_days}
                        onChange={(e) => setData("return_days", e.target.value)}
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="warranty_type" className="text-right">
                        Warranty Type*
                      </Label>
                      <Select value={data.warranty_type} onValueChange={(value) => setData("warranty_type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select warranty type" />
                        </SelectTrigger>
                        <SelectContent>
                          {warrentTypeEnum.map((type: any) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="">
                      <Label htmlFor="warranty_period" className="text-right">
                        Warranty Period*
                      </Label>
                      <Input
                        id="warranty_period"
                        type="number"
                        className={errors.warranty_period ? "border-red-500" : ""}
                        value={data.warranty_period}
                        onChange={(e) => setData("warranty_period", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </section>
                <DialogFooter className="mb-4">
                  <Button disabled={processing} type="submit">
                    Create Product
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage all products in your store inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/images/placeholder.svg"}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell>
                      <span
                        className={product.stock === 0 ? "text-red-600" : product.stock < 20 ? "text-yellow-600" : ""}
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "Active"
                            ? "default"
                            : product.status === "Out of Stock"
                              ? "destructive"
                              : product.status === "Low Stock"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </div>
                    </TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell className="font-medium text-green-600">{product.revenue}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
