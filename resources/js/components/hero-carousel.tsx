"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import GooglePixel8 from "@/images/google-pixel-8.png";
import Oneplus12Smartphone from "@/images/oneplus-12-smartphone.png";
import PurplePinkIphone14Pro from "@/images/purple-pink-iphone-14-pro.png";
import XiaomiMi14Smartphone from "@/images/xiaomi-mi-14-smartphone.png";

interface CarouselSlide {
    id: number;
    brand: string;
    product: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    backgroundColor: string;
}

const slides: CarouselSlide[] = [
    {
        id: 1,
        brand: "Apple",
        product: "iPhone 14 Series",
        title: "Up to 10%",
        subtitle: "off Voucher",
        buttonText: "Shop Now",
        buttonLink: "/iphone-14",
        image: PurplePinkIphone14Pro,
        backgroundColor: "bg-black",
    },
    {
        id: 2,
        brand: "Samsung",
        product: "Galaxy S24 Series",
        title: "Up to 15%",
        subtitle: "off Voucher",
        buttonText: "Shop Now",
        buttonLink: "/galaxy-s24",
        image: GooglePixel8,
        backgroundColor: "bg-gradient-to-r from-blue-900 to-purple-900",
    },
    {
        id: 3,
        brand: "Google",
        product: "Pixel 8 Series",
        title: "Up to 12%",
        subtitle: "off Voucher",
        buttonText: "Shop Now",
        buttonLink: "/pixel-8",
        image: XiaomiMi14Smartphone,
        backgroundColor: "bg-gradient-to-r from-green-800 to-blue-800",
    },
    {
        id: 4,
        brand: "OnePlus",
        product: "OnePlus 12 Series",
        title: "Up to 8%",
        subtitle: "off Voucher",
        buttonText: "Shop Now",
        buttonLink: "/oneplus-12",
        image: Oneplus12Smartphone,
        backgroundColor: "bg-gradient-to-r from-red-900 to-black",
    },
    {
        id: 5,
        brand: "Xiaomi",
        product: "Mi 14 Series",
        title: "Up to 20%",
        subtitle: "off Voucher",
        buttonText: "Shop Now",
        buttonLink: "/mi-14",
        image: XiaomiMi14Smartphone,
        backgroundColor: "bg-gradient-to-r from-orange-900 to-red-900",
    },
];

interface HeroCarouselProps {
    className?: string;
}

export default function HeroCarousel({ className = "" }: HeroCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const goToSlide = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    return (
        <div className={`relative mx-20 my-10 ${className}`}>
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
                // plugins={[
                //     Autoplay({
                //         delay: 5000,
                //     }),
                // ]}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={slide.id}>
                            <div className={`relative h-60 w-full md:h-80 ${slide.backgroundColor} overflow-hidden text-white`}>
                                {/*container  */}
                                <div className="absolute inset-0 flex w-full items-center justify-between px-8 pr-0 md:px-16 md:pr-0">
                                    {/* Left Content */}
                                    <div className="flex-1 space-y-4 md:space-y-6">
                                        {/* Brand Logo/Icon */}
                                        <div className="flex items-center space-x-2">
                                            {slide.brand === "Apple" && (
                                                <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                                </svg>
                                            )}
                                            <span className="text-sm font-medium opacity-90 md:text-base">{slide.brand}</span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-lg font-medium opacity-90 md:text-xl">{slide.product}</h3>

                                        {/* Main Title */}
                                        <div className="space-y-1">
                                            <h1 className="text-3xl leading-tight font-bold md:text-5xl lg:text-6xl">{slide.title}</h1>
                                            <h2 className="text-3xl leading-tight font-bold md:text-5xl lg:text-6xl">{slide.subtitle}</h2>
                                        </div>

                                        {/* CTA Button */}
                                        <Button
                                            variant="ghost"
                                            className="group h-auto p-0 text-base font-medium text-white hover:bg-white/10 hover:text-gray-200 md:text-lg"
                                            asChild
                                        >
                                            <a href={slide.buttonLink} className="flex items-center space-x-2">
                                                <span className="border-b border-white pb-1">{slide.buttonText}</span>
                                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </a>
                                        </Button>
                                    </div>

                                    {/* Right Image */}
                                    <div className="flex h-full w-fit flex-1 items-center justify-end pr-15">
                                        <img src={slide.image} alt={`${slide.brand} ${slide.product}`} className="object-fit max-h-full max-w-full" />
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-200 ${
                            current === index + 1 ? "bg-red-500" : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
