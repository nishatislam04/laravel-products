import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Landing page - Laravel Products" />
            <h1 className="text-3xl">hello from mysql</h1>
        </AppLayout>
    );
}
