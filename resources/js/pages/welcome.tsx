import FlashSales from "@/components/flash-sales";
import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Landing page - Laravel Products" />
            <HeroCarousel />
            <section>
                <FlashSales />
            </section>
            <Footer />
        </AppLayout>
    );
}
