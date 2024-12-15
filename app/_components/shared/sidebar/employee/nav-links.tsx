import React, { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineChartBar, HiOutlineUserPlus } from 'react-icons/hi2';
import { TbFileUpload } from 'react-icons/tb';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { addNavItemEllipsis } from '@/utils';

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
      name: 'Dashboard',
      icon: <RxDashboard size={iconSize} />,
      path: '/employee',
    },
    {
      name: 'Task',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/task',
    },
    {
      name: 'Profile',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/profile',
    },
    {
      name: 'Benefits',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/benefits',
    },
    {
      name: 'App Requests and Permission',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/app-request',
    },
    {
      name: 'Payroll',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/payroll',
    },
    {
      name: 'Device Management',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/device-management',
    },
    {
      name: 'Leave Management',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/leave-management',
    },
    {
      name: 'Performance Management',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/peformance-management',
    },
    {
      name: 'Learning Development',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/learning-development',
    },
    {
      name: 'Attendance and Time Tracking',
      icon: <HiOutlineUserPlus size={iconSize} />,
      path: '/employee/attendance',
    },
  ];

  const isPathActive = (
    path: string,
    subMenu?: { name: string; path: string }[]
  ) => {
    if (path === '/employee') {
      return /^\/employee$/.test(pathname);
    }

    const pathParts = path.split('/').filter(Boolean);
    const currentPathParts = pathname.split('/').filter(Boolean);

    const isMainPathActive =
      currentPathParts.length >= pathParts.length &&
      pathParts.every((part, index) => currentPathParts[index] === part);

    const isSubPathActive = subMenu?.some((subItem) =>
      pathname.startsWith(subItem.path)
    );

    return isMainPathActive || isSubPathActive;
  };

  const handleNavLinkClick = (link: string) => {
    router.push(link);
    if (isMobile) {
      onNavLinkClick();
    }
  };

  return (
    <div className=' transition-all duration-300 ease-in-out'>
      <ul className='flex flex-col mt-[-2]'>
        {menuLinks.map((item: DashboardMenu) => {
          const isActive = isPathActive(item.path, item.subMenu);

          return (
            <li key={item.path}>
              <button
                className={`flex items-center justify-between cursor-pointer p-3 w-full rounded-[4px] 
                                    ${
                                      isActive
                                        ? 'bg-primary text-white'
                                        : 'text-black'
                                    } transition duration-100`}
                onClick={() => {
                  setOpenDropDown(
                    openDropDown === item.path ? null : item.path
                  );
                  handleNavLinkClick(item.path);
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <span>{item.icon}</span>
                  <span
                    className={`text-[14px] font-sans ${
                      isActive ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    {addNavItemEllipsis(item.name)}
                  </span>
                </div>
                {item.subMenu && (
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openDropDown === item.path ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.subMenu && openDropDown === item.path && (
                <ul className='ml-4'>
                  {item.subMenu.map((subItem) => {
                    const isSubActive = isPathActive(subItem.path);

                    return (
                      <li key={subItem.path}>
                        <button
                          onClick={() => handleNavLinkClick(subItem.path)}
                          className={`flex items-center p-2 text-[14px] font-sans pl-5 ${
                            isSubActive
                              ? 'text-primary font-semibold'
                              : 'text-gray-700 font-normal'
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
