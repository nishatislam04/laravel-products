import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminLayout from "@/layouts/admin-layout";
import { Edit, Eye, Mail, MoreHorizontal, Phone, Plus, Search, Store, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock vendor data
const vendors = [
  {
    id: 1,
    name: "TechGear Solutions",
    email: "contact@techgear.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    products: 45,
    revenue: "$12,450",
    joinDate: "2024-01-15",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Fashion Forward",
    email: "hello@fashionforward.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    products: 78,
    revenue: "$8,920",
    joinDate: "2024-02-20",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Home Essentials",
    email: "info@homeessentials.com",
    phone: "+1 (555) 345-6789",
    status: "Pending",
    products: 23,
    revenue: "$3,450",
    joinDate: "2024-03-10",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sports Central",
    email: "sales@sportscentral.com",
    phone: "+1 (555) 456-7890",
    status: "Inactive",
    products: 12,
    revenue: "$1,200",
    joinDate: "2024-01-05",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
];

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

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout title="Manage Vendors">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Vendors</h1>
            <p className="text-muted-foreground">Manage and monitor all vendors in your marketplace</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
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
            <CardTitle>Vendor List</CardTitle>
            <CardDescription>A list of all vendors in your marketplace</CardDescription>
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
                  <TableHead>Vendor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={vendor.avatar || "/images/placeholder.svg"} />
                          <AvatarFallback>
                            {vendor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
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
                          {vendor.phone}
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
                    <TableCell>{vendor.products}</TableCell>
                    <TableCell className="font-medium">{vendor.revenue}</TableCell>
                    <TableCell>{vendor.joinDate}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
