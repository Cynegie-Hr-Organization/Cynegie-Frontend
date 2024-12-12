import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from "@/components/ui/menubar"
import { cn } from "@/lib/utils";

const AppMenubar = ({ children, menuItems, className, overrideClassName }: {
<<<<<<< HEAD
  children?: React.ReactNode, menuItems: React.ReactNode,
=======
  children: React.ReactNode, menuItems: React.ReactNode,
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
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
