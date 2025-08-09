import { Head } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function SimpleLayout({ children, title = "Laravel" }: SimpleLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="h-screen overflow-y-hidden bg-gray-50">
        <ScrollArea className="h-full" width={2.5}>{children}</ScrollArea>
      </div>
    </>
  );
}
