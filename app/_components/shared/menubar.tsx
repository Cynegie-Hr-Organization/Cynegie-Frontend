import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem, MenubarShortcut, MenubarSeparator } from "@/components/ui/menubar"

const AppMenubar = ({ children, menuItems }: { children: React.ReactNode, menuItems: React.ReactNode }) => {
  return (
    <Menubar className="border w-fit px-0 py-1 rounded-lg cursor-pointer">
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        <MenubarContent className="w-fit px-0 py-1 rounded-lg cursor-pointer bg-white">
          <MenubarItem className="w-full">
            {menuItems}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppMenubar;
