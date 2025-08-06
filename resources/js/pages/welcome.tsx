import BrowseByCategory from "@/components/browse-by-category";
import FlashSales from "@/components/flash-sales";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
  const handleCategorySelect = (categoryId: number, categorySlug: string) => {
    console.log("Selected category:", categoryId, categorySlug);
    // Handle category selection - could navigate to category page
    // window.location.href = `/category/${categorySlug}`
  };
  return (
    <AppLayout>
      <Head title="Landing page - Laravel Products" />
      <HeroCarousel />
      <section>
        <FlashSales />
        <BrowseByCategory onCategorySelect={handleCategorySelect} />
      </section>
      <Footer />
    </AppLayout>
  );
}
