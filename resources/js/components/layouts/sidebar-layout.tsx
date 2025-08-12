import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Head } from "@inertiajs/react";
import React from "react";
import SidebarNavigation, { NavigationItem, SidebarBrand, UserInfo } from "./sidebar-navigation";

interface SidebarLayoutProps {
  children: React.ReactNode;
  title?: string;
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
  header?: React.ReactNode;
  scrollWidth?: number;
}

/**
 * Complete sidebar layout wrapper that combines sidebar navigation with content area
 * Used as base for admin and vendor layouts
 */
export default function SidebarLayout({
  children,
  title,
  brand,
  navigationItems,
  groupLabel,
  user,
  userMenuLabel,
  onSignOut,
  additionalUserMenuItems,
  header,
  scrollWidth = 2.5
}: SidebarLayoutProps) {
  return (
    <>
      {title && <Head title={title} />}
      <SidebarProvider>
        <SidebarNavigation
          brand={brand}
          navigationItems={navigationItems}
          groupLabel={groupLabel}
          user={user}
          userMenuLabel={userMenuLabel}
          onSignOut={onSignOut}
          additionalUserMenuItems={additionalUserMenuItems}
        />
        
        <SidebarInset className="flex h-screen flex-col overflow-y-hidden">
          {header}
          <ScrollArea className="flex-1 overflow-y-auto p-6" width={scrollWidth}>
            {children}
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
