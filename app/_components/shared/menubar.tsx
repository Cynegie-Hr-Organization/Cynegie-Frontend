import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { cn } from "@/lib/utils";

interface AppMenubarProps {
  children?: React.ReactNode;
  menuItems: React.ReactNode[];
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
          {menuItems?.map((item, index) => (
            <MenubarItem 
              key={index} 
              className="w-full px-4 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            >
              {item}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppMenubar;