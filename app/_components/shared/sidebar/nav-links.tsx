import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineChartBar, HiOutlineUserPlus } from "react-icons/hi2";
import { TbFileUpload } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import SvgIcon from "../../icons/container";
import { icon, route } from "@/constants";

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
      icon: <RxDashboard size={17.5} />,
      path: "/hr-admin",
    },
    {
      name: "Onboarding",
      icon: <HiOutlineUserPlus size={17.5} />,
      path: "/hr-admin/onboarding/overview",
      subMenu: [
        { name: "Overview", path: "/hr-admin/onboarding/overview" },
        { name: "Template", path: "/hr-admin/onboarding/template" },
      ],
    },
    {
      name: "Employee Management",
      icon: <LiaMoneyBillWaveSolid size={17.5} />,
      path: "/hr-admin/employee-management/directory",
      subMenu: [
        {
          name: "Employee Directory",
          path: "/hr-admin/employee-management/directory",
        },
        {
          name: "Departmental Management",
          path: "/hr-admin/employee-management/departmental",
        },
        {
          name: "Role Management",
          path: "/hr-admin/employee-management/role",
        },
        {
          name: "Attendance Management",
          path: "/hr-admin/employee-management/attendance",
        },
        {
          name: "Compliance & Reporting",
          path: "/hr-admin/employee-management/compliance-reporting",
        },
        {
          name: "Approval Management",
          path: "/hr-admin/employee-management/approval",
        },
      ],
    },
    {
      name: "Payroll",
      icon: <LiaMoneyBillWaveSolid size={17.5} />,
      path: "/hr-admin/payroll/overview",
      subMenu: [
        { name: "Overview", path: "/hr-admin/payroll/overview" },
        { name: "Payroll Report", path: "/hr-admin/payroll/reports" },
        { name: "Benefits", path: "/hr-admin/payroll/benefits-management" },
        { name: "Payroll Settings", path: "/hr-admin/payroll/settings" },
      ],
    },
    {
      name: "Hiring",
      icon: <TbFileUpload size={17.5} />,
      path: "/hr-admin/hiring/overview",
      subMenu: [
        { name: "Overview", path: "/hr-admin/hiring/overview" },
        { name: "Offer Management", path: "/hr-admin/hiring/offer-management" },
        {
          name: "Candidate Management",
          path: "/hr-admin/hiring/candidate-management",
        },
      ],
    },
    {
      name: "Performance",
      icon: <HiOutlineChartBar size={17.5} />,
      path: "/hr-admin/performance/overview",
      subMenu: [
        { name: "Overview", path: "/hr-admin/performance/overview" },
        { name: "Goals", path: "/hr-admin/performance/goals" },
        {
          name: "Continuous Feedback",
          path: "/hr-admin/performance/continuous-feedback",
        },
        {
          name: "Self Assessment",
          path: "/hr-admin/performance/self-assessment",
        },
        {
          name: "Manager Assessment",
          path: "/hr-admin/performance/manager-assessment",
        },
        { name: "360 Feedback", path: "/hr-admin/performance/360-feedback" },
        { name: "Template", path: "/hr-admin/performance/template" },
        { name: "Learning", path: "/hr-admin/performance/learning-management" },
        { name: "KPI", path: "/hr-admin/performance/kpi" },
      ],
    },
    {
      name: "Device Management",
      icon: <SvgIcon path={icon.devices} width={17.5} height={17.5} />,
      path: route.hrAdmin.deviceManagement.overview.home,
      subMenu: [
        {
          name: "Overview",
          path: route.hrAdmin.deviceManagement.overview.home,
        },
        {
          name: 'Device Invetory',
          path: route.hrAdmin.deviceManagement.overview.inventory,
        },
        // {
        //   name: 'Device Assignment',
        //   path: route.hrAdmin.deviceManagement.overview.assignment,
        // },
        {
          name: "Device Report",
          path: route.hrAdmin.deviceManagement.overview.report,
        },
        // {
        //   name: 'Device Request',
        //   path: route.hrAdmin.deviceManagement.overview.request,
        // },
      ],
    },
    {
      name: "App Management",
      icon: <SvgIcon path={icon.app} width={17.5} height={17.5} />,
      path: route.hrAdmin.appManagement.overview,
      subMenu: [
        {
          name: "Overview",
          path: route.hrAdmin.appManagement.overview,
        },
        {
          name: "App Inventory",
          path: route.hrAdmin.appManagement.inventory,
        },
        {
          name: "App Access Tracking",
          path: route.hrAdmin.appManagement.accessTracking,
        },
        {
          name: "App Request",
          path: route.hrAdmin.appManagement.request,
        },
      ],
    },
    {
      name: "Settings",
      icon: <SvgIcon path={icon.settings} width={17.5} height={17.5} />,
      path: route.hrAdmin.settings,
    },
  ];

  const isPathActive = (
    path: string,
    subMenu?: { name: string; path: string }[],
  ) => {
    if (path === "/hr-admin") {
      return /^\/hr-admin$/.test(pathname);
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
      <ul className="flex flex-col gap-2">
        {menuLinks.map((item: DashboardMenu) => {
          const isActive = isPathActive(item.path, item.subMenu);

          return (
            <li key={item.path}>
              <div
                className={`flex items-center justify-between cursor-pointer p-3 py-2 w-full rounded-[4px] 
                                    ${
                                      isActive
                                        ? "bg-primary text-white"
                                        : "text-black"
                                    } transition duration-100`}
              >
                <button
                  className="flex items-center gap-x-2 flex-grow"
                  onClick={() => handleNavLinkClick(item.path)}
                >
                  <span>{item.icon}</span>
                  <span
                    className={`text-sm font-sans ${
                      isActive ? "font-semibold" : "font-normal"
                    }`}
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
                    <FaChevronDown className={`transition-transform duration-300 ${((openDropDown === item.path)) ? 'rotate-180' : ''}`} />
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
                          className={`flex items-center p-2 text-sm font-sans pl-5 ${
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
