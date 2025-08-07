import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VendorLayout from "@/layouts/vendor-layout";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";

// Mock order data for vendor
const vendorOrders = [
  {
    id: "#VND-3210",
    customer: "John Smith",
    email: "john@example.com",
    product: "Wireless Headphones",
    quantity: 2,
    status: "Processing",
    amount: "$199.98",
    commission: "$19.99",
    date: "2024-03-15",
    paymentStatus: "Paid",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "#VND-3209",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "Smart Watch",
    quantity: 1,
    status: "Shipped",
    amount: "$199.99",
    commission: "$19.99",
    date: "2024-03-14",
    paymentStatus: "Paid",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "#VND-3208",
    customer: "Mike Wilson",
    email: "mike@example.com",
    product: "USB-C Cable",
    quantity: 3,
    status: "Delivered",
    amount: "$74.97",
    commission: "$7.49",
    date: "2024-03-13",
    paymentStatus: "Paid",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "#VND-3207",
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Bluetooth Speaker",
    quantity: 1,
    status: "Cancelled",
    amount: "$79.99",
    commission: "$0.00",
    date: "2024-03-12",
    paymentStatus: "Refunded",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "#VND-3206",
    customer: "David Brown",
    email: "david@example.com",
    product: "Wireless Mouse",
    quantity: 2,
    status: "Pending",
    amount: "$59.98",
    commission: "$5.99",
    date: "2024-03-11",
    paymentStatus: "Paid",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
];

const orderStats = [
  {
    title: "Total Orders",
    value: "234",
    change: "+12%",
    icon: ShoppingCart,
  },
  {
    title: "Pending Orders",
    value: "8",
    change: "+2",
    icon: Clock,
  },
  {
    title: "Completed Orders",
    value: "198",
    change: "+18%",
    icon: CheckCircle,
  },
  {
    title: "Total Commission",
    value: "$2,340",
    change: "+15%",
    icon: Package,
  },
];

export default function VendorOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const itemsPerPage = 5;
  const filteredOrders = vendorOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // Here you would typically update the order status via API
  };

  return (
    <VendorLayout title="Order Management">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">Track and manage all orders for your products</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {orderStats.map((stat) => (
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

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>Manage orders for your products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.product}</div>
                        <div className="text-sm text-muted-foreground">Qty: {order.quantity}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : order.status === "Shipped"
                                ? "outline"
                                : order.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{order.amount}</TableCell>
                    <TableCell className="font-medium text-green-600">{order.commission}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "Processing")}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "Shipped")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
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

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>Complete information about this order</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Customer Information</h4>
                    <p>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.email}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Order Information</h4>
                    <p>
                      <strong>Product:</strong> {selectedOrder.product}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                      <strong>Amount:</strong> {selectedOrder.amount}
                    </p>
                    <p>
                      <strong>Commission:</strong> {selectedOrder.commission}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      selectedOrder.status === "Delivered"
                        ? "default"
                        : selectedOrder.status === "Processing"
                          ? "secondary"
                          : selectedOrder.status === "Shipped"
                            ? "outline"
                            : selectedOrder.status === "Pending"
                              ? "secondary"
                              : "destructive"
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                  <Badge variant={selectedOrder.paymentStatus === "Paid" ? "default" : "secondary"}>
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </VendorLayout>
  );
}
