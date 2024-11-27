import React from "react";
import { cn } from "@/lib/utils";

export interface FormTypes {
  className?: string;
  children?: React.ReactNode;
  onSubmit: () => void;
}

function FormComponent({ children, className, onSubmit }: FormTypes) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid items-start gap-6 text-foreground", className)}
    >
      {children}
    </form>
  );
}

export default FormComponent;
