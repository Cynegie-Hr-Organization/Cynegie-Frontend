"use client";

import * as React from "react"

import { useMediaQuery } from "@/app/hooks/use-media-query"
// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerDialog({
  children,
  trigger,
  header,
  footer
}: { children: React.ReactNode, trigger: React.ReactNode, header: React.ReactNode, footer?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] bg-white max-h-[600px] px-4 overflow-y-scroll">
          <DialogHeader className="px-0 mx-0">
            {header}
          </DialogHeader>

          {children}

          {footer && (
            <DrawerFooter className="py-4 px-0">
              {footer}
            </DrawerFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>

      <DrawerContent className="bg-white max-h-max px-4">
        <DrawerHeader className="text-left">
          {header}
        </DrawerHeader>
        {children}

        {footer &&
          <DrawerFooter className="pt-2 w-full py-4 px-0">
            {footer}
          </DrawerFooter>}
      </DrawerContent>
    </Drawer>
  )
}
