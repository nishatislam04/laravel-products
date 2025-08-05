import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";
import { Heart, Search, ShoppingCart } from "lucide-react";

interface HeaderProps {
    className?: string;
}

// ! add active nav link design
export default function Header({ className = "" }: HeaderProps) {
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
                        <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700">
                            Home
                        </Link>
                        <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700">
                            Contact
                        </Link>
                        <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700">
                            About
                        </Link>
                        <Link href="/signup" className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-700">
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
                            {/* Wishlist/Heart Icon */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                                asChild
                            >
                                <Link href="/wishlist">
                                    <Heart className="h-5 w-5" />
                                    <span className="sr-only">Wishlist</span>
                                </Link>
                            </Button>

                            {/* Shopping Cart Icon */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
                                asChild
                            >
                                <Link href="/cart">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="sr-only">Shopping Cart</span>
                                </Link>
                            </Button>
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
