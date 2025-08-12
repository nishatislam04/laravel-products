import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FileFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FileField: React.FC<FileFieldProps> = ({ label, error, hint, className, multiple, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={props.id} className="text-right">
          {label}
        </Label>
      )}
      <Input type="file" className={error ? "border-red-500 " + (className || "") : className} multiple={multiple} {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};
