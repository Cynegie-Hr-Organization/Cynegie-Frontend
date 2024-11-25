import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IsubMenu } from './adminHeaderAndSidebarData';
import { FaChevronDown } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineChartBar, HiOutlineUserPlus } from 'react-icons/hi2';
import { TbFileUpload } from 'react-icons/tb';


interface Props {
    openMobileMenu: boolean
    setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavLinks = ({ openMobileMenu, setOpenMobileMenu: setOpenMobileMenu }: Props) => {
    const [openMenu, setOpenMenu] = useState<string | null>("/hr-admin");
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [, setUrl] = useState<string | null>(null);

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
                {
                    name: 'Overview',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/onboarding/overview',
                },
                {
                    name: 'Template',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/onboarding/template',
                },
            ],
        },
        {
            name: 'Hiring',
            icon: <TbFileUpload size={17.5} />,
            path: '/hr-admin/hiring/overview',
            subMenu: [
                {
                    name: 'Overview',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/hiring/overview',
                },
                
                {
                    name: 'Candiate Manage...',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/hiring/candidate-management',
                },
                
                {
                    name: 'Offer Management',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/hiring/offer-management',
                },
            ],
        },

        //   Performance Management Section
        {
            name: 'Performance Management',
            icon: <HiOutlineChartBar size={17.5} />,
            path: '/hr-admin/performance-magnt/overview',
            subMenu: [
                {
                    name: 'Overview',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/performance-magnt/overview',
                },
                {
                    name: 'Goals',
                    icon: 'fa-solid fa-house',
                    path: '/hr-admin/performance-magnt/goals',
                },
            ],
        },
    ]

    useEffect(() => {
        const URL = window.location.pathname
        setUrl(URL)
    }, [])

    const handleToggle = (path: string) => {
        setOpenMenu(openMenu === path ? null : path);
        handleSubMenuToggle(path)
        setOpenMobileMenu(!openMobileMenu)
    };

    const handleSubMenuToggle = (path: string) => {
        setOpenSubMenu(openSubMenu === path ? null : path);
        setOpenMobileMenu(!openMobileMenu)
    };


    return (
        <div className="w-64 transition-all duration-300 ease-in-out">
            <ul className='flex flex-col gap-2 mr-3'>
                {menuLinks.map((item: DashboardMenu) => {
                    const active = item.path === openMenu

                    return (
                        <li key={item.path}>
                            <button className={`flex items-center justify-between cursor-pointer p-3 w-full px-5 rounded-[4px] ${active && 'bg-primary text-white'}  cursor-pointer  transition duration-100`}
                                onClick={() => handleToggle(item.path)}>
                                <div className={`flex items-center justify-center gap-x-2`}>
                                    <span> {item.icon}</span>
                                    <Link href={'#'} className={`${item.path === openMenu ? 'text-white font-semibold' : 'text-BlackRiverFalls font-normal'} text-[14px] font-sans`}>{item.name}</Link>
                                    {/* <Link href={item.path} className={`${item.path === openMenu ? 'text-white font-semibold' : 'text-BlackRiverFalls font-normal'} text-[14px] font-sans`}>{item.name}</Link> */}
                                </div>

                                {item.subMenu && (
                                    <span className={`${active ? 'rotate-180' : ''} transition-all duration-300`}>
                                        <FaChevronDown />
                                    </span>
                                )}
                            </button>
                            {item.subMenu && openMenu === item.path && (
                                <ul className="mb-6 ml-4">
                                    {item.subMenu.map((subItem: IsubMenu) => (
                                        <li key={subItem.path} >
                                            <button onClick={() => handleSubMenuToggle(subItem.path)}>
                                                <Link href={subItem.path} className="flex items-center p-2 ">
                                                    {item.subMenu && (
                                                        <span className={`${subItem?.path === openSubMenu ? 'text-primary' : 'text-gray-700'} text-[14px] font-sans pl-5 font-normal`}>{subItem.name}</span>
                                                    )}
                                                </Link>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default NavLinks;


export interface DashboardSubMenu {
    name: string;
    icon: string;
    path: string;
}

export interface DashboardMenu {
    name: string;
    path: string;
    icon?: React.JSX.Element;
    subMenu?: IsubMenu[];
    // darkIcon: string;
    // whiteIcon: string;
}
