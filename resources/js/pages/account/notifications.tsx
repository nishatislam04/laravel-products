"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Gift,
  Heart,
  BookMarkedIcon as MarkAsRead,
  Package,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  type: "order" | "wishlist" | "review" | "promotion" | "security" | "system";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Shipped",
    message: "Your order #ORD-2024-001 has been shipped and is on its way to you. Expected delivery: Jan 25, 2024",
    date: "2024-01-22T10:30:00Z",
    isRead: false,
    actionUrl: "/account/orders/ORD-2024-001",
    actionText: "Track Order",
  },
  {
    id: "2",
    type: "promotion",
    title: "Flash Sale Alert!",
    message: "Don't miss out! Up to 70% off on electronics. Sale ends in 6 hours.",
    date: "2024-01-22T08:15:00Z",
    isRead: false,
    actionUrl: "/flash-sale",
    actionText: "Shop Now",
  },
  {
    id: "3",
    type: "wishlist",
    title: "Price Drop Alert",
    message: "Great news! The HAVIT HV-G92 Gamepad in your wishlist is now 25% off.",
    date: "2024-01-21T16:45:00Z",
    isRead: true,
    actionUrl: "/product/havit-hv-g92-gamepad",
    actionText: "View Product",
  },
  {
    id: "4",
    type: "review",
    title: "Review Request",
    message: "How was your recent purchase? Share your experience and help other customers.",
    date: "2024-01-21T14:20:00Z",
    isRead: true,
    actionUrl: "/account/orders/ORD-2024-002/review",
    actionText: "Write Review",
  },
  {
    id: "5",
    type: "security",
    title: "New Login Detected",
    message:
      "We detected a new login to your account from Chrome on Windows. If this wasn't you, please secure your account.",
    date: "2024-01-20T22:10:00Z",
    isRead: true,
    actionUrl: "/account/privacy",
    actionText: "Review Security",
  },
  {
    id: "6",
    type: "order",
    title: "Order Delivered",
    message: "Your order #ORD-2024-003 has been delivered successfully. Thank you for shopping with us!",
    date: "2024-01-20T15:30:00Z",
    isRead: true,
    actionUrl: "/account/orders/ORD-2024-003",
    actionText: "View Order",
  },
  {
    id: "7",
    type: "system",
    title: "Account Settings Updated",
    message: "Your notification preferences have been updated successfully.",
    date: "2024-01-19T11:45:00Z",
    isRead: true,
  },
  {
    id: "8",
    type: "promotion",
    title: "Welcome Bonus",
    message: "Welcome to Exclusive! Here's a 10% discount code for your first purchase: WELCOME10",
    date: "2024-01-18T09:00:00Z",
    isRead: true,
    actionUrl: "/",
    actionText: "Start Shopping",
  },
];

export default function Notifications({ notifications = [] }: NotificationsProps) {
  const [notificationList, setNotificationList] = useState<Notification[]>(mockNotifications);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5 text-blue-600" />;
      case "wishlist":
        return <Heart className="h-5 w-5 text-red-600" />;
      case "review":
        return <Star className="h-5 w-5 text-yellow-600" />;
      case "promotion":
        return <Gift className="h-5 w-5 text-green-600" />;
      case "security":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case "system":
        return <CheckCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "wishlist":
        return "bg-red-100 text-red-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "promotion":
        return "bg-green-100 text-green-800";
      case "security":
        return "bg-orange-100 text-orange-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.type === activeTab;
  });

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  const notificationCounts = {
    all: notificationList.length,
    unread: unreadCount,
    order: notificationList.filter((n) => n.type === "order").length,
    promotion: notificationList.filter((n) => n.type === "promotion").length,
    security: notificationList.filter((n) => n.type === "security").length,
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== notificationId));
    setSelectedNotifications((prev) => prev.filter((id) => id !== notificationId));
  };

  const handleSelectNotification = (notificationId: string, checked: boolean) => {
    if (checked) {
      setSelectedNotifications((prev) => [...prev, notificationId]);
    } else {
      setSelectedNotifications((prev) => prev.filter((id) => id !== notificationId));
    }
  };

  const handleBulkDelete = () => {
    setNotificationList((prev) => prev.filter((notification) => !selectedNotifications.includes(notification.id)));
    setSelectedNotifications([]);
  };

  const handleBulkMarkAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        selectedNotifications.includes(notification.id) ? { ...notification, isRead: true } : notification,
      ),
    );
    setSelectedNotifications([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <AccountLayout>
      <Head title="Notifications - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">Notifications</h1>
            <p className="text-gray-600">Stay updated with your account activity</p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedNotifications.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkMarkAsRead}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark as Read ({selectedNotifications.length})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete ({selectedNotifications.length})</span>
                </Button>
              </>
            )}
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="flex items-center space-x-2">
                <MarkAsRead className="h-4 w-4" />
                <span>Mark All as Read</span>
              </Button>
            )}
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({notificationCounts.all})</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({notificationCounts.unread})
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-red-500 text-xs text-white hover:bg-red-500">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="order">Orders ({notificationCounts.order})</TabsTrigger>
            <TabsTrigger value="promotion">Offers ({notificationCounts.promotion})</TabsTrigger>
            <TabsTrigger value="security">Security ({notificationCounts.security})</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No notifications</h3>
                  <p className="text-center text-gray-600">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications in this category."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${!notification.isRead ? "border-blue-200 bg-blue-50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={(checked) => handleSelectNotification(notification.id, checked as boolean)}
                          className="mt-1"
                        />

                        <div className="mt-1 flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-1 flex items-center space-x-2">
                                <h4
                                  className={`font-medium ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                                >
                                  {notification.title}
                                </h4>
                                {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                                <Badge
                                  className={`${getNotificationTypeColor(notification.type)} hover:${getNotificationTypeColor(notification.type)} text-xs capitalize`}
                                >
                                  {notification.type}
                                </Badge>
                              </div>
                              <p className={`mb-2 text-sm ${!notification.isRead ? "text-gray-700" : "text-gray-600"}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">{formatDate(notification.date)}</p>
                            </div>

                            <div className="ml-4 flex items-center space-x-2">
                              {notification.actionUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <a href={notification.actionUrl}>{notification.actionText}</a>
                                </Button>
                              )}
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-gray-600 hover:text-gray-800"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
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
