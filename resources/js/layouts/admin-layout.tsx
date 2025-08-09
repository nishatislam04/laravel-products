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
import { Head, Link, router } from "@inertiajs/react";
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
                  <Link href={route("super-admin.overview.page")}>
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

          <SidebarFooter className="mt-5 -ml-1">
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
                    <DropdownMenuItem onClick={() => router.post(route("signout"))}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex h-screen flex-col overflow-y-hidden">
          <header className="flex h-15 w-full shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex w-full items-center justify-end gap-2">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products, orders..." className="pl-8" />
              </div>
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
