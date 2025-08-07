"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import { Eye, Grid, Heart, List, Search, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useState } from "react";

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  availability: "in-stock" | "out-of-stock" | "limited";
  category: string;
  addedDate: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
  slug: string;
}

interface AccountWishlistProps {
  wishlistItems: WishlistItem[];
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: "/images/placeholder.svg?height=200&width=200&text=Gamepad",
    currentPrice: 120,
    originalPrice: 160,
    discount: 25,
    rating: 4.5,
    reviewCount: 88,
    availability: "in-stock",
    category: "Gaming",
    addedDate: "2024-01-20",
    priceHistory: [
      { date: "2024-01-15", price: 160 },
      { date: "2024-01-18", price: 140 },
      { date: "2024-01-20", price: 120 },
    ],
    slug: "havit-hv-g92-gamepad",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image: "/images/placeholder.svg?height=200&width=200&text=Keyboard",
    currentPrice: 960,
    originalPrice: 1160,
    discount: 17,
    rating: 4.0,
    reviewCount: 75,
    availability: "limited",
    category: "Accessories",
    addedDate: "2024-01-18",
    priceHistory: [
      { date: "2024-01-10", price: 1160 },
      { date: "2024-01-15", price: 1000 },
      { date: "2024-01-18", price: 960 },
    ],
    slug: "ak-900-wired-keyboard",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image: "/images/placeholder.svg?height=200&width=200&text=Monitor",
    currentPrice: 370,
    originalPrice: 400,
    discount: 8,
    rating: 5.0,
    reviewCount: 99,
    availability: "in-stock",
    category: "Electronics",
    addedDate: "2024-01-15",
    priceHistory: [
      { date: "2024-01-10", price: 400 },
      { date: "2024-01-15", price: 370 },
    ],
    slug: "ips-lcd-gaming-monitor",
  },
  {
    id: 4,
    name: "RGB Gaming Headset",
    image: "/images/placeholder.svg?height=200&width=200&text=Headset",
    currentPrice: 89,
    rating: 4.2,
    reviewCount: 156,
    availability: "out-of-stock",
    category: "Gaming",
    addedDate: "2024-01-12",
    priceHistory: [{ date: "2024-01-12", price: 89 }],
    slug: "rgb-gaming-headset",
  },
];

export default function AccountWishlist({ wishlistItems = [] }: AccountWishlistProps) {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "limited":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterBy === "all") return matchesSearch;
      if (filterBy === "on-sale") return matchesSearch && item.discount && item.discount > 0;
      if (filterBy === "price-drop") return matchesSearch && item.priceHistory.length > 1;
      return matchesSearch && item.availability === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "oldest":
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        case "price-low":
          return a.currentPrice - b.currentPrice;
        case "price-high":
          return b.currentPrice - a.currentPrice;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleRemoveItem = (itemId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleAddToCart = (itemId: number) => {
    console.log("Add to cart:", itemId);
    // Handle add to cart logic
  };

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const handleBulkAddToCart = () => {
    console.log("Bulk add to cart:", selectedItems);
    // Handle bulk add to cart
    setSelectedItems([]);
  };

  const handleBulkRemove = () => {
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleViewProduct = (slug: string) => {
    console.log("View product:", slug);
    // Navigate to product page
  };

  const WishlistItemCard = ({ item }: { item: WishlistItem }) => (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        {viewMode === "grid" ? (
          <>
            {/* Grid View */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              {item.discount && (
                <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-500">
                  -{item.discount}%
                </Badge>
              )}

              <Badge
                className={`absolute top-3 right-3 ${getAvailabilityColor(item.availability)} hover:${getAvailabilityColor(item.availability)} z-10 capitalize`}
              >
                {item.availability.replace("-", " ")}
              </Badge>

              <img
                src={item.image || "/images/placeholder.svg"}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="bg-opacity-0 group-hover:bg-opacity-10 absolute inset-0 bg-black transition-all duration-300" />
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="line-clamp-2 flex-1 font-medium text-gray-900">{item.name}</h3>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  className="ml-2"
                />
              </div>

              <div className="mb-2 flex items-center space-x-2">
                <span className="font-semibold text-red-500">৳{item.currentPrice}</span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">৳{item.originalPrice}</span>
                )}
              </div>

              <div className="mb-3 flex items-center space-x-1">
                <div className="flex items-center">{renderStars(item.rating)}</div>
                <span className="text-sm text-gray-500">({item.reviewCount})</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleAddToCart(item.id)}
                  disabled={item.availability === "out-of-stock"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item.availability === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewProduct(item.slug)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* List View */}
            <div className="flex items-center space-x-4 p-4">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
              />

              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {item.discount && (
                  <Badge className="absolute top-1 left-1 bg-red-500 text-xs text-white hover:bg-red-500">
                    -{item.discount}%
                  </Badge>
                )}
                <img
                  src={item.image || "/images/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="mb-1 font-medium text-gray-900">{item.name}</h3>
                <p className="mb-2 text-sm text-gray-600">Category: {item.category}</p>

                <div className="mb-2 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-red-500">৳{item.currentPrice}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">৳{item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">{renderStars(item.rating)}</div>
                    <span className="text-sm text-gray-500">({item.reviewCount})</span>
                  </div>

                  <Badge
                    className={`${getAvailabilityColor(item.availability)} hover:${getAvailabilityColor(item.availability)} capitalize`}
                  >
                    {item.availability.replace("-", " ")}
                  </Badge>
                </div>

                <p className="text-xs text-gray-500">Added on {item.addedDate}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleAddToCart(item.id)}
                  disabled={item.availability === "out-of-stock"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item.availability === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewProduct(item.slug)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AccountLayout>
      <Head title="My Wishlist - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">My Wishlist</h1>
            <p className="text-gray-600">Save items for later and track price changes</p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedItems.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkAddToCart}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart ({selectedItems.length})</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkRemove}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove ({selectedItems.length})</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search wishlist items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              <SelectItem value="limited">Limited Stock</SelectItem>
              <SelectItem value="on-sale">On Sale</SelectItem>
              <SelectItem value="price-drop">Price Dropped</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        {filteredAndSortedItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {searchTerm || filterBy !== "all" ? "No items found" : "Your wishlist is empty"}
              </h3>
              <p className="mb-4 text-center text-gray-600">
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search or filters."
                  : "Save items you love to buy them later."}
              </p>
              {!searchTerm && filterBy === "all" && (
                <Button className="bg-red-500 text-white hover:bg-red-600" asChild>
                  <a href="/">Start Shopping</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"
            }
          >
            {filteredAndSortedItems.map((item) => (
              <WishlistItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Wishlist Stats */}
        {items.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">Wishlist Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="font-semibold">Total Items</p>
                  <p>{items.length}</p>
                </div>
                <div>
                  <p className="font-semibold">Total Value</p>
                  <p>৳{items.reduce((sum, item) => sum + item.currentPrice, 0)}</p>
                </div>
                <div>
                  <p className="font-semibold">Items on Sale</p>
                  <p>{items.filter((item) => item.discount && item.discount > 0).length}</p>
                </div>
                <div>
                  <p className="font-semibold">Out of Stock</p>
                  <p>{items.filter((item) => item.availability === "out-of-stock").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  );
}
