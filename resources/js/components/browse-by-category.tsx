"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import {
  Book,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Gamepad2,
  Headphones,
  Heart,
  Home,
  Monitor,
  Shirt,
  Smartphone,
  Watch,
} from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Phones",
    icon: Smartphone,
    slug: "phones",
  },
  {
    id: 2,
    name: "Computers",
    icon: Monitor,
    slug: "computers",
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: Watch,
    slug: "smartwatch",
  },
  {
    id: 4,
    name: "Camera",
    icon: Camera,
    slug: "camera",
  },
  {
    id: 5,
    name: "HeadPhones",
    icon: Headphones,
    slug: "headphones",
  },
  {
    id: 6,
    name: "Gaming",
    icon: Gamepad2,
    slug: "gaming",
  },
  {
    id: 7,
    name: "Automotive",
    icon: Car,
    slug: "automotive",
  },
  {
    id: 8,
    name: "Home & Garden",
    icon: Home,
    slug: "home-garden",
  },
  {
    id: 9,
    name: "Fashion",
    icon: Shirt,
    slug: "fashion",
  },
  {
    id: 10,
    name: "Books",
    icon: Book,
    slug: "books",
  },
  {
    id: 11,
    name: "Health & Beauty",
    icon: Heart,
    slug: "health-beauty",
  },
  {
    id: 12,
    name: "Sports & Outdoor",
    icon: Dumbbell,
    slug: "sports-outdoor",
  },
];

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  isHovered: boolean;
  onHover: (isHovered: boolean) => void;
  onClick: (categoryId: number) => void;
}

function CategoryCard({ category, isActive, isHovered, onHover, onClick }: CategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <div
      className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ease-in-out ${
        isActive
          ? "border-red-500 bg-red-500 text-white shadow-lg"
          : isHovered
            ? "-translate-y-1 transform border-red-200 bg-red-50 text-red-600 shadow-md"
            : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
      } `}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => onClick(category.id)}
    >
      <div className="flex h-32 flex-col items-center justify-center p-6">
        <IconComponent
          className={`mb-3 h-12 w-12 transition-all duration-300 ${
            isActive ? "text-white" : isHovered ? "text-red-500" : "text-gray-700"
          } `}
        />
        <span
          className={`text-center text-sm font-medium transition-all duration-300 ${
            isActive ? "text-white" : isHovered ? "text-red-600" : "text-gray-900"
          } `}
        >
          {category.name}
        </span>
      </div>

      {/* Active indicator */}
      {isActive && <div className="ring-opacity-50 absolute inset-0 rounded-lg ring-2 ring-red-300"></div>}
    </div>
  );
}

interface BrowseByCategoryProps {
  className?: string;
  onCategorySelect?: (categoryId: number, categorySlug: string) => void;
}

export default function BrowseByCategory({ className = "", onCategorySelect }: BrowseByCategoryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeCategory, setActiveCategory] = useState<number>(4); // Camera is active by default
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
    const category = categories.find((cat) => cat.id === categoryId);
    if (category && onCategorySelect) {
      onCategorySelect(categoryId, category.slug);
    }
  };

  const handleCategoryHover = (categoryId: number, isHovered: boolean) => {
    setHoveredCategory(isHovered ? categoryId : null);
  };

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between">
          <div className="flex items-center space-x-4">
            {/* Categories Indicator */}
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <span className="font-semibold text-red-500">Categories</span>
          </div>

          <div className="mt-6 flex w-full items-center justify-between space-x-8">
            <h2 className="text-4xl font-bold text-gray-900">Browse By Category</h2>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-gray-100"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-gray-100"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Carousel */}
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
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <CategoryCard
                  category={category}
                  isActive={activeCategory === category.id}
                  isHovered={hoveredCategory === category.id}
                  onHover={(isHovered) => handleCategoryHover(category.id, isHovered)}
                  onClick={handleCategoryClick}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Bottom Border Line */}
        <div className="mt-16 border-b border-gray-200"></div>
      </div>
    </section>
  );
}
