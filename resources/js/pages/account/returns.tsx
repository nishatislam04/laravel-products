"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { CheckCircle, Eye, Package, RotateCcw, Search, Truck, Upload, XCircle } from "lucide-react";
import { useState } from "react";

interface ReturnItem {
  id: string;
  returnNumber: string;
  orderNumber: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "processing" | "completed" | "refunded";
  requestDate: string;
  expectedRefund: number;
  refundMethod: string;
  trackingNumber?: string;
  notes?: string;
}

interface ReturnsProps {
  returns: ReturnItem[];
}

const mockReturns: ReturnItem[] = [
  {
    id: "1",
    returnNumber: "RET-2024-001",
    orderNumber: "ORD-2024-001",
    productName: "HAVIT HV-G92 Gamepad",
    productImage: "/images/placeholder.svg?height=80&width=80&text=Gamepad",
    quantity: 1,
    price: 120,
    reason: "Defective Product",
    status: "processing",
    requestDate: "2024-01-20",
    expectedRefund: 120,
    refundMethod: "Original Payment Method",
    trackingNumber: "TRK123456789",
    notes: "Product arrived with broken buttons",
  },
  {
    id: "2",
    returnNumber: "RET-2024-002",
    orderNumber: "ORD-2024-002",
    productName: "AK-900 Wired Keyboard",
    productImage: "/images/placeholder.svg?height=80&width=80&text=Keyboard",
    quantity: 1,
    price: 960,
    reason: "Wrong Item Received",
    status: "approved",
    requestDate: "2024-01-18",
    expectedRefund: 960,
    refundMethod: "Store Credit",
    notes: "Received different model than ordered",
  },
  {
    id: "3",
    returnNumber: "RET-2024-003",
    orderNumber: "ORD-2024-003",
    productName: "IPS LCD Gaming Monitor",
    productImage: "/images/placeholder.svg?height=80&width=80&text=Monitor",
    quantity: 1,
    price: 370,
    reason: "Not as Described",
    status: "refunded",
    requestDate: "2024-01-15",
    expectedRefund: 370,
    refundMethod: "Bank Transfer",
    notes: "Monitor resolution was different from description",
  },
  {
    id: "4",
    returnNumber: "RET-2024-004",
    orderNumber: "ORD-2024-004",
    productName: "S-Series Comfort Chair",
    productImage: "/images/placeholder.svg?height=80&width=80&text=Chair",
    quantity: 1,
    price: 375,
    reason: "Changed Mind",
    status: "rejected",
    requestDate: "2024-01-12",
    expectedRefund: 0,
    refundMethod: "N/A",
    notes: "Return request was outside the return window",
  },
];

export default function Returns({ returns = [] }: ReturnsProps) {
  const [returnsList, setReturnsList] = useState<ReturnItem[]>(mockReturns);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [returnForm, setReturnForm] = useState({
    orderNumber: "",
    productId: "",
    quantity: 1,
    reason: "",
    description: "",
    images: [] as File[],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "processing":
        return <Truck className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "refunded":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "refunded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReturns = returnsList.filter((returnItem) => {
    const matchesSearch =
      returnItem.returnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && returnItem.status === activeTab;
  });

  const returnCounts = {
    all: returnsList.length,
    pending: returnsList.filter((r) => r.status === "pending").length,
    approved: returnsList.filter((r) => r.status === "approved").length,
    processing: returnsList.filter((r) => r.status === "processing").length,
    completed: returnsList.filter((r) => r.status === "completed").length,
    refunded: returnsList.filter((r) => r.status === "refunded").length,
    rejected: returnsList.filter((r) => r.status === "rejected").length,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReturnForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit return request:", returnForm);
    // Handle return request submission
    setIsRequestDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setReturnForm({
      orderNumber: "",
      productId: "",
      quantity: 1,
      reason: "",
      description: "",
      images: [],
    });
  };

  const handleViewDetails = (returnId: string) => {
    console.log("View return details:", returnId);
    // Navigate to return details page
  };

  const handleTrackReturn = (trackingNumber: string) => {
    console.log("Track return:", trackingNumber);
    // Open tracking page
  };

  return (
    <AccountLayout>
      <Head title="My Returns - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">My Returns</h1>
            <p className="text-gray-600">Track and manage your return requests</p>
          </div>
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 text-white hover:bg-red-600">
                <RotateCcw className="mr-2 h-4 w-4" />
                Request Return
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Return</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitReturn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    value={returnForm.orderNumber}
                    onChange={handleInputChange}
                    placeholder="ORD-2024-XXX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Return</Label>
                  <Select
                    value={returnForm.reason}
                    onValueChange={(value) => setReturnForm((prev) => ({ ...prev, reason: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective Product</SelectItem>
                      <SelectItem value="wrong-item">Wrong Item Received</SelectItem>
                      <SelectItem value="not-as-described">Not as Described</SelectItem>
                      <SelectItem value="damaged">Damaged in Transit</SelectItem>
                      <SelectItem value="changed-mind">Changed Mind</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity to Return</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={returnForm.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={returnForm.description}
                    onChange={handleInputChange}
                    placeholder="Please provide details about the issue..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images (Optional)</Label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsRequestDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
                    Submit Return Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search returns by return number, order number, or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Return Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All ({returnCounts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({returnCounts.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({returnCounts.approved})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({returnCounts.processing})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({returnCounts.completed})</TabsTrigger>
            <TabsTrigger value="refunded">Refunded ({returnCounts.refunded})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({returnCounts.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredReturns.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <RotateCcw className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No returns found</h3>
                  <p className="text-center text-gray-600">
                    {searchTerm ? "No returns match your search criteria." : "You haven't requested any returns yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredReturns.map((returnItem) => (
                  <Card key={returnItem.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CardTitle className="text-lg">Return #{returnItem.returnNumber}</CardTitle>
                          <Badge
                            className={`${getStatusColor(returnItem.status)} hover:${getStatusColor(returnItem.status)}`}
                          >
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(returnItem.status)}
                              <span className="capitalize">{returnItem.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Request Date</p>
                          <p className="font-semibold">{returnItem.requestDate}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Product Info */}
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={returnItem.productImage || "/images/placeholder.svg"}
                            alt={returnItem.productName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{returnItem.productName}</h4>
                          <p className="text-sm text-gray-600">Order: {returnItem.orderNumber}</p>
                          <p className="text-sm text-gray-600">Quantity: {returnItem.quantity}</p>
                          <p className="text-sm text-gray-600">Reason: {returnItem.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Expected Refund</p>
                          <p className="text-xl font-bold text-green-600">৳{returnItem.expectedRefund}</p>
                          <p className="text-xs text-gray-500">{returnItem.refundMethod}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {returnItem.notes && (
                        <div className="rounded-lg bg-gray-50 p-3">
                          <p className="text-sm text-gray-700">{returnItem.notes}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(returnItem.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {returnItem.trackingNumber && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTrackReturn(returnItem.trackingNumber!)}
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Track Return
                            </Button>
                          )}
                        </div>
                        <div className="text-right">
                          {returnItem.trackingNumber && (
                            <p className="text-sm text-gray-600">
                              Tracking: <span className="font-medium">{returnItem.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Return Policy Info */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ul className="space-y-2 text-sm">
              <li>• Returns are accepted within 30 days of delivery</li>
              <li>• Items must be in original condition with tags attached</li>
              <li>• Refunds are processed within 5-7 business days after approval</li>
              <li>• Return shipping is free for defective or wrong items</li>
              <li>• Customer pays return shipping for change of mind returns</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
