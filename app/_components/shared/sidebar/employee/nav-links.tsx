import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { addNavItemEllipsis } from "@/utils";
import SvgIcon from "@/app/_components/icons/container";
import { icon } from "@/constants";

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

  const iconSize = 17.5;

  const menuLinks: DashboardMenu[] = [
    {
      name: "Dashboard",
      icon: <SvgIcon path={icon.grid} width={iconSize} height={iconSize} />,
      path: "/employee",
    },
    {
      name: "Task",
      icon: (
        <SvgIcon path={icon.clipboard} width={iconSize} height={iconSize} />
      ),
      path: "/employee/task",
    },
    {
      name: "Profile",
      icon: <SvgIcon path={icon.user} width={iconSize} height={iconSize} />,
      path: "/employee/profile",
    },
    {
      name: "Benefits",
      icon: <SvgIcon path={icon.gift} width={iconSize} height={iconSize} />,
      path: "/employee/benefits",
    },
    {
      name: "App Request and Permission",
      icon: <SvgIcon path={icon.key} width={iconSize} height={iconSize} />,
      path: "/employee/app-request",
    },
    {
      name: "Payroll",
      icon: (
        <SvgIcon path={icon.paperMoneyTwo} width={iconSize} height={iconSize} />
      ),
      path: "/employee/payroll",
    },
    {
      name: "Device Management",
      icon: <SvgIcon path={icon.devices} width={iconSize} height={iconSize} />,
      path: "/employee/device-management",
    },
    {
      name: "Leave Management",
      icon: <SvgIcon path={icon.airplane} width={iconSize} height={iconSize} />,
      path: "/employee/leave-management",
    },
    {
      name: "Performance Management",
      icon: <SvgIcon path={icon.barChart} width={iconSize} height={iconSize} />,
      path: "/employee/performance-management",
    },
    {
      name: "Learning and Development",
      icon: (
        <SvgIcon path={icon.graduatingCap} width={iconSize} height={iconSize} />
      ),
      path: "/employee/learning-development",
    },
    {
      name: "Attendance and Time Tracking",
      icon: <SvgIcon path={icon.clockTwo} width={iconSize} height={iconSize} />,
      path: "/employee/attendance",
    },
  ];

  const isPathActive = (
    path: string,
    subMenu?: { name: string; path: string }[],
  ) => {
    if (path === "/employee") {
      return /^\/employee$/.test(pathname);
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

  const keyIconStyle = {
    default: "stroke-black fill-white",
    active: "stroke-white fill-none",
  };

  const isAppRequestAndPermissionPage = (page: string) => {
    return page === "App Request and Permission";
  };

  const graduatingCapIconStyle = {
    default: "stroke-black fill-none stroke-[1.2]",
    active: "stroke-white fill-none stroke-[1.2]",
  };

  const isLearningDevelopmentPage = (page: string) => {
    return page === "Learning Development";
  };

  return (
    <div className=" transition-all duration-300 ease-in-out">
      <ul className="flex flex-col mt-[-2]">
        {menuLinks.map((item: DashboardMenu) => {
          const isActive = isPathActive(item.path, item.subMenu);

          return (
            <li key={item.path}>
              <button
                className={`flex items-center justify-between cursor-pointer p-3 w-full rounded-[4px] 
                                    ${
                                      isActive
                                        ? `bg-primary text-white fill-white ${
                                            isAppRequestAndPermissionPage(
                                              item.name,
                                            ) && keyIconStyle.active
                                          } ${
                                            isLearningDevelopmentPage(
                                              item.name,
                                            ) && graduatingCapIconStyle.active
                                          }`
                                        : `text-black ${
                                            isAppRequestAndPermissionPage(
                                              item.name,
                                            ) && keyIconStyle.default
                                          } ${
                                            isLearningDevelopmentPage(
                                              item.name,
                                            ) && graduatingCapIconStyle.default
                                          }`
                                    } transition duration-100`}
                onClick={() => {
                  setOpenDropDown(
                    openDropDown === item.path ? null : item.path,
                  );
                  handleNavLinkClick(item.path);
                }}
              >
                <div className="flex items-center gap-x-2">
                  <span>{item.icon}</span>
                  <span
                    className={`text-[14px] font-sans ${
                      isActive ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {addNavItemEllipsis(item.name)}
                  </span>
                </div>
                {item.subMenu && (
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openDropDown === item.path ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
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
