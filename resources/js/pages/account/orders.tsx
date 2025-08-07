"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { CheckCircle, Download, Eye, Package, Search, Truck, XCircle } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
}

interface OrdersProps {
  orders: Order[];
}

export default function Orders({ orders = [] }: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const handleViewOrder = (orderId: string) => {
    console.log("View order:", orderId);
    // Navigate to order details page
  };

  const handleTrackOrder = (trackingNumber: string) => {
    console.log("Track order:", trackingNumber);
    // Open tracking page
  };

  const handleDownloadInvoice = (orderId: string) => {
    console.log("Download invoice:", orderId);
    // Download invoice
  };

  return (
    <AccountLayout>
      <Head title="My Orders - Account" />

      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-red-500">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search orders by order number or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Order Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({orderCounts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({orderCounts.pending})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({orderCounts.processing})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({orderCounts.shipped})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({orderCounts.delivered})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({orderCounts.cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No orders found</h3>
                  <p className="text-center text-gray-600">
                    {searchTerm ? "No orders match your search criteria." : "You haven't placed any orders yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                          <Badge className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)}`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-semibold">{order.date}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">৳{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">Shipping Address</p>
                          <p className="text-sm font-medium">{order.shippingAddress}</p>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-600">
                              Tracking: <span className="font-medium">{order.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-red-500">৳{order.total}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.trackingNumber!)}>
                              <Truck className="mr-2 h-4 w-4" />
                              Track Order
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(order.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Invoice
                          </Button>
                          {order.status === "delivered" && (
                            <Button size="sm" className="bg-red-500 text-white hover:bg-red-600">
                              Buy Again
                            </Button>
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
      </div>
    </AccountLayout>
  );
}
