import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function SimpleLayout({ children, title = "Laravel" }: SimpleLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50">{children}</div>
    </>
  );
}
