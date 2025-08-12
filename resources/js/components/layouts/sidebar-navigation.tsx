import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, router } from "@inertiajs/react";
import { Settings, User } from "lucide-react";
import React from "react";

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface SidebarBrand {
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export interface UserInfo {
  name: string;
  email?: string;
  avatar?: string;
  fallback: string;
}

interface SidebarNavigationProps {
  brand: SidebarBrand;
  navigationItems: NavigationItem[];
  groupLabel: string;
  user: UserInfo;
  userMenuLabel?: string;
  onSignOut?: () => void;
  additionalUserMenuItems?: Array<{
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
  }>;
}

/**
 * Reusable sidebar navigation component for admin and vendor layouts
 * Provides consistent navigation structure with branding, menu items, and user dropdown
 */
export default function SidebarNavigation({
  brand,
  navigationItems,
  groupLabel,
  user,
  userMenuLabel = "My Account",
  onSignOut,
  additionalUserMenuItems = []
}: SidebarNavigationProps) {
  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      router.post(route("signout"));
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="space-x-2" size="lg" asChild>
              <Link href={brand.href}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <brand.icon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{brand.name}</span>
                  <span className="text-xs">{brand.subtitle}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-3 pl-2">{groupLabel}</SidebarGroupLabel>
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
                    <AvatarImage src={user.avatar || "/images/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback>{user.fallback}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="mt-auto">
                <DropdownMenuLabel>{userMenuLabel}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                {additionalUserMenuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.onClick}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
