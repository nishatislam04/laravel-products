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
import { Head, Link } from "@inertiajs/react";
import {
  BarChart3,
  Bell,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navigationItems = [
  {
    title: "Overview",
    url: "/super-admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Manage Vendors",
    url: "/super-admin/vendors",
    icon: Store,
  },
  {
    title: "Manage Users",
    url: "/super-admin/users",
    icon: Users,
  },
  {
    title: "Orders",
    url: "/super-admin/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    title: "Categories",
    url: "/super-admin/categories",
    icon: Tag,
  },
  {
    title: "Products",
    url: "/super-admin/products",
    icon: Package,
  },
  {
    title: "Marketing",
    url: "/super-admin/marketing",
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    url: "/super-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/super-admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({ children, title = "Admin Panel" }: AdminLayoutProps) {
  return (
    <>
      <Head title={title} />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="space-x-2" size="lg" asChild>
                  <Link href="/super-admin/dashboard">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Store className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">ECommerce</span>
                      <span className="text-xs">Super Admin</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="mt-3 pl-2">Main Navigation</SidebarGroupLabel>
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

          <SidebarFooter className="mt-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="size-6">
                        <AvatarImage src="/images/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <span>Super Admin</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" className="mt-auto">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-15 w-full shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="ml-auto flex items-center gap-2">
              <div className="relative max-w-2xl self-end">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8" />
              </div>
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
