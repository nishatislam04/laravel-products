import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

// export default ({ children, ...props }: AppLayoutProps) => <div {...props}>{children}</div>;
export default ({ children, ...props }: AppLayoutProps) => (
    <div {...props} id="app-layout">
        <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
        </SidebarProvider>
    </div>
);
