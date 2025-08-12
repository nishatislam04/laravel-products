import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxFieldProps extends React.ComponentProps<typeof Checkbox> {
  label?: string;
  error?: string;
  description?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, error, description, ...props }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <Checkbox id={props.id} {...props} />
        {label && <Label htmlFor={props.id}>{label}</Label>}
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
