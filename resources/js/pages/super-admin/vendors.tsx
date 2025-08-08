import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/layouts/admin-layout";
import { router, useForm } from "@inertiajs/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Store,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface VendorType {
  id: number;
  store_name: string;
  email: string;
  phone: string;
  status: string;
  logo: string;
}

type VendorFormType = {
  name: string;
  email: string;
  password: string;
  store_name: string;
  phone: string;
  address: string;
  description: string;
  status: string;
};

const vendorStats = [
  {
    title: "Total Vendors",
    value: "156",
    change: "+12",
    icon: Store,
  },
  {
    title: "Active Vendors",
    value: "142",
    change: "+8",
    icon: Store,
  },
  {
    title: "Pending Approval",
    value: "8",
    change: "+3",
    icon: Store,
  },
  {
    title: "Total Revenue",
    value: "$45,230",
    change: "+15%",
    icon: Store,
  },
];

// ! super-admin cant create vendor yet. backend logic is complex
export default function Vendors({ vendors }: { vendors: VendorType[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, setData, post, processing, errors } = useForm<VendorFormType>({
    name: "",
    password: "",
    store_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    status: "approved",
  });

  const filteredVendors = vendors.filter(
    (vendor: VendorType) =>
      vendor.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("vendor.apply.store"));
    console.log(data, errors);
    setIsDialogOpen(false);
  };

  const handleApproveVendor = (vendorId: number) => {
    router.post(route("super-admin.approve-vendor", { vendorId }));
  };

  const handleRejectVendor = (vendorId: number) => {
    router.post(route("super-admin.reject-vendor", { vendorId }));
  };

  return (
    <AdminLayout title="Manage Vendors">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Vendors</h1>
            <p className="text-muted-foreground">Manage and monitor all vendors in your marketplace</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[55vw]">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>
                  Create a new vendor account. Fill in the required information below.
                </DialogDescription>
              </DialogHeader>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex w-full gap-4">
                  <div className="flex w-1/2 flex-col gap-3">
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name*
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email*
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password*
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex w-1/2 flex-col gap-3">
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="store_name" className="text-right">
                        Store Name*
                      </Label>
                      <Input
                        id="store_name"
                        name="store_name"
                        value={data.store_name}
                        onChange={(e) => setData("store_name", e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="w-full items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select name="status" value={data.status} onValueChange={(value) => setData("status", value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button disabled={processing} type="submit">
                    Create Vendor
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vendorStats.map((stat) => (
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

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex w-full items-start justify-between">
              <div className="">
                <CardTitle>Vendor List</CardTitle>
                <CardDescription>A list of all vendors in your marketplace</CardDescription>
              </div>
              <Button className="ml-auto bg-gray-100" variant="outline">
                Rejected Vendors
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* show no vendor found message */}
                {paginatedVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-400">
                      No vendors found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedVendors.map((vendor: VendorType) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={vendor.logo || "/images/placeholder.svg"} />
                            <AvatarFallback>
                              {vendor.store_name
                                .split(" ")
                                .map((n: any) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{vendor.store_name}</div>
                            <div className="text-sm text-muted-foreground">ID: {vendor.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-1 h-3 w-3" />
                            {vendor.email}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3 w-3" />
                            {vendor.phone || "N/A"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            vendor.status === "Active"
                              ? "default"
                              : vendor.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleApproveVendor(vendor.id)}>
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRejectVendor(vendor.id)}>
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Vendor
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Vendor
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {/* {paginatedVendors.length > 5 && ( */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVendors.length)} of{" "}
                {filteredVendors.length} vendors
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
            {/* )} */}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
