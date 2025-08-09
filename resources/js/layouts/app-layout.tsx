import { ScrollArea } from "@/components/ui/scroll-area";
import { type ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
  <div {...props} id="app-layout" className="h-screen overflow-y-hidden">
    <ScrollArea className="h-full w-full">
        {children}
    </ScrollArea>
  </div>
);
