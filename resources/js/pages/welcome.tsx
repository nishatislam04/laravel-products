import BestSellingProducts from "@/components/best-selling-products";
import BrowseByCategory from "@/components/browse-by-category";
import ExploreOurProducts from "@/components/explore-our-products";
import FeaturedCategory from "@/components/featured-category";
import FlashSales from "@/components/flash-sales";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import NewArrival from "@/components/new-arrival";
import ServicesSection from "@/components/services-section";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
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
      <HeroCarousel />
      <FlashSales />
      <BrowseByCategory onCategorySelect={handleCategorySelect} />
      <BestSellingProducts onViewAll={handleViewAllBestSelling} />
      <FeaturedCategory onBuyNow={handleFeaturedCategoryBuyNow} />
      <ExploreOurProducts onViewAll={handleViewAllProducts} />
      <NewArrival onItemClick={handleNewArrivalClick} />
      <ServicesSection onBackToTop={handleBackToTop} />
      <Footer />
    </AppLayout>
  );
}
