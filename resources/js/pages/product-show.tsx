"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Head } from "@inertiajs/react";
import {
  Heart,
  MapPin,
  Minus,
  Plus,
  Reply,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Store,
  ThumbsDown,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { useRef, useState } from "react";

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ColorOption {
  id: number;
  name: string;
  value: string;
  available: boolean;
}

interface SizeOption {
  id: number;
  name: string;
  value: string;
  available: boolean;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  replies?: ReviewReply[];
}

interface ReviewReply {
  id: number;
  userName: string;
  date: string;
  comment: string;
  isOwner: boolean;
}

interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  slug: string;
}

interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

const productImages: ProductImage[] = [
  {
    id: 1,
    url: "/images/placeholder.svg?height=400&width=400&text=Gamepad+Front",
    alt: "Gamepad Front View",
  },
  {
    id: 2,
    url: "/images/placeholder.svg?height=400&width=400&text=Gamepad+Side",
    alt: "Gamepad Side View",
  },
  {
    id: 3,
    url: "/images/placeholder.svg?height=400&width=400&text=Gamepad+Back",
    alt: "Gamepad Back View",
  },
  {
    id: 4,
    url: "/images/placeholder.svg?height=400&width=400&text=Gamepad+Top",
    alt: "Gamepad Top View",
  },
  {
    id: 5,
    url: "/images/placeholder.svg?height=400&width=400&text=Gamepad+Detail",
    alt: "Gamepad Detail View",
  },
];

const colorOptions: ColorOption[] = [
  { id: 1, name: "Black", value: "#000000", available: true },
  { id: 2, name: "Red", value: "#DC2626", available: true },
  { id: 3, name: "Blue", value: "#2563EB", available: false },
];

const sizeOptions: SizeOption[] = [
  { id: 1, name: "XS", value: "xs", available: true },
  { id: 2, name: "S", value: "s", available: true },
  { id: 3, name: "M", value: "m", available: true },
  { id: 4, name: "L", value: "l", available: true },
  { id: 5, name: "XL", value: "xl", available: false },
];

const ratingDistribution: RatingDistribution[] = [
  { stars: 5, count: 12, percentage: 60 },
  { stars: 4, count: 5, percentage: 25 },
  { stars: 3, count: 2, percentage: 10 },
  { stars: 2, count: 1, percentage: 5 },
  { stars: 1, count: 0, percentage: 0 },
];

const reviews: Review[] = [
  {
    id: 1,
    userName: "John Doe",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent gamepad! Very responsive and comfortable to use. Highly recommended for gaming enthusiasts.",
    helpful: 12,
    notHelpful: 1,
    replies: [
      {
        id: 1,
        userName: "Exclusive Store",
        date: "2024-01-16",
        comment: "Thank you for your positive feedback! We're glad you're enjoying the gamepad.",
        isOwner: true,
      },
    ],
  },
  {
    id: 2,
    userName: "Sarah Wilson",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Good quality product. The build feels solid and the buttons are very responsive. Only minor issue is the battery life could be better.",
    helpful: 8,
    notHelpful: 0,
  },
  {
    id: 3,
    userName: "Mike Johnson",
    rating: 5,
    date: "2024-01-05",
    comment: "Perfect for PlayStation gaming. Easy to connect and works flawlessly. Great value for money!",
    helpful: 15,
    notHelpful: 2,
  },
];

const relatedProducts: RelatedProduct[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: "/images/placeholder.svg?height=200&width=200&text=Red+Gamepad",
    currentPrice: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviewCount: 88,
    slug: "havit-hv-g92-gamepad-red",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image: "/images/placeholder.svg?height=200&width=200&text=RGB+Keyboard",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4.0,
    reviewCount: 75,
    slug: "ak-900-wired-keyboard",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image: "/images/placeholder.svg?height=200&width=200&text=Gaming+Monitor",
    currentPrice: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5.0,
    reviewCount: 99,
    slug: "ips-lcd-gaming-monitor",
  },
  {
    id: 4,
    name: "RGB Liquid CPU Cooler",
    image: "/images/placeholder.svg?height=200&width=200&text=CPU+Cooler",
    currentPrice: 160,
    originalPrice: 170,
    rating: 4.8,
    reviewCount: 65,
    slug: "rgb-liquid-cpu-cooler",
  },
];

interface ImageZoomProps {
  src: string;
  alt: string;
}

function ImageZoom({ src, alt }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="relative">
      <div
        ref={imageRef}
        className="relative h-96 cursor-crosshair overflow-hidden rounded-lg bg-gray-100"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src || "/images/placeholder.svg"}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-200"
        />

        {isZoomed && (
          <div
            className="pointer-events-none absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "200%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              opacity: 0.8,
            }}
          />
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: RelatedProduct;
}

function ProductCard({ product }: ProductCardProps) {
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
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.discount && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-500">
            -{product.discount}%
          </Badge>
        )}

        <img
          src={product.image || "/images/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute right-0 bottom-0 left-0 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Button className="w-full rounded-none bg-black py-3 text-white hover:bg-gray-800">Add To Cart</Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">{product.name}</h3>

        <div className="mb-2 flex items-center space-x-2">
          <span className="font-semibold text-red-500">৳{product.currentPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}

export default function Product() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const originalPrice = 250;
  const currentPrice = 192;
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleSubmitReview = () => {
    console.log("Submit review:", { rating: newRating, comment: newReview });
    setNewReview("");
    setNewRating(5);
  };

  const handleSubmitReply = (reviewId: number) => {
    console.log("Submit reply:", { reviewId, reply: replyText });
    setReplyText("");
    setReplyingTo(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Havic HV G-92 Gamepad",
        text: "Check out this amazing gamepad!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`h-4 w-4 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />,
      );
    }
    return stars;
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Havic HV G-92 Gamepad - Exclusive" />

      <Header />

      <main className="mt-6 flex-1 py-8">
        <div className="mx-18 max-w-full">
          {/* Product Section - 3 Columns */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column - Images (5 columns) */}
            <div className="lg:col-span-5">
              {/* Main Image with Zoom */}
              <div className="mb-4">
                <ImageZoom
                  src={productImages[selectedImageIndex].url || "/images/placeholder.svg"}
                  alt={productImages[selectedImageIndex].alt}
                />
              </div>

              {/* Thumbnail Images Below Main Image */}
              <div className="w-full">
                <Carousel className="w-full">
                  <CarouselContent className="my-2 -ml-2 px-2">
                    {productImages.map((image, index) => (
                      <CarouselItem key={image.id} className="basis-1/4 pl-2">
                        <button
                          onClick={() => setSelectedImageIndex(index)}
                          className={`h-20 w-full overflow-hidden rounded-lg border-2 bg-gray-100 transition-colors ${
                            selectedImageIndex === index
                              ? "outline-2 outline-offset-2 outline-red-500"
                              : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image.url || "/images/placeholder.svg"}
                            alt={image.alt}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>

            {/* Middle Column - Product Info (4 columns) */}
            <div className="space-y-6 lg:col-span-4">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Havic HV G-92 Gamepad</h1>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.round(averageRating))}
                    <span className="text-sm text-gray-500">({reviews.length} Reviews)</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm font-medium text-green-600">In Stock</span>
                </div>

                {/* Brand Section */}
                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Brand: </span>
                      <span className="font-semibold text-gray-900">HAVIT</span>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-800">
                      Learn more about this brand
                    </Button>
                  </div>
                </div>

                {/* Price Section with Wishlist and Share */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex flex-col items-center gap-4 space-x-3">
                    <span className="self-start text-3xl font-bold text-red-500">৳{currentPrice}</span>
                    <div className="flex items-center gap-1 space-x-2">
                      <span className="text-xl text-gray-400 line-through">৳{originalPrice}</span>
                      <Badge className="bg-red-100 p-1 text-red-800 hover:bg-red-100">-{discountPercentage}% OFF</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 self-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={handleShare}>
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">
                  PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free
                  install & mess free removal Pressure sensitive.
                </p>
              </div>

              <Separator />

              {/* Color Selection */}
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Colours:</h3>
                <div className="flex items-center space-x-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => color.available && setSelectedColor(color.id)}
                      disabled={!color.available}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        selectedColor === color.id
                          ? "scale-110 outline-2 outline-offset-2 outline-red-400"
                          : color.available
                            ? "border-gray-300 hover:border-gray-400"
                            : "cursor-not-allowed border-gray-200 opacity-50"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Size:</h3>
                <div className="flex items-center space-x-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => size.available && setSelectedSize(size.value)}
                      disabled={!size.available}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedSize === size.value
                          ? "border-red-500 bg-red-500 text-white outline-2 outline-offset-2 outline-red-500"
                          : size.available
                            ? "border-gray-300 text-gray-700 hover:border-gray-400"
                            : "cursor-not-allowed border-gray-200 text-gray-400"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center rounded-md border border-gray-300">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] px-4 py-2 text-center text-lg font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="bg-red-500 px-8 py-3 text-white hover:bg-red-600" onClick={handleAddToCart}>
                  Buy Now
                </Button>

                <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Column - Delivery & Warranty (3 columns) */}
            <div className="space-y-6 lg:col-span-3">
              {/* Delivery Options */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Delivery Options</h3>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                    <span className="text-xs text-gray-400">i</span>
                  </div>
                </div>

                <div className="space-y-7">
                  <div className="flex items-start space-x-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="mb-1 text-sm text-gray-900">Dhaka, Dhaka North, Banani Road No. 12 - 19</div>
                      <Button variant="link" className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800">
                        CHANGE
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Standard Delivery</div>
                      <div className="text-sm text-gray-600">Guaranteed by 9-13 Aug</div>
                    </div>
                    <div className="font-semibold text-gray-900">৳ 60</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-100">
                      <span className="text-xs font-bold">৳</span>
                    </div>
                    <div className="text-sm text-gray-900">Cash on Delivery Available</div>
                  </div>
                </div>
              </div>

              {/* Return & Warranty */}
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Return & Warranty</h3>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                    <span className="text-xs text-gray-400">i</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-gray-600" />
                    <div className="text-sm text-gray-900">7 Days Returns</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <div className="text-sm text-gray-900">Warranty not available</div>
                  </div>
                </div>
              </div>

              {/* Go to Store Button */}
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                <Store className="mr-2 h-4 w-4" />
                Go to Store
              </Button>
            </div>
          </div>

          {/* Product Details Section */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Product Details</h2>
            <div className="rounded-lg bg-gray-50 p-6">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-gray-700">High-quality vinyl construction with air channel adhesive</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-gray-700">Easy bubble-free installation and mess-free removal</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-gray-700">Pressure sensitive adhesive for secure attachment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-gray-700">Compatible with PlayStation 5 controllers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-gray-700">Durable and long-lasting material</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">{renderStars(Math.round(averageRating))}</div>
                <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
                <span className="text-gray-500">({totalReviews} reviews)</span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Rating Breakdown</h3>
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center space-x-3">
                      <div className="flex w-16 items-center space-x-1">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="w-12 text-sm text-gray-600">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Review */}
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Add Your Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                    <Select value={newRating.toString()} onValueChange={(value) => setNewRating(parseInt(value))}>
                      <SelectTrigger className="w-38">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            <div className="flex items-center space-x-1">{renderStars(rating)}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Your Review</label>
                    <Textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitReview}
                    className="bg-red-500 text-white hover:bg-red-600"
                    disabled={!newReview.trim()}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-gray-200 p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{review.userName}</span>
                        <div className="flex items-center">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-700">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                        <ThumbsDown className="h-4 w-4" />
                        <span>Not Helpful ({review.notHelpful})</span>
                      </button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Reply className="mr-1 h-4 w-4" />
                      Reply
                    </Button>
                  </div>

                  {/* Replies */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="mt-4 space-y-3 border-l-2 border-gray-200 pl-6">
                      {review.replies.map((reply) => (
                        <div key={reply.id} className="rounded-lg bg-gray-50 p-4">
                          <div className="mb-2 flex items-center space-x-2">
                            <span className={`font-semibold ${reply.isOwner ? "text-blue-600" : "text-gray-900"}`}>
                              {reply.userName}
                            </span>
                            {reply.isOwner && (
                              <Badge variant="secondary" className="text-xs">
                                Store Owner
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-700">{reply.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-4 border-l-2 border-gray-200 pl-6">
                      <div className="space-y-3">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="min-h-[80px]"
                        />
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(review.id)}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            disabled={!replyText.trim()}
                          >
                            Submit Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section className="my-20">
            <div className="mb-8 flex items-center space-x-4">
              <div className="h-10 w-5 rounded bg-red-500"></div>
              <h2 className="text-2xl font-bold text-gray-900">Related Item</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
