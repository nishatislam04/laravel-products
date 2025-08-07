import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, router } from "@inertiajs/react";
import { Bell, Heart, LogOut, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";

interface HeaderProps {
  className?: string;
}

// ! add active nav link design
export default function Header({ className = "" }: HeaderProps) {
  const isAuthenticated = true;
  const handleManageAccount = () => {
    console.log("Navigate to manage account");
    // Handle navigation to account management page
    router.visit("/account/settings");
  };

  const handleMyOrders = () => {
    console.log("Navigate to my orders");
    // Handle navigation to orders page
    router.visit("/account/orders");
  };

  const handleMyCancellations = () => {
    console.log("Navigate to my cancellations");
    // Handle navigation to cancellations page
    router.visit("/account/cancellations");
  };

  const handleMyReviews = () => {
    console.log("Navigate to my reviews");
    // Handle navigation to reviews page
    router.visit("/account/reviews");
  };

  const handleLogout = () => {
    console.log("Logout user");
    // setIsAuthenticated(false);
    // Handle logout logic
  };
  return (
    <header className={`mx-20 border-b-2 border-gray-200 bg-white pt-4 ${className}`}>
      <div className="max-w-8xl mx-auto">
        <div className="flex h-16 w-full items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-black transition-colors hover:text-gray-700">
              Exclusive
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden w-full items-center space-x-8 pl-35 md:flex">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
            >
              About
            </Link>
            <Link
              href="/signup"
              className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
            >
              Sign Up
            </Link>
          </nav>

          {/* Search Bar and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="What are you looking for?"
                className="w-64 rounded-sm bg-gray-100 py-2 pr-4 pl-2 text-sm focus:border-transparent focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Action Icons */}
            <div className="ml-auto flex items-center space-x-2">
              {/* Wishlist/Heart Icon with Badge */}
              <Button
                variant="ghost"
                size="icon"
                className="relative mt-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {/* Wishlist Badge */}
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    4
                  </span>
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              {/* Shopping Cart Icon with Badge */}
              <Button
                variant="ghost"
                size="icon"
                className="relative mt-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {/* Cart Badge */}
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    2
                  </span>
                  <span className="sr-only">Shopping Cart</span>
                </Link>
              </Button>

              {/* Profile Avatar with Dropdown - Only show if authenticated */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/images/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="bg-red-500 text-sm font-medium text-white">U</AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Profile Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="mt-2 w-56 space-y-1.5 py-2">
                    <DropdownMenuItem onClick={handleManageAccount} className="cursor-pointer">
                      <User className="mr-3 h-4 w-4" />
                      <span>Manage My Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMyReviews} className="cursor-pointer">
                      <Bell className="mr-3 h-4 w-4" />
                      <span>My Notifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMyOrders} className="cursor-pointer">
                      <ShoppingBag className="mr-3 h-4 w-4" />
                      <span>My Order</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMyCancellations} className="cursor-pointer">
                      <X className="mr-3 h-4 w-4" />
                      <span>My Cancellations</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="What are you looking for?"
            className="w-full rounded-md border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </header>
  );
}
