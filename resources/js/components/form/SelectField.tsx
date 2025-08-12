import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends React.ComponentProps<typeof Select> {
  label?: string;
  error?: string;
  placeholder?: string;
  options?: SelectOption[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  placeholder = "Select...",
  options,
  children,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label className="text-right">
          {label}
        </Label>
      )}
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options
            ? options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))
            : children}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
