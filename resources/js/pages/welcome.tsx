import Footer from "@/components/footer";
import HeroCarousel from "@/components/hero-carousel";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Landing page - Laravel Products" />
            <HeroCarousel />
            <section className="min-h-100">
                <h1 className="text-3xl">hello from mysql</h1>
            </section>
            <Footer />
        </AppLayout>
    );
}
