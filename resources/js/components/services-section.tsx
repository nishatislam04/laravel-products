"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, Headphones, Shield, Truck } from "lucide-react";

interface Service {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: Shield,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon;

  return (
    <div className="group flex flex-col items-center text-center">
      {/* Icon Container */}
      <div className="relative mb-6">
        {/* Outer gray circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
          {/* Inner black circle */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-gray-800">
            <IconComponent className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold tracking-wide text-gray-900">{service.title}</h3>
        <p className="max-w-xs text-sm text-gray-600">{service.description}</p>
      </div>
    </div>
  );
}

interface ServicesSectionProps {
  className?: string;
  showBackToTop?: boolean;
  onBackToTop?: () => void;
}

export default function ServicesSection({ className = "", showBackToTop = true, onBackToTop }: ServicesSectionProps) {
  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className={`relative bg-gray-50 py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="absolute right-8 bottom-8">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-gray-300 bg-white shadow-lg hover:bg-gray-100"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      )}
    </section>
  );
}
