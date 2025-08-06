"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { Eye, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  slug: string;
}

interface RecommendedProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  slug: string;
}

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Gucci duffle bag",
    image: "/images/placeholder.svg?height=200&width=200&text=Gucci+Bag",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    slug: "gucci-duffle-bag",
  },
  {
    id: 2,
    name: "RGB liquid CPU Cooler",
    image: "/images/placeholder.svg?height=200&width=200&text=CPU+Cooler",
    currentPrice: 1960,
    slug: "rgb-liquid-cpu-cooler",
  },
  {
    id: 3,
    name: "GP11 Shooter USB Gamepad",
    image: "/images/placeholder.svg?height=200&width=200&text=USB+Gamepad",
    currentPrice: 550,
    slug: "gp11-shooter-usb-gamepad",
  },
  {
    id: 4,
    name: "Quilted Satin Jacket",
    image: "/images/placeholder.svg?height=200&width=200&text=Satin+Jacket",
    currentPrice: 750,
    slug: "quilted-satin-jacket",
  },
];

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 5,
    name: "ASUS FHD Gaming Laptop",
    image: "/images/placeholder.svg?height=200&width=200&text=Gaming+Laptop",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    slug: "asus-fhd-gaming-laptop",
  },
  {
    id: 6,
    name: "IPS LCD Gaming Monitor",
    image: "/images/placeholder.svg?height=200&width=200&text=Gaming+Monitor",
    currentPrice: 1160,
    slug: "ips-lcd-gaming-monitor",
  },
  {
    id: 7,
    name: "HAVIT HV-G92 Gamepad",
    image: "/images/placeholder.svg?height=200&width=200&text=Gamepad",
    currentPrice: 560,
    isNew: true,
    slug: "havit-hv-g92-gamepad",
  },
  {
    id: 8,
    name: "AK-900 Wired Keyboard",
    image: "/images/placeholder.svg?height=200&width=200&text=Keyboard",
    currentPrice: 200,
    slug: "ak-900-wired-keyboard",
  },
];

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (itemId: number) => void;
  onAddToCart: (itemId: number) => void;
}

function WishlistCard({ item, onRemove, onAddToCart }: WishlistCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        {item.discount && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-500">-{item.discount}%</Badge>
        )}

        {/* Remove Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Product Image */}
        <img src={item.image || "/images/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="mt-0 w-full rounded-none bg-black py-3 text-white hover:bg-gray-800"
        onClick={() => onAddToCart(item.id)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add To Cart
      </Button>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 font-medium text-gray-900">{item.name}</h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-red-500">${item.currentPrice}</span>
          {item.originalPrice && <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>}
        </div>
      </div>
    </div>
  );
}

interface RecommendedCardProps {
  product: RecommendedProduct;
  onAddToCart: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

function RecommendedCard({ product, onAddToCart, onQuickView }: RecommendedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        {product.discount && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-500">
            -{product.discount}%
          </Badge>
        )}

        {/* NEW Badge */}
        {product.isNew && (
          <Badge className="absolute top-3 left-3 z-10 bg-green-500 text-white hover:bg-green-500">NEW</Badge>
        )}

        {/* Quick View Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
          onClick={() => onQuickView(product.id)}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Product Image */}
        <img
          src={product.image || "/images/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Add to Cart Button - Shows on Hover */}
        <div
          className={`absolute right-0 bottom-0 left-0 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Button
            size="lg"
            className="w-full rounded-none bg-black py-3 text-white hover:bg-gray-800"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 font-medium text-gray-900">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-red-500">${product.currentPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(wishlistItems);

  const handleRemoveFromWishlist = (itemId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId));
    console.log("Remove from wishlist:", itemId);
  };

  const handleAddToCart = (itemId: number) => {
    console.log("Add to cart:", itemId);
    // Handle add to cart logic
  };

  const handleMoveAllToBag = () => {
    console.log("Move all items to bag");
    // Handle move all to cart logic
  };

  const handleQuickView = (productId: number) => {
    console.log("Quick view:", productId);
    // Handle quick view logic
  };

  const handleSeeAllRecommended = () => {
    console.log("See all recommended products");
    // Handle navigation to all products
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Wishlist - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="mx-auto mb-30 max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Wishlist Section */}
          <div className="mb-16">
            {/* Wishlist Header */}
            <div className="mb-10 flex items-center justify-between">
              <h1 className="text-2xl font-medium text-gray-900">Wishlist ({wishlist.length})</h1>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                onClick={handleMoveAllToBag}
              >
                Move All To Bag
              </Button>
            </div>

            {/* Wishlist Items Grid */}
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {wishlist.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">Your wishlist is empty</p>
                <Button className="mt-4 bg-red-500 text-white hover:bg-red-600" asChild>
                  <a href="/">Continue Shopping</a>
                </Button>
              </div>
            )}
          </div>

          {/* Just For You Section */}
          <div>
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-5 rounded bg-red-500"></div>
                <h2 className="text-2xl font-medium text-gray-900">Just For You</h2>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 px-12 py-2 text-gray-700 hover:bg-gray-50"
                onClick={handleSeeAllRecommended}
              >
                See All
              </Button>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedProducts.map((product) => (
                <RecommendedCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
