import { Head } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
  withScrollArea?: boolean;
  scrollWidth?: number;
}

/**
 * Base layout component that provides common structure for all layouts
 * Handles title, scroll area, and basic styling
 */
export default function BaseLayout({ 
  children, 
  title = "Laravel", 
  className = "",
  withScrollArea = true,
  scrollWidth = 2.5
}: BaseLayoutProps) {
  const content = withScrollArea ? (
    <ScrollArea className="h-full w-full" width={scrollWidth}>
      {children}
    </ScrollArea>
  ) : children;

  return (
    <>
      {title && <Head title={title} />}
      <div className={`h-screen overflow-y-hidden ${className}`}>
        {content}
      </div>
    </>
  );
}
