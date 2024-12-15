import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function AppPopoverMenu({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <ul className="flex flex-col gap-y-2 text-sm">
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
