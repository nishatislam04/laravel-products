"use client";

import { Button } from "@/components/ui/button";

interface ArrivalItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  link: string;
  size: "large" | "medium";
}

const arrivalItems: ArrivalItem[] = [
  {
    id: 1,
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    buttonText: "Shop Now",
    image: "/images/placeholder.svg",
    link: "/playstation-5",
    size: "large",
  },
  {
    id: 2,
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    buttonText: "Shop Now",
    image: "/images/placeholder.svg",
    link: "/womens-collections",
    size: "medium",
  },
  {
    id: 3,
    title: "Speakers",
    description: "Amazon wireless speakers",
    buttonText: "Shop Now",
    image: "/images/placeholder.svg",
    link: "/speakers",
    size: "medium",
  },
  {
    id: 4,
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    buttonText: "Shop Now",
    image: "/images/placeholder.svg",
    link: "/perfume",
    size: "medium",
  },
];

interface ArrivalCardProps {
  item: ArrivalItem;
  onClick: (link: string) => void;
  className?: string;
}

function ArrivalCard({ item, onClick, className = "" }: ArrivalCardProps) {
  const handleClick = () => {
    onClick(item.link);
  };

  const handleShopNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(item.link);
  };

  return (
    <div
      className={`group relative h-full cursor-pointer overflow-hidden rounded-lg ${className}`}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log("Image failed to load:", item.image);
            // Fallback to a solid color background if image fails
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Dark Overlay for text readability */}
        <div className="bg-opacity-40 group-hover:bg-opacity-50 absolute inset-0 bg-black transition-all duration-300"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
        <div className="space-y-3 text-white">
          <h3 className="text-2xl leading-tight font-bold lg:text-3xl">{item.title}</h3>
          <p className="max-w-xs text-sm leading-relaxed text-gray-200 lg:text-base">{item.description}</p>
          <Button
            variant="ghost"
            className="group/button h-auto p-0 text-base font-medium text-white hover:bg-white/10 hover:text-gray-200"
            onClick={handleShopNow}
          >
            <span className="border-b border-white pb-1 transition-colors group-hover/button:border-gray-200">
              {item.buttonText}
            </span>
          </Button>
        </div>
      </div>

      {/* Fallback background if image doesn't load */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800 to-gray-900"></div>
    </div>
  );
}

interface NewArrivalProps {
  className?: string;
  onItemClick?: (link: string) => void;
}

export default function NewArrival({ className = "", onItemClick }: NewArrivalProps) {
  const handleItemClick = (link: string) => {
    if (onItemClick) {
      onItemClick(link);
    } else {
      console.log(`Navigate to: ${link}`);
      // In a real app: window.location.href = link
    }
  };

  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center space-x-4">
          {/* Featured Indicator */}
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <span className="font-semibold text-red-500">Featured</span>
        </div>

        <h2 className="mb-12 text-3xl font-bold text-gray-900">New Arrival</h2>

        {/* Grid Layout - Fixed */}
        <div className="grid h-[800px] grid-cols-1 gap-6 md:h-[600px] md:grid-cols-4">
          {/* PlayStation 5 - Large Card (spans 2 columns and 2 rows) */}
          <div className="h-full md:col-span-2 md:row-span-2">
            <ArrivalCard item={arrivalItems[0]} onClick={handleItemClick} className="min-h-[300px] md:min-h-full" />
          </div>

          {/* Women's Collections - Top Right */}
          <div className="h-full md:col-span-2 md:row-span-1">
            <ArrivalCard item={arrivalItems[1]} onClick={handleItemClick} className="min-h-[250px] md:min-h-full" />
          </div>

          {/* Speakers - Bottom Left */}
          <div className="h-full md:col-span-1 md:row-span-1">
            <ArrivalCard item={arrivalItems[2]} onClick={handleItemClick} className="min-h-[250px] md:min-h-full" />
          </div>

          {/* Perfume - Bottom Right */}
          <div className="h-full md:col-span-1 md:row-span-1">
            <ArrivalCard item={arrivalItems[3]} onClick={handleItemClick} className="min-h-[250px] md:min-h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
