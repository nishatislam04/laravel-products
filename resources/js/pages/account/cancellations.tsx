"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { AlertCircle, CheckCircle, Clock, CreditCard, Download, Eye, Package, Search, X } from "lucide-react";
import { useState } from "react";

interface CancelledOrder {
  id: string;
  orderNumber: string;
  cancelDate: string;
  originalOrderDate: string;
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  refundAmount: number;
  refundStatus: "pending" | "processing" | "completed" | "failed";
  refundMethod: string;
  cancellationReason: string;
  refundDate?: string;
  estimatedRefundDate?: string;
}

interface CancellationsProps {
  cancellations: CancelledOrder[];
}

const mockCancellations: CancelledOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-005",
    cancelDate: "2024-01-21",
    originalOrderDate: "2024-01-20",
    items: [
      {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        image: "/images/placeholder.svg?height=80&width=80&text=Gamepad",
        price: 120,
        quantity: 2,
      },
      {
        id: 2,
        name: "RGB Gaming Mouse",
        image: "/images/placeholder.svg?height=80&width=80&text=Mouse",
        price: 45,
        quantity: 1,
      },
    ],
    totalAmount: 285,
    refundAmount: 285,
    refundStatus: "completed",
    refundMethod: "Original Payment Method (Visa ****1234)",
    cancellationReason: "Changed mind about purchase",
    refundDate: "2024-01-23",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-006",
    cancelDate: "2024-01-19",
    originalOrderDate: "2024-01-18",
    items: [
      {
        id: 3,
        name: "IPS LCD Gaming Monitor",
        image: "/images/placeholder.svg?height=80&width=80&text=Monitor",
        price: 370,
        quantity: 1,
      },
    ],
    totalAmount: 370,
    refundAmount: 370,
    refundStatus: "processing",
    refundMethod: "Store Credit",
    cancellationReason: "Found better price elsewhere",
    estimatedRefundDate: "2024-01-25",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-007",
    cancelDate: "2024-01-17",
    originalOrderDate: "2024-01-16",
    items: [
      {
        id: 4,
        name: "Mechanical Keyboard RGB",
        image: "/images/placeholder.svg?height=80&width=80&text=Keyboard",
        price: 150,
        quantity: 1,
      },
      {
        id: 5,
        name: "Gaming Headset Pro",
        image: "/images/placeholder.svg?height=80&width=80&text=Headset",
        price: 89,
        quantity: 1,
      },
    ],
    totalAmount: 239,
    refundAmount: 239,
    refundStatus: "pending",
    refundMethod: "Bank Transfer",
    cancellationReason: "Delivery address change required",
    estimatedRefundDate: "2024-01-24",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-008",
    cancelDate: "2024-01-15",
    originalOrderDate: "2024-01-14",
    items: [
      {
        id: 6,
        name: "4K Webcam Ultra HD",
        image: "/images/placeholder.svg?height=80&width=80&text=Webcam",
        price: 199,
        quantity: 1,
      },
    ],
    totalAmount: 199,
    refundAmount: 0,
    refundStatus: "failed",
    refundMethod: "Original Payment Method",
    cancellationReason: "Order already shipped",
    refundDate: "N/A",
  },
];

export default function Cancellations({ cancellations = [] }: CancellationsProps) {
  const [cancellationsList] = useState<CancelledOrder[]>(mockCancellations);
  const [searchTerm, setSearchTerm] = useState("");

  const getRefundStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCancellations = cancellationsList.filter((cancellation) => {
    return (
      cancellation.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cancellation.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cancellation.cancellationReason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewDetails = (cancellationId: string) => {
    console.log("View cancellation details:", cancellationId);
    // Navigate to cancellation details page
  };

  const handleDownloadRefund = (cancellationId: string) => {
    console.log("Download refund receipt:", cancellationId);
    // Download refund receipt
  };

  const totalRefunded = cancellationsList
    .filter((c) => c.refundStatus === "completed")
    .reduce((sum, c) => sum + c.refundAmount, 0);

  const pendingRefunds = cancellationsList
    .filter((c) => c.refundStatus === "pending" || c.refundStatus === "processing")
    .reduce((sum, c) => sum + c.refundAmount, 0);

  return (
    <AccountLayout>
      <Head title="My Cancellations - Account" />

      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-red-500">My Cancellations</h1>
          <p className="text-gray-600">View your cancelled orders and refund status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">{cancellationsList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Refunded</p>
                  <p className="text-2xl font-bold text-green-600">৳{totalRefunded}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Refunds</p>
                  <p className="text-2xl font-bold text-yellow-600">৳{pendingRefunds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search cancellations by order number, product name, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Cancellations List */}
        {filteredCancellations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <X className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No cancellations found</h3>
              <p className="text-center text-gray-600">
                {searchTerm ? "No cancellations match your search criteria." : "You haven't cancelled any orders yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCancellations.map((cancellation) => (
              <Card key={cancellation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-lg">Order #{cancellation.orderNumber}</CardTitle>
                      <Badge
                        className={`${getRefundStatusColor(cancellation.refundStatus)} hover:${getRefundStatusColor(cancellation.refundStatus)}`}
                      >
                        <div className="flex items-center space-x-1">
                          {getRefundStatusIcon(cancellation.refundStatus)}
                          <span className="capitalize">Refund {cancellation.refundStatus}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Cancelled On</p>
                      <p className="font-semibold">{cancellation.cancelDate}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cancellation Info */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-600">Original Order Date</p>
                        <p className="font-medium">{cancellation.originalOrderDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cancellation Reason</p>
                        <p className="font-medium">{cancellation.cancellationReason}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Refund Method</p>
                        <p className="font-medium">{cancellation.refundMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {cancellation.refundStatus === "completed" ? "Refund Date" : "Expected Refund Date"}
                        </p>
                        <p className="font-medium">
                          {cancellation.refundDate || cancellation.estimatedRefundDate || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cancelled Items */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Cancelled Items</h4>
                    {cancellation.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={item.image || "/images/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">৳{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Amount Summary */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Total Order Amount</p>
                      <p className="text-lg font-semibold text-gray-900">৳{cancellation.totalAmount}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-gray-600">Refund Amount</p>
                      <p
                        className={`text-lg font-bold ${
                          cancellation.refundAmount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ৳{cancellation.refundAmount}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(cancellation.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cancellation.refundStatus === "completed" && (
                        <Button variant="outline" size="sm" onClick={() => handleDownloadRefund(cancellation.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Cancellation Policy Info */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">Cancellation Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-orange-800">
            <ul className="space-y-2 text-sm">
              <li>• Orders can be cancelled within 1 hour of placement</li>
              <li>• Once an order is shipped, it cannot be cancelled</li>
              <li>• Refunds are processed within 5-7 business days</li>
              <li>• Refund amount may vary based on payment method and processing fees</li>
              <li>• Digital products and gift cards are non-refundable</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}
