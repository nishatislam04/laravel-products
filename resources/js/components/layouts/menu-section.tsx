import { Separator } from "@/components/ui/separator";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

export interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  sections: MenuSection[];
  activeUrlPath?: string;
  className?: string;
}

/**
 * Reusable menu section component for account layout
 * Renders grouped navigation menus with active states
 */
export default function MenuSectionComponent({ 
  sections, 
  activeUrlPath,
  className = ""
}: MenuSectionProps) {
  const { url } = usePage();
  const currentUrl = activeUrlPath || url;

  return (
    <div className={`space-y-6 ${className}`}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3 className="mb-3 font-semibold text-gray-900">{section.title}</h3>
          <nav className="space-y-1">
            {section.items.map((item, itemIndex) => {
              const IconComponent = item.icon;
              const isActive = item.active !== undefined ? item.active : currentUrl === item.href;
              
              return (
                <Link
                  preserveScroll
                  key={itemIndex}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-red-50 font-medium text-red-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          {sectionIndex < sections.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );
}
