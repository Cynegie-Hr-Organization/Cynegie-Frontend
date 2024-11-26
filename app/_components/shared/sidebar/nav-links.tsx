import React, { useState } from 'react';
// import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // For pathname and router
import { FaChevronDown } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineChartBar, HiOutlineUserPlus } from 'react-icons/hi2';
import { TbFileUpload } from 'react-icons/tb';


const NavLinks = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [openDropDown, setOpenDropDown] = useState<string | null>(null);

    const menuLinks: DashboardMenu[] = [
        {
            name: 'Dashboard',
            icon: <RxDashboard size={17.5} />,
            path: '/hr-admin',
        },
        {
            name: 'Onboarding',
            icon: <HiOutlineUserPlus size={17.5} />,
            path: '/hr-admin/onboarding/overview',
            subMenu: [
                { name: 'Overview', path: '/hr-admin/onboarding/overview' },
                { name: 'Template', path: '/hr-admin/onboarding/template' },
            ],
        },
        {
            name: 'Hiring',
            icon: <TbFileUpload size={17.5} />,
            path: '/hr-admin/hiring/overview',
            subMenu: [
                { name: 'Overview', path: '/hr-admin/hiring/overview' },
                { name: 'Jobs', path: '/hr-admin/hiring/jobs' },
                { name: 'Candidate Management', path: '/hr-admin/hiring/candidate-management' },
            ],
        },
        {
            name: 'Performance Management',
            icon: <HiOutlineChartBar size={17.5} />,
            path: '/hr-admin/performance-magnt/overview',
            subMenu: [
                { name: 'Overview', path: '/hr-admin/performance-magnt/overview' },
                { name: 'Goals', path: '/hr-admin/performance-magnt/goals' },
            ],
        },
        {
            name: 'Payroll',
            icon: <HiOutlineChartBar size={17.5} />,
            path: '/hr-admin/payroll/overview',
            subMenu: [
                { name: 'Overview', path: '/hr-admin/performance-magnt/overview' },
                { name: 'Goals', path: '/hr-admin/performance-magnt/goals' },
            ],
        },
    ];

    const isPathActive = (path: string) => path === '/hr-admin'
        ? /^\/hr-admin$/.test(pathname)
        : new RegExp(`^${path}.*$`).test(pathname);

    // const handleToggle = () => {
    //     setOpenMobileMenu(!openMobileMenu)
    // };



    return (
        <div className="w-64 transition-all duration-300 ease-in-out">
            <ul className="flex flex-col gap-2 mr-3">
                {menuLinks.map((item: DashboardMenu) => {
                    const isActive = isPathActive(item.path);

                    return (
                        <li key={item.path}>
                            <button
                                className={`flex items-center justify-between cursor-pointer p-3 w-full px-3 rounded-[4px] 
                                    ${isActive ? 'bg-primary text-white' : 'text-black'
                                    } transition duration-100`}
                                onClick={() => {
                                    router.push(item.path);
                                    if (item.subMenu) {
                                        setOpenDropDown(isActive && openDropDown === item.path ? null : item.path);
                                    } else {
                                        setOpenDropDown(null);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-x-2">
                                    <span>{item.icon}</span>
                                    <span className={`text-[14px] font-sans ${isActive ? 'font-semibold' : 'font-normal'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                {item.subMenu && (
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${(openDropDown === item.path) && isActive ? 'rotate-180' : ''
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
                                                    onClick={() => router.push(subItem.path)}
                                                    className={`flex items-center p-2 text-[14px] font-sans pl-5 ${isSubActive ? 'text-primary font-semibold' : 'text-gray-700 font-normal'
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

export interface DashboardMenu {
    name: string;
    path: string;
    icon?: React.JSX.Element;
    subMenu?: { name: string; path: string }[];
}
