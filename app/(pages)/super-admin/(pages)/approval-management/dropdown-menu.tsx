"use client"

import { MoreHorizontal } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"






interface AppDropdownAction {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  wrapper?: (children: React.ReactNode) => React.ReactNode;
}







export interface AppComboboxDropdownMenuProps {
  trigger?: React.ReactNode;
  width?: string;
  actionsLabel?: string;
  actions: AppDropdownAction[];
}



export function AppComboboxDropdownMenu({
  trigger,
  width = "w-56",
  actionsLabel,
  actions
}: AppComboboxDropdownMenuProps) {
  const [open, setOpen] = React.useState(false)

  const renderMenuItem = (action: AppDropdownAction, index: number) => {
    const menuItem = (
      <DropdownMenuItem
        key={`${action.label}-${index}`}
        className={action.className}
        onClick={action.onClick}
        disabled={action.disabled}
      >
        {action.icon && <span className="mr-2">{action.icon}</span>}
        {action.label}
      </DropdownMenuItem>
    );

    return action.wrapper ? action.wrapper(menuItem) : menuItem;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {trigger ?? <Button variant="ghost" size="sm">
          <MoreHorizontal />
        </Button>}
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className={`bg-white w-[200px] ${width ?? ''}`}>
        {actionsLabel && <DropdownMenuLabel>{actionsLabel}</DropdownMenuLabel>}
        <DropdownMenuGroup>
          {actions.map((action, index) => renderMenuItem(action, index))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
