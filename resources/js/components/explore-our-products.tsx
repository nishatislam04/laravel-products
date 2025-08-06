"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  isWishlisted?: boolean;
  isNew?: boolean;
  slug: string;
}

const exploreProducts: Product[] = [
  {
    id: 1,
    name: "Breed Dry Dog Food",
    image: "/images/placeholder.svg?height=250&width=250&text=Dog+Food",
    price: 100,
    rating: 3.5,
    reviewCount: 35,
    slug: "breed-dry-dog-food",
  },
  {
    id: 2,
    name: "CANON EOS DSLR Camera",
    image: "/images/placeholder.svg?height=250&width=250&text=DSLR+Camera",
    price: 360,
    rating: 4.5,
    reviewCount: 95,
    slug: "canon-eos-dslr-camera",
  },
  {
    id: 3,
    name: "ASUS FHD Gaming Laptop",
    image: "/images/placeholder.svg?height=250&width=250&text=Gaming+Laptop",
    price: 700,
    rating: 5.0,
    reviewCount: 325,
    slug: "asus-fhd-gaming-laptop",
  },
  {
    id: 4,
    name: "Curology Product Set",
    image: "/images/placeholder.svg?height=250&width=250&text=Curology+Set",
    price: 500,
    rating: 4.0,
    reviewCount: 145,
    slug: "curology-product-set",
  },
  {
    id: 5,
    name: "Kids Electric Car",
    image: "/images/placeholder.svg?height=250&width=250&text=Electric+Car",
    price: 960,
    rating: 5.0,
    reviewCount: 65,
    isNew: true,
    slug: "kids-electric-car",
  },
  {
    id: 6,
    name: "Jr. Zoom Soccer Cleats",
    image: "/images/placeholder.svg?height=250&width=250&text=Soccer+Cleats",
    price: 1160,
    rating: 5.0,
    reviewCount: 35,
    slug: "jr-zoom-soccer-cleats",
  },
  {
    id: 7,
    name: "GP11 Shooter USB Gamepad",
    image: "/images/placeholder.svg?height=250&width=250&text=USB+Gamepad",
    price: 660,
    rating: 4.5,
    reviewCount: 55,
    isNew: true,
    slug: "gp11-shooter-usb-gamepad",
  },
  {
    id: 8,
    name: "Quilted Satin Jacket",
    image: "/images/placeholder.svg?height=250&width=250&text=Satin+Jacket",
    price: 660,
    rating: 4.5,
    reviewCount: 65,
    slug: "quilted-satin-jacket",
  },
];

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  onToggleWishlist: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

function ProductCard({ product, onAddToCart, onToggleWishlist, onQuickView }: ProductCardProps) {
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
        {/* NEW Badge */}
        {product.isNew && (
          <Badge className="absolute top-3 left-3 z-10 bg-green-500 text-white hover:bg-green-500">NEW</Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
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

        {/* Add to Cart Button - Shows on Hover */}
        <div
          className={`absolute right-0 bottom-0 left-0 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Button
            className="w-full rounded-none bg-black py-3 text-white hover:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">{product.name}</h3>

        {/* Price */}
        <div className="mb-2 flex items-center space-x-2">
          <span className="font-semibold text-red-500">${product.price}</span>
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

interface ExploreOurProductsProps {
  className?: string;
  onViewAll?: () => void;
}

export default function ExploreOurProducts({ className = "", onViewAll }: ExploreOurProductsProps) {
  const handleAddToCart = (productId: number) => {
    console.log("Add to cart:", productId);
    // Handle add to cart logic
  };

  const handleToggleWishlist = (productId: number) => {
    console.log("Toggle wishlist:", productId);
    // Handle wishlist toggle logic
  };

  const handleQuickView = (productId: number) => {
    console.log("Quick view:", productId);
    // Handle quick view logic
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      console.log("Navigate to all products");
      // In a real app: window.location.href = '/products'
    }
  };

  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between">
          <div className="flex items-center space-x-4">
            {/* Our Products Indicator */}
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <span className="font-semibold text-red-500">Our Products</span>
          </div>

          <div className="mt-6 flex flex-1 items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Explore Our Products</h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {exploreProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="rounded-md bg-red-500 px-12 py-3 text-white hover:bg-red-600"
            onClick={handleViewAll}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
