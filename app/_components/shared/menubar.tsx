import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils";

interface MenuItemProps {
  key: string;
  label: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AppMenubarProps {
  children?: React.ReactNode;
  menuItems: MenuItemProps[];
  className?: string;
  overrideClassName?: string;
}

const AppMenubar = ({ 
  children, 
  menuItems, 
  className, 
  overrideClassName 
}: AppMenubarProps) => {
  return (
    <Menubar 
      className={cn(
        "w-fit h-fit", 
        overrideClassName,
        className
      )}
    >
      <MenubarMenu>
        <MenubarTrigger 
          className="px-1 py-1 rounded-md cursor-pointer hover:bg-gray-50/50 data-[state=open]:bg-gray-50/50"
        >
          {children}
        </MenubarTrigger>
        <MenubarContent 
          align="end"
          className="min-w-[200px] p-2 rounded-lg border border-gray-100 shadow-md bg-white"
        >
          {menuItems?.map((item) => (
            <MenubarItem 
              key={item.key}
              className={cn(
                "w-full px-4 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                item.className
              )}
              onClick={item.onClick}
            >
              {item.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppMenubar;