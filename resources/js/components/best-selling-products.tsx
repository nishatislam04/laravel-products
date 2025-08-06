"use client";

import { Button } from "@/components/ui/button";
import { Eye, Heart, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isWishlisted?: boolean;
  slug: string;
}

const bestSellingProducts: Product[] = [
  {
    id: 1,
    name: "The north coat",
    image: "/images/placeholder.svg?height=250&width=250&text=North+Coat",
    currentPrice: 260,
    originalPrice: 360,
    rating: 5.0,
    reviewCount: 65,
    slug: "the-north-coat",
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    image: "/images/placeholder.svg?height=250&width=250&text=Gucci+Bag",
    currentPrice: 960,
    originalPrice: 1160,
    rating: 5.0,
    reviewCount: 65,
    slug: "gucci-duffle-bag",
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    image: "/images/placeholder.svg?height=250&width=250&text=CPU+Cooler",
    currentPrice: 160,
    originalPrice: 170,
    rating: 5.0,
    reviewCount: 65,
    slug: "rgb-liquid-cpu-cooler",
  },
  {
    id: 4,
    name: "Small BookShelf",
    image: "/images/placeholder.svg?height=250&width=250&text=BookShelf",
    currentPrice: 360,
    rating: 5.0,
    reviewCount: 65,
    slug: "small-bookshelf",
  },
];

interface ProductCardProps {
  product: Product;
  onAddToWishlist: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

function ProductCard({ product, onAddToWishlist, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const handleProductClick = () => {
    // This would navigate to single product view
    console.log(`Navigate to product: /product/${product.slug}`);
    // In a real app, you would use:
    // window.location.href = `/product/${product.slug}`
    // or with Inertia: Inertia.visit(`/product/${product.slug}`)
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id);
            }}
          >
            <Heart className={`h-4 w-4 ${product.isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product.id);
            }}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Product Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div
          className={`bg-opacity-0 group-hover:bg-opacity-10 absolute inset-0 bg-black transition-all duration-300`}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 font-medium text-gray-900 transition-colors group-hover:text-red-600">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-2 flex items-center space-x-2">
          <span className="font-semibold text-red-500">${product.currentPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}

interface BestSellingProductsProps {
  className?: string;
  onViewAll?: () => void;
}

export default function BestSellingProducts({ className = "", onViewAll }: BestSellingProductsProps) {
  const handleAddToWishlist = (productId: number) => {
    console.log("Add to wishlist:", productId);
    // Handle wishlist logic
  };

  const handleQuickView = (productId: number) => {
    console.log("Quick view:", productId);
    // Handle quick view logic
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      console.log("Navigate to all best selling products");
      // In a real app: window.location.href = '/products/best-selling'
    }
  };

  return (
    <section className={`mx-18 bg-white py-16 ${className}`}>
      {/* Header */}
      <div className="mb-12 flex flex-col items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* This Month Indicator */}
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <span className="font-semibold text-red-500">This Month</span>
        </div>

        <div className="mt-6 flex w-full flex-1 items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>

          {/* View All Button */}
          <Button
            size="lg"
            className="ml-auto rounded-md bg-red-500 px-12 py-2 text-white hover:bg-red-600"
            onClick={handleViewAll}
          >
            View All
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bestSellingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToWishlist={handleAddToWishlist}
            onQuickView={handleQuickView}
          />
        ))}
      </div>
    </section>
  );
}
