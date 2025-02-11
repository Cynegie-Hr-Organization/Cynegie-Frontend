import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { SlSettings } from "react-icons/sl";

const NavLinks = ({
  onNavLinkClick,
  isMobile,
}: {
  onNavLinkClick: () => void;
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropDown, setOpenDropDown] = useState<string | null>(null);

  interface DashboardMenu {
    name: string;
    icon: JSX.Element;
    path: string;
    subMenu?: { name: string; path: string }[];
  }

  const menuLinks: DashboardMenu[] = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={16} />,
      path: "/super-admin",
    },
    {
      name: "Approval Management",
      icon: <FaCheck size={16} />,
      path: "/super-admin/approval-management",
    },
    {
      name: "User",
      icon: <HiOutlineUser size={16} />,
      path: "/super-admin/users/overview",
      subMenu: [
        { name: "Overview", path: "/super-admin/users/overview" },
        {
          name: "Users Permission",
          path: "/super-admin/users/users-permission",
        },
      ],
    },
    {
      name: "Settings",
      icon: <SlSettings size={16} />,
      path: "/super-admin/settings",
    },
  ];

  const isPathActive = (
    path: string,
    subMenu?: { name: string; path: string }[],
  ) => {
    if (path === "/super-admin") {
      return /^\/super-admin$/.test(pathname);
    }

    const pathParts = path.split("/").filter(Boolean);
    const currentPathParts = pathname.split("/").filter(Boolean);

    const isMainPathActive =
      currentPathParts.length >= pathParts.length &&
      pathParts.every((part, index) => currentPathParts[index] === part);

    const isSubPathActive = subMenu?.some((subItem) =>
      pathname.startsWith(subItem.path),
    );

    return isMainPathActive || isSubPathActive;
  };

  const handleNavLinkClick = (link: string) => {
    router.push(link);
    if (isMobile) {
      onNavLinkClick();
    }
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const path = (e.currentTarget as HTMLElement).dataset.path;
    if (path) {
      setOpenDropDown(openDropDown === path ? null : path);
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <ul className="flex flex-col gap-y-2 md:gap-y-0 xl:gap-y-1">
        {menuLinks.map((item: DashboardMenu) => {
          const isActive = isPathActive(item.path, item.subMenu);

          return (
            <li key={item.path}>
              <div
                className={`flex items-center justify-between cursor-pointer p-3 py-2 w-full rounded-[4px] 
                                    ${isActive ? "bg-primary text-white" : "text-black"} transition duration-100`}
              >
                <button
                  className="flex items-center gap-x-2 flex-grow"
                  onClick={() => handleNavLinkClick(item.path)}
                >
                  <span>{item.icon}</span>
                  <span
                    className={`text-[14px] font-sans ${isActive ? "font-semibold" : "font-normal"}`}
                  >
                    {item.name}
                  </span>
                </button>
                {item.subMenu && (
                  <button
                    onClick={handleDropdownToggle}
                    data-path={item.path}
                    className="p-1"
                  >
                    <FaChevronDown
                      className={`transition-transform duration-300 ${openDropDown === item.path ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
              {item.subMenu && openDropDown === item.path && (
                <ul className="ml-4">
                  {item.subMenu.map((subItem) => {
                    const isSubActive = isPathActive(subItem.path);

                    return (
                      <li key={subItem.path}>
                        <button
                          onClick={() => handleNavLinkClick(subItem.path)}
                          className={`flex items-center p-2 text-[14px] font-sans pl-5 ${
                            isSubActive
                              ? "text-primary font-semibold"
                              : "text-gray-700 font-normal"
                          }`}
                        >
                          {subItem.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavLinks;
