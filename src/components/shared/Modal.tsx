import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ModalProps {
  actionText: string;
  asActionItem: boolean;
  icon: React.ReactNode;
  FormType: React.ReactNode;
  description?: string;
  title: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function Modal({
  FormType,
  actionText,
  asActionItem,
  icon,
  description,
  title,
  open,
  setOpen,
}: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="flex flex-row items-center py-1 px-2">
          {asActionItem ? (
            <Button variant="default">
              {icon}
              {actionText}
            </Button>
          ) : (
            <span className="w-[100%] flex flex-row gap-2 items-center text-[14px] hover:cursor-pointer">
              {icon}
              {actionText}
            </span>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {FormType}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {asActionItem ? (
          <Button variant="default">
            {icon}
            {actionText}
          </Button>
        ) : (
          <span className="w-[100%] flex flex-row gap-2 items-center text-[14px] hover:cursor-pointer">
            {icon}
            {actionText}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent className="p-4 text-foreground">
        <DrawerHeader className="">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {FormType}
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
