"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Eye, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  isWishlisted?: boolean;
}

const flashSaleProducts: Product[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: "/images/placeholder.svg?height=200&width=200&text=Gamepad",
    currentPrice: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviewCount: 88,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image: "/images/placeholder.svg?height=200&width=200&text=Keyboard",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4.0,
    reviewCount: 75,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image: "/images/placeholder.svg?height=200&width=200&text=Monitor",
    currentPrice: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5.0,
    reviewCount: 99,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    image: "/images/placeholder.svg?height=200&width=200&text=Chair",
    currentPrice: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviewCount: 99,
  },
  {
    id: 5,
    name: "RGB Gaming Headset",
    image: "/images/placeholder.svg?height=200&width=200&text=Headset",
    currentPrice: 89,
    originalPrice: 120,
    discount: 25,
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: 6,
    name: "Wireless Mouse Pro",
    image: "/images/placeholder.svg?height=200&width=200&text=Mouse",
    currentPrice: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.3,
    reviewCount: 203,
  },
  {
    id: 7,
    name: "Mechanical Keyboard RGB",
    image: "/images/placeholder.svg?height=200&width=200&text=RGB+Keyboard",
    currentPrice: 150,
    originalPrice: 200,
    discount: 25,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: 8,
    name: "4K Webcam Ultra HD",
    image: "/images/placeholder.svg?height=200&width=200&text=Webcam",
    currentPrice: 199,
    originalPrice: 250,
    discount: 20,
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: 9,
    name: "Bluetooth Speaker Pro",
    image: "/images/placeholder.svg?height=200&width=200&text=Speaker",
    currentPrice: 79,
    originalPrice: 100,
    discount: 21,
    rating: 4.1,
    reviewCount: 134,
  },
  {
    id: 10,
    name: "Gaming Desk Setup",
    image: "/images/placeholder.svg?height=200&width=200&text=Desk",
    currentPrice: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    reviewCount: 45,
  },
];

interface CountdownTimerProps {
  targetDate: Date;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <div className="mb-1 text-base font-semibold">Days</div>
        <div className="text-3xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="mb-1 text-base font-semibold">Hours</div>
        <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="mb-1 text-base font-semibold">Minutes</div>
        <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
      </div>
      <div className="text-2xl font-bold text-red-500">:</div>
      <div className="text-center">
        <div className="mb-1 text-base font-semibold">Seconds</div>
        <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
      </div>
    </div>
  );
}

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

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-500">
          -{product.discount}%
        </Badge>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart className={`h-4 w-4 ${product.isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
            onClick={() => onQuickView(product.id)}
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
            onClick={() => onAddToCart(product.id)}
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
          <span className="font-semibold text-red-500">${product.currentPrice}</span>
          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
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

interface FlashSalesProps {
  className?: string;
}

export default function FlashSales({ className = "" }: FlashSalesProps) {
  const [api, setApi] = useState<CarouselApi>();

  // Set flash sale end date (3 days, 23 hours, 19 minutes, 56 seconds from now)
  const flashSaleEndDate = new Date();
  flashSaleEndDate.setDate(flashSaleEndDate.getDate() + 3);
  flashSaleEndDate.setHours(flashSaleEndDate.getHours() + 23);
  flashSaleEndDate.setMinutes(flashSaleEndDate.getMinutes() + 19);
  flashSaleEndDate.setSeconds(flashSaleEndDate.getSeconds() + 56);

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

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex w-1/2 flex-col space-x-8">
            {/* Today's Indicator */}
            <div className="flex items-center space-x-4">
              <div className="h-10 w-5 rounded bg-red-500"></div>
              <span className="font-semibold text-red-500">{"Today's"}</span>
            </div>

            {/* Title and Countdown */}
            <div className="mt-8 flex items-center space-x-8">
              <h2 className="text-4xl font-bold text-gray-900">Flash Sales</h2>
              <div className="ml-auto">
                <CountdownTimer targetDate={flashSaleEndDate} />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            slidesToScroll: 1,
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {flashSaleProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={handleQuickView}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* View All Products Button */}
        <div className="mt-12 flex justify-center">
          <Button size="lg" className="rounded-md bg-red-500 px-12 py-4 text-lg text-white hover:bg-red-600">
            View All Products
          </Button>
        </div>
        {/* Bottom Border Line */}
        <div className="mt-16 border-b border-gray-200"></div>
      </div>
    </section>
  );
}
