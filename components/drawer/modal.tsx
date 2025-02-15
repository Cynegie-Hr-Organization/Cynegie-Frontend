"use client";


import { useMediaQuery } from "@/app/_hooks/use-media-query";
// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";







export function AppModal({
  children,
  trigger,
  header,
  description,
  footer,
  open,
  setOpen,
}: {
  children?: ReactNode;
  trigger: ReactNode;
  header: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white max-h-[600px] px-4 overflow-y-scroll">
          <DialogHeader className="px-0 mx-0">
            <DialogTitle className="text-base">{header}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          {footer && (
            <DrawerFooter className="py-4 px-0">{footer}</DrawerFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-white max-h-max px-4">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-base">{header}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        {footer && (
          <DrawerFooter className="pt-2 w-full py-4 px-0">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}




export function AppModal2({
  children,
  trigger,
  header,
  description,
  footer,
  open,
  setOpen,
  onClose
}: {
  children?: ReactNode
  trigger?: ReactNode
  header: ReactNode
  description?: ReactNode
  footer?: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
  onClose?: () => void
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        {trigger && (
          <DrawerTrigger asChild>
            {trigger}
          </DrawerTrigger>
        )}
        <DialogContent className="sm:max-w-[600px] bg-white max-h-[600px] px-4 overflow-y-scroll">
          {/* <DialogClose
            onClick={() => onClose?.()}
            className="z-50 absolute right-4 top-4 opacity-70 ring-offset-background rounded-full focus:ring-1 focus:ring-primary border-none outline-none transition-opacity hover:opacity-100 focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-primary">
            <div className='border-none rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center'>
              <IoCloseOutline />
            </div>
            <span className="sr-only">Close</span>
          </DialogClose> */}

          <DialogHeader className="px-0 mx-0">
            <DialogTitle className="text-base">{header}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {children}
          {footer && (
            <DrawerFooter className="py-4 px-0">{footer}</DrawerFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="bg-white max-h-max px-4">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-base">{header}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        {footer && (
          <DrawerFooter className="pt-2 w-full py-4 px-0">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}