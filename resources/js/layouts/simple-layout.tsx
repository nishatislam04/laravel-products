import BaseLayout from "@/components/layouts/base-layout";
import { ReactNode } from "react";

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
}

/**
 * Simple layout using the base layout component
 * Provides basic structure with gray background and scroll functionality
 */
export default function SimpleLayout({ children, title = "Laravel" }: SimpleLayoutProps) {
  return (
    <BaseLayout 
      title={title} 
      className="bg-gray-50" 
      withScrollArea={true} 
      scrollWidth={2.5}
    >
      {children}
    </BaseLayout>
  );
}
