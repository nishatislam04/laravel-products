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
import VendorLayout from "@/layouts/vendor-layout";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// Mock refund data for vendor
const refundRequests = [
  {
    id: "#REF-001",
    orderId: "#VND-3210",
    customer: "John Smith",
    email: "john@example.com",
    product: "Wireless Headphones",
    reason: "Product not as described",
    amount: "$99.99",
    status: "Pending",
    requestDate: "2024-03-15",
    description:
      "The headphones do not match the specifications mentioned in the product description. The battery life is significantly shorter than advertised.",
    images: ["/images/placeholder.svg?height=100&width=100"],
  },
  {
    id: "#REF-002",
    orderId: "#VND-3208",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "Smart Watch",
    reason: "Defective product",
    amount: "$199.99",
    status: "Approved",
    requestDate: "2024-03-12",
    description: "The watch screen is cracked and the touch functionality is not working properly.",
    images: ["/images/placeholder.svg?height=100&width=100"],
  },
  {
    id: "#REF-003",
    orderId: "#VND-3205",
    customer: "Mike Wilson",
    email: "mike@example.com",
    product: "USB-C Cable",
    reason: "Wrong item received",
    amount: "$24.99",
    status: "Rejected",
    requestDate: "2024-03-10",
    description: "Received a micro USB cable instead of USB-C cable as ordered.",
    images: [],
  },
  {
    id: "#REF-004",
    orderId: "#VND-3203",
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Bluetooth Speaker",
    reason: "Changed mind",
    amount: "$79.99",
    status: "Processing",
    requestDate: "2024-03-08",
    description: "Customer changed their mind about the purchase within the return window.",
    images: [],
  },
];

const refundStats = [
  {
    title: "Total Requests",
    value: "23",
    change: "+3",
    icon: RefreshCw,
  },
  {
    title: "Pending Review",
    value: "8",
    change: "+2",
    icon: Clock,
  },
  {
    title: "Approved",
    value: "12",
    change: "+1",
    icon: CheckCircle,
  },
  {
    title: "Rejected",
    value: "3",
    change: "0",
    icon: XCircle,
  },
];

export default function VendorRefunds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [responseText, setResponseText] = useState("");

  const itemsPerPage = 5;
  const filteredRefunds = refundRequests.filter((refund) => {
    const matchesSearch =
      refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || refund.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRefunds = filteredRefunds.slice(startIndex, startIndex + itemsPerPage);

  const handleRefundAction = (refundId: string, action: "approve" | "reject", response: string) => {
    console.log(`${action} refund ${refundId} with response: ${response}`);
    setSelectedRefund(null);
    setResponseText("");
  };

  return (
    <VendorLayout title="Refund Requests">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Refund Requests</h1>
          <p className="text-muted-foreground">Review and manage customer refund requests for your products</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {refundStats.map((stat) => (
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

        {/* Refunds List */}
        <Card>
          <CardHeader>
            <CardTitle>Refund Requests</CardTitle>
            <CardDescription>Review and respond to customer refund requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search refund requests..."
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
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">{refund.id}</TableCell>
                    <TableCell className="font-medium">{refund.orderId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{refund.customer}</div>
                        <div className="text-sm text-muted-foreground">{refund.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{refund.product}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{refund.reason}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{refund.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          refund.status === "Approved"
                            ? "default"
                            : refund.status === "Processing"
                              ? "secondary"
                              : refund.status === "Pending"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{refund.requestDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedRefund(refund)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {refund.status === "Pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleRefundAction(refund.id, "approve", "")}>
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRefundAction(refund.id, "reject", "")}>
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRefunds.length)} of{" "}
                {filteredRefunds.length} refund requests
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

        {/* Refund Details Dialog */}
        {selectedRefund && (
          <Dialog open={!!selectedRefund} onOpenChange={() => setSelectedRefund(null)}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Refund Request Details - {selectedRefund.id}</DialogTitle>
                <DialogDescription>Review the refund request and take appropriate action</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Customer Information</h4>
                    <p>
                      <strong>Name:</strong> {selectedRefund.customer}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedRefund.email}
                    </p>
                    <p>
                      <strong>Order ID:</strong> {selectedRefund.orderId}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Refund Information</h4>
                    <p>
                      <strong>Product:</strong> {selectedRefund.product}
                    </p>
                    <p>
                      <strong>Amount:</strong> {selectedRefund.amount}
                    </p>
                    <p>
                      <strong>Reason:</strong> {selectedRefund.reason}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <Badge
                        className="ml-2"
                        variant={
                          selectedRefund.status === "Approved"
                            ? "default"
                            : selectedRefund.status === "Processing"
                              ? "secondary"
                              : selectedRefund.status === "Pending"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {selectedRefund.status}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Customer Description</h4>
                  <p className="rounded-md bg-muted p-3 text-sm">{selectedRefund.description}</p>
                </div>
                {selectedRefund.images.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-semibold">Attached Images</h4>
                    <div className="flex gap-2">
                      {selectedRefund.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/images/placeholder.svg"}
                          alt={`Evidence ${index + 1}`}
                          className="h-20 w-20 rounded-md border object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {selectedRefund.status === "Pending" && (
                  <div>
                    <Label htmlFor="response">Response Message (Optional)</Label>
                    <Textarea
                      id="response"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Add a message to the customer..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
              {selectedRefund.status === "Pending" && (
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRefundAction(selectedRefund.id, "reject", responseText)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject Request
                  </Button>
                  <Button onClick={() => handleRefundAction(selectedRefund.id, "approve", responseText)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve Refund
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </VendorLayout>
  );
}
