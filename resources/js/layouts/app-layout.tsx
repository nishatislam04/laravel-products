import BaseLayout from "@/components/layouts/base-layout";
import { type ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

/**
 * Simple app layout using the base layout component
 * Provides basic scroll functionality with minimal structure
 */
export default ({ children, title, ...props }: AppLayoutProps) => (
  <div {...props} id="app-layout">
    <BaseLayout title={title} withScrollArea={true} scrollWidth={2.5}>
      {children}
    </BaseLayout>
  </div>
);
