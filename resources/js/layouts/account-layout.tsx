"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link, usePage } from "@inertiajs/react";
import {
  Bell,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";

interface AccountLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { url } = usePage();
  const userName = "Md Rimel"; // This would come from props or auth context

  const menuSections: MenuSection[] = [
    {
      title: "Manage My Account",
      items: [
        {
          label: "My Profile",
          href: "/account/profile",
          icon: User,
          active: url === "/account/profile",
        },
        {
          label: "Address Book",
          href: "/account/addresses",
          icon: MapPin,
          active: url === "/account/addresses",
        },
        {
          label: "My Payment Options",
          href: "/account/payment-options",
          icon: CreditCard,
          active: url === "/account/payment-options",
        },
        {
          label: "Account Settings",
          href: "/account/settings",
          icon: Settings,
          active: url === "/account/settings",
        },
        {
          label: "Privacy & Security",
          href: "/account/privacy",
          icon: Shield,
          active: url === "/account/privacy",
        },
        {
          label: "Notifications",
          href: "/account/notifications",
          icon: Bell,
          active: url === "/account/notifications",
        },
      ],
    },
    {
      title: "My Orders",
      items: [
        {
          label: "My Orders",
          href: "/account/orders",
          icon: Package,
          active: url === "/account/orders",
        },
        {
          label: "My Returns",
          href: "/account/returns",
          icon: RotateCcw,
          active: url === "/account/returns",
        },
        {
          label: "My Cancellations",
          href: "/account/cancellations",
          icon: X,
          active: url === "/account/cancellations",
        },
      ],
    },
    {
      title: "My Lists",
      items: [
        {
          label: "My Wishlist",
          href: "/account/wishlists",
          icon: Heart,
          active: url === "/account/wishlists",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          label: "Help Center",
          href: "/account/help-center",
          icon: HelpCircle,
          active: url === "/account/help-center",
        },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Logout user");
    // Handle logout with Inertia
  };

  return (
    <div className="flex h-screen flex-col overflow-y-hidden bg-white">
      <Header />

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome Message */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            </div>
            <div className="text-gray-600">
              Welcome! <span className="font-semibold text-red-500">{userName}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {menuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="mb-3 font-semibold text-gray-900">{section.title}</h3>
                    <nav className="space-y-1">
                      {section.items.map((item, itemIndex) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            preserveScroll
                            key={itemIndex}
                            href={item.href}
                            className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm transition-colors ${
                              item.active
                                ? "bg-red-50 font-medium text-red-500"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </nav>
                    {sectionIndex < menuSections.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}

                {/* Logout Button */}
                <div className="pt-4">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-800"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 flex flex-col">
              <ScrollArea className="flex-1" width={2.5}>
                <div className="bg-white p-1">{children}</div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
