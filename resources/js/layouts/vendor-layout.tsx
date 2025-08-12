import AdminHeader from "@/components/layouts/admin-header";
import SidebarLayout from "@/components/layouts/sidebar-layout";
import { NavigationItem, SidebarBrand, UserInfo } from "@/components/layouts/sidebar-navigation";
import { usePage } from "@inertiajs/react";
import {
  BarChart3,
  Package,
  Plus,
  RefreshCw,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import React from "react";

interface VendorLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Overview",
    url: route("vendor-admin.overview.page"),
    icon: BarChart3,
  },
  {
    title: "Add Staff",
    url: route("vendor-admin.staffs.page"),
    icon: Users,
  },
  {
    title: "Product Management",
    url: route("vendor-admin.products.page"),
    icon: Package,
    badge: "45",
  },
  {
    title: "Order Management",
    url: route("vendor-admin.orders.page"),
    icon: ShoppingCart,
    badge: "8",
  },
  {
    title: "Refund Requests",
    url: route("vendor-admin.refunds.page"),
    icon: RefreshCw,
    badge: "3",
  },
  {
    title: "Analytics",
    url: route("vendor-admin.analytics.page"),
    icon: BarChart3,
  },
  {
    title: "Reviews & Ratings",
    url: route("vendor-admin.reviews.page"),
    icon: Star,
  },
  {
    title: "Settings",
    url: route("vendor-admin.settings.page"),
    icon: Settings,
  },
];

const brand: SidebarBrand = {
  name: "TechGear Store",
  subtitle: "Vendor Dashboard",
  icon: Package,
  href: route("vendor-admin.overview.page"),
};

type SessionProps = {
  auth: {
    user: {
      name: string;
      email: string;
      id: number;
      status: string;
    };
  };
};

export default function VendorLayout({ children, title = "Vendor Panel" }: VendorLayoutProps) {
  const { auth } = usePage<SessionProps>().props;

  const user: UserInfo = {
    name: auth.user.name,
    email: auth.user.email,
    fallback: "TG",
  };

  const header = (
    <AdminHeader 
      searchPlaceholder="Search products, orders..."
      showAddButton={true}
      addButtonText="Add Product"
      addButtonIcon={Plus}
      showNotifications={true}
    />
  );

  const additionalUserMenuItems = [
    {
      label: "Store Settings",
      icon: Settings,
      onClick: () => {}
    }
  ];

  return (
    <SidebarLayout
      title={title}
      brand={brand}
      navigationItems={navigationItems}
      groupLabel="Vendor Management"
      user={user}
      userMenuLabel="My Store"
      additionalUserMenuItems={additionalUserMenuItems}
      header={header}
    >
      {children}
    </SidebarLayout>
  );
}
