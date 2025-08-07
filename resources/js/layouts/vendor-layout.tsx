import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Head, Link, router } from "@inertiajs/react";
import {
  BarChart3,
  Bell,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Star,
  User,
  Users,
} from "lucide-react";
import React from "react";

interface VendorLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navigationItems = [
  {
    title: "Overview",
    url: "/vendor-admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Add Staff",
    url: "/vendor-admin/staffs",
    icon: Users,
  },
  {
    title: "Product Management",
    url: "/vendor-admin/products",
    icon: Package,
    badge: "45",
  },
  {
    title: "Order Management",
    url: "/vendor-admin/orders",
    icon: ShoppingCart,
    badge: "8",
  },
  {
    title: "Refund Requests",
    url: "/vendor-admin/refunds",
    icon: RefreshCw,
    badge: "3",
  },
  {
    title: "Analytics",
    url: "/vendor-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Reviews & Ratings",
    url: "/vendor-admin/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    url: "/vendor-admin/settings",
    icon: Settings,
  },
];

export default function VendorLayout({ children, title = "Vendor Panel" }: VendorLayoutProps) {
  const handleLogout = () => {
    router.post(route("signout"));
  };

  return (
    <>
      <Head title={title} />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link className="space-x-2" href="/vendor-admin/dashboard">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Package className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">TechGear Store</span>
                      <span className="text-xs">Vendor Dashboard</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="mt-3 pl-2">Vendor Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2 pl-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="mt-5 -ml-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="size-6">
                        <AvatarImage src="/images/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>TG</AvatarFallback>
                      </Avatar>
                      <span>TechGear Solutions</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuLabel>My Store</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Store Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout()}>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="flex w-full items-center justify-end gap-2">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products, orders..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
