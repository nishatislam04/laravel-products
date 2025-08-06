import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <div {...props} id="app-layout">
        <Header />
        <SidebarProvider>
            <AppSidebar />
            <main className="overflow-hidden">{children}</main>
        </SidebarProvider>
    </div>
);
