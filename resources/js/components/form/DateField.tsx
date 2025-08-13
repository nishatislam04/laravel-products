import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface DateFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <Label htmlFor={props.id} className="text-right">
            {label}
          </Label>
        )}
        <Input ref={ref} type="date" className={error ? "border-red-500 " + (className || "") : className} {...props} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  },
);
DateField.displayName = "DateField";
