import AdminHeader from "@/components/layouts/admin-header";
import SidebarLayout from "@/components/layouts/sidebar-layout";
import { NavigationItem, SidebarBrand, UserInfo } from "@/components/layouts/sidebar-navigation";
import {
  BarChart3,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Overview",
    url: route("super-admin.overview.page"),
    icon: BarChart3,
  },
  {
    title: "Manage Vendors",
    url: route("super-admin.vendors.page"),
    icon: Store,
  },
  {
    title: "Manage Users",
    url: route("super-admin.users.page"),
    icon: Users,
  },
  {
    title: "Orders",
    url: route("super-admin.orders.page"),
    icon: ShoppingCart,
    badge: "12",
  },
  {
    title: "Categories",
    url: route("super-admin.categories.page"),
    icon: Tag,
  },
  {
    title: "Products",
    url: route("super-admin.products.page"),
    icon: Package,
  },
  {
    title: "Marketing",
    url: route("super-admin.marketing.page"),
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    url: route("super-admin.analytics.page"),
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: route("super-admin.settings.page"),
    icon: Settings,
  },
];

const brand: SidebarBrand = {
  name: "ECommerce",
  subtitle: "Super Admin",
  icon: Store,
  href: route("super-admin.overview.page"),
};

const user: UserInfo = {
  name: "Super Admin",
  fallback: "SA",
};

export default function AdminLayout({ children, title = "Admin Panel" }: AdminLayoutProps) {
  const header = (
    <AdminHeader 
      searchPlaceholder="Search products, orders..."
      showNotifications={true}
    />
  );

  return (
    <SidebarLayout
      title={title}
      brand={brand}
      navigationItems={navigationItems}
      groupLabel="Main Navigation"
      user={user}
      header={header}
    >
      {children}
    </SidebarLayout>
  );
}
