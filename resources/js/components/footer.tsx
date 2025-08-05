"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";

interface FooterProps {
    className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Newsletter subscription");
    };

    return (
        <footer className={`bg-black text-white ${className}`}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Exclusive Section */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-4 text-2xl font-bold">Exclusive</h3>
                        <h4 className="mb-4 text-lg font-medium">Subscribe</h4>
                        <p className="mb-4 text-gray-300">Get 10% off your first order</p>

                        <form onSubmit={handleSubscribe} className="flex">
                            <div className="relative flex-1">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border-white bg-transparent pr-12 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
                                    required
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-1/2 right-1 -translate-y-1/2 text-white hover:bg-white/10 hover:text-gray-300"
                                >
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Support Section */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-6 text-lg font-medium">Support</h4>
                        <div className="space-y-3 text-gray-300">
                            <p className="leading-relaxed">
                                111 Bijoy sarani, Dhaka,
                                <br />
                                DH 1515, Bangladesh.
                            </p>
                            <p>exclusive@gmail.com</p>
                            <p>+88015-88888-9999</p>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-6 text-lg font-medium">Account</h4>
                        <nav className="space-y-3">
                            <Link href="/account" className="block text-gray-300 transition-colors hover:text-white">
                                My Account
                            </Link>
                            <Link href="/login" className="block text-gray-300 transition-colors hover:text-white">
                                Login / Register
                            </Link>
                            <Link href="/cart" className="block text-gray-300 transition-colors hover:text-white">
                                Cart
                            </Link>
                            <Link href="/wishlist" className="block text-gray-300 transition-colors hover:text-white">
                                Wishlist
                            </Link>
                            <Link href="/shop" className="block text-gray-300 transition-colors hover:text-white">
                                Shop
                            </Link>
                        </nav>
                    </div>

                    {/* Quick Link Section */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-6 text-lg font-medium">Quick Link</h4>
                        <nav className="space-y-3">
                            <Link href="/privacy-policy" className="block text-gray-300 transition-colors hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-use" className="block text-gray-300 transition-colors hover:text-white">
                                Terms Of Use
                            </Link>
                            <Link href="/faq" className="block text-gray-300 transition-colors hover:text-white">
                                FAQ
                            </Link>
                            <Link href="/contact" className="block text-gray-300 transition-colors hover:text-white">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Download App Section */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-6 text-lg font-medium">Our Socials</h4>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">© Copyright Rimel 2022. All right reserved</p>
                </div>
            </div>
        </footer>
    );
}
