import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface DialogProps {
  icon?: React.ReactNode;
  outlined?: boolean;
  triggerBtnText: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DialogComponent({ children, ...props }: DialogProps) {
  const { outlined, triggerBtnText, title, description, icon } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={outlined ? "outline" : "default"}>
          {icon && icon}
          {triggerBtnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
