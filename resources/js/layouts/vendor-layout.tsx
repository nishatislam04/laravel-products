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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Head, Link, router, usePage } from "@inertiajs/react";
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

  return (
    <>
      <Head title={title} />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="space-x-2" size="lg" asChild>
                  <Link className="space-x-2" href={route("vendor-admin.overview.page")}>
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
              <SidebarGroupLabel className="mt-3 pl-4">Vendor Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2 pl-4">
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
                      <span>{auth.user.name}</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="mt-auto">
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
                    <DropdownMenuItem onClick={() => router.post(route("signout"))}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex h-screen flex-col overflow-y-hidden">
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

          <ScrollArea className="flex-1 overflow-y-auto p-6" width={2.5}>
            {children}
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
