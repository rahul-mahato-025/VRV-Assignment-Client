import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FormTypes {
  className?: string;
  children?: React.ReactNode;
  btnText: string;
  onSubmit: () => void;
}

function FormComponent({ children, className, btnText, onSubmit }: FormTypes) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid items-start gap-6 text-foreground", className)}
    >
      {children}
      <Button type="submit">{btnText}</Button>
    </form>
  );
}

export default FormComponent;
