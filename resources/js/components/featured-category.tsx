"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

  const timeUnits = [
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center space-x-4">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <span className="text-lg font-bold text-black">{unit.value.toString().padStart(2, "0")}</span>
          </div>
          <span className="mt-2 text-sm font-medium text-white">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

interface FeaturedCategoryProps {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  productImage?: string;
  onBuyNow?: () => void;
}

export default function FeaturedCategory({
  className = "",
  title = "Enhance Your Music Experience",
  subtitle = "Categories",
  buttonText = "Buy Now!",
  productImage,
  onBuyNow,
}: FeaturedCategoryProps) {
  // Set countdown end date (23 hours, 5 days, 59 minutes, 35 seconds from now)
  const countdownEndDate = new Date();
  countdownEndDate.setDate(countdownEndDate.getDate() + 5);
  countdownEndDate.setHours(countdownEndDate.getHours() + 23);
  countdownEndDate.setMinutes(countdownEndDate.getMinutes() + 59);
  countdownEndDate.setSeconds(countdownEndDate.getSeconds() + 35);

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow();
    } else {
      console.log("Buy Now clicked - navigate to product or category page");
      // Handle buy now action
    }
  };

  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-black">
          <div className="grid min-h-[400px] grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-16">
              {/* Subtitle */}
              <div className="mb-6">
                <span className="text-lg font-semibold text-green-400">{subtitle}</span>
              </div>

              {/* Main Title */}
              <h2 className="mb-8 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">{title}</h2>

              {/* Countdown Timer */}
              <div className="mb-8">
                <CountdownTimer targetDate={countdownEndDate} />
              </div>

              {/* Buy Now Button */}
              <div>
                <Button
                  size="lg"
                  className="rounded-sm bg-green-400 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-green-500"
                  onClick={handleBuyNow}
                >
                  {buttonText}
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="relative w-full max-w-md">
                <img
                  src={productImage || "/images/placeholder.svg?height=300&width=400&text=JBL+Speaker"}
                  alt="Featured Product"
                  className="h-auto w-full object-contain"
                />

                {/* Optional glow effect */}
                <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-green-500/20 via-transparent to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
