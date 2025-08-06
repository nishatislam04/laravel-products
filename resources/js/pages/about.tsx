"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import ServicesSection from "@/components/services-section";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { ChevronRight, DollarSign, Instagram, Linkedin, ShoppingBag, Twitter } from "lucide-react";

interface StatisticProps {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  description: string;
  isHighlighted?: boolean;
}

function StatisticCard({ icon: Icon, number, description, isHighlighted = false }: StatisticProps) {
  return (
    <div
      className={`rounded-lg border-2 p-8 text-center ${
        isHighlighted
          ? "border-red-500 bg-red-500 text-white"
          : "border-gray-200 bg-white transition-colors hover:border-gray-300"
      }`}
    >
      <div className="mb-4 flex justify-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${
            isHighlighted ? "bg-white/20" : "bg-black"
          }`}
        >
          <Icon className={`h-8 w-8 ${isHighlighted ? "text-white" : "text-white"}`} />
        </div>
      </div>
      <div className={`mb-2 text-3xl font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}>{number}</div>
      <div className={`text-sm ${isHighlighted ? "text-white" : "text-gray-600"}`}>{description}</div>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

function TeamMemberCard({ name, position, image, socialLinks }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <img
          src={image || "/images/placeholder.svg"}
          alt={name}
          className="h-80 w-full rounded-lg bg-gray-100 object-cover"
        />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900">{name}</h3>
      <p className="mb-4 text-gray-600">{position}</p>

      {/* Social Links */}
      <div className="flex justify-center space-x-3">
        {socialLinks.twitter && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-blue-500" asChild>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
        )}
        {socialLinks.instagram && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-pink-500" asChild>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" />
            </a>
          </Button>
        )}
        {socialLinks.linkedin && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-blue-600" asChild>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

const statistics = [
  {
    icon: ShoppingBag,
    number: "10.5k",
    description: "Sellers active our site",
    isHighlighted: false,
  },
  {
    icon: DollarSign,
    number: "33k",
    description: "Monthly Product Sale",
    isHighlighted: true,
  },
  {
    icon: ShoppingBag,
    number: "45.5k",
    description: "Customer active in our site",
    isHighlighted: false,
  },
  {
    icon: DollarSign,
    number: "25k",
    description: "Annual gross sale in our site",
    isHighlighted: false,
  },
];

const teamMembers = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: "/images/placeholder.svg?height=320&width=280&text=Tom+Cruise",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    image: "/images/placeholder.svg?height=320&width=280&text=Emma+Watson",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    image: "/images/placeholder.svg?height=320&width=280&text=Will+Smith",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="About - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 py-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">About</span>
          </nav>

          {/* Our Story Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div>
                <h1 className="mb-8 text-4xl font-bold text-gray-900 lg:text-5xl">Our Story</h1>
                <div className="space-y-6 leading-relaxed text-gray-600">
                  <p>
                    Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active
                    presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions,
                    Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
                  </p>
                  <p>
                    Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a
                    diverse assortment in categories ranging from consumer.
                  </p>
                </div>
              </div>

              {/* Right Side - Image */}
              <div>
                <div className="rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 p-8 lg:p-12">
                  <img
                    src="/images/placeholder.svg?height=400&width=500&text=Two+Women+Shopping"
                    alt="Two women with shopping bags"
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat, index) => (
                <StatisticCard
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  description={stat.description}
                  isHighlighted={stat.isHighlighted}
                />
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  socialLinks={member.socialLinks}
                />
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="mt-12 flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((dot, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === 1 ? "bg-red-500" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Services Section */}
        <ServicesSection showBackToTop={false} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
