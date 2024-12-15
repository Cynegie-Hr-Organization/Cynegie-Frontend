import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppDropdownMenu({
  trigger,
  menuItems,
  width = "w-56",
}: {
  trigger: ReactNode;
  menuItems: ReactNode;
  width?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn("bg-white rounded-lg", width)}>
        <DropdownMenuGroup>{menuItems}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
