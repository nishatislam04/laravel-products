import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Plus } from "lucide-react";
import React from "react";

interface AdminHeaderProps {
  searchPlaceholder?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonIcon?: React.ComponentType<{ className?: string }>;
  onAddClick?: () => void;
  showNotifications?: boolean;
  className?: string;
}

/**
 * Reusable header component for admin and vendor layouts
 * Provides search functionality, action buttons, and notifications
 */
export default function AdminHeader({
  searchPlaceholder = "Search...",
  showAddButton = false,
  addButtonText = "Add",
  addButtonIcon: AddIcon = Plus,
  onAddClick,
  showNotifications = true,
  className = ""
}: AdminHeaderProps) {
  return (
    <header className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 ${className}`}>
      <div className="flex w-full items-center justify-end gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder={searchPlaceholder} 
            className="pl-8" 
          />
        </div>
        
        {showAddButton && (
          <Button variant="outline" size="sm" onClick={onAddClick}>
            <AddIcon className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        )}
        
        {showNotifications && (
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
