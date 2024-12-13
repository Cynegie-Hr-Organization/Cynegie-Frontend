import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from "@/components/ui/menubar"
import { cn } from "@/lib/utils";

const AppMenubar = ({ children, menuItems, className, overrideClassName }: {
  children?: React.ReactNode, menuItems: React.ReactNode,
  className?: string, overrideClassName?: string
}) => {
  return (
    <Menubar className={cn(overrideClassName ?? 'border w-fit px-0 rounded-lg cursor-pointer', className)}>
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        <MenubarContent className="w-fit px-0 py-1 rounded-lg cursor-pointer bg-white max-w-fit">
          <MenubarItem className="w-full">
            {menuItems}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppMenubar;
