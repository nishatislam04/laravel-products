import { AppSidebar } from "@/components/app-sidebar";
import BestSellingProducts from "@/components/best-selling-products";
import BrowseByCategory from "@/components/browse-by-category";
import ExploreOurProducts from "@/components/explore-our-products";
import FeaturedCategory from "@/components/featured-category";
import FlashSales from "@/components/flash-sales";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import NewArrival from "@/components/new-arrival";
import ServicesSection from "@/components/services-section";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppLayout from "@/layouts/app-layout";
import { User } from "@/types/user";
import { Head } from "@inertiajs/react";

export default function Index({ user }: { user: User }) {
  const handleCategorySelect = (categoryId: number, categorySlug: string) => {
    console.log("Selected category:", categoryId, categorySlug);
    // Handle category selection - could navigate to category page
    // window.location.href = `/category/${categorySlug}`
  };
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleViewAllBestSelling = () => {
    console.log("View all best selling products");
    // Handle view all best selling products - could navigate to best selling products page
    // window.location.href = `/best-selling`
  };
  const handleFeaturedCategoryBuyNow = () => {
    console.log("Buy now");
    // Handle buy now - could navigate to product page
    // window.location.href = `/product/${productSlug}`
  };
  const handleViewAllProducts = () => {
    console.log("View all products");
    // Handle view all products - could navigate to products page
    // window.location.href = `/products`
  };
  const handleNewArrivalClick = (product: any) => {
    console.log("New arrival clicked:", product);
    // Handle new arrival click - could navigate to product page
    // window.location.href = `/product/${product.slug}`
  };
  return (
    <AppLayout>
      <Head title="Landing page - Laravel Products" />

      {/* Header */}
      <Header user={user} />

      <div className="min-h-screen">
        {/* Top Section: Sidebar + Carousel */}
        <div className="flex">
          {/* Sidebar */}
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>

          {/* Carousel */}
          <div className="flex-1">
            <HeroCarousel />
          </div>
        </div>

        {/* Full Width Sections */}
        <main>
          <FlashSales />
          <BrowseByCategory onCategorySelect={handleCategorySelect} />
          <BestSellingProducts onViewAll={handleViewAllBestSelling} />
          <FeaturedCategory onBuyNow={handleFeaturedCategoryBuyNow} />
          <ExploreOurProducts onViewAll={handleViewAllProducts} />
          <NewArrival onItemClick={handleNewArrivalClick} />
          <ServicesSection onBackToTop={handleBackToTop} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AppLayout>
  );
}
