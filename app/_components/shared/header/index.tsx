'use client'

import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const Header = ({
  onMenuClick,
  onNotificationClick,
}: {
  onNotificationClick?: () => void;
  onMenuClick: () => void;
}) => {
  return (
    <div className='flex items-center justify-between p-5 md:border-b md:border-DreamyCloud md:bg-white'>
      <div className='items-center hidden gap-3 xl:flex'>
        <img className='w-[40px] h-[40px]' src='/image/avatar.png' alt='avatar' />
        <div>
          <p className='font-sans text-lg font-bold text-Sambucus'>Welcome, Wumi 👋</p>
          <p className='font-sans text-xs font-normal text-Charcoal'>It’s Monday, 14th July 2024</p>
        </div>
      </div>

      <div className='items-center justify-between hidden gap-5 xl:flex'>
        <select className='border-[0.9px] border-SatinWhite w-[90px] rounded-md h-[36px] outline-none text-BlackRiverFalls text-sm px-2 font-sans font-semibold'>
          <option value=''>Admin</option>
          <option>Samuel</option>
          <option>Lucky</option>
          <option>Tolu</option>
        </select>

        <IoIosNotificationsOutline size={25} />
      </div>

      <h3 className='xl:hidden font-semibold text-lg'>Overview</h3>

      <div className='z-50 flex items-center gap-5 xl:hidden'>
        <IoIosNotificationsOutline size={25} onClick={onNotificationClick} />
        <IoMenu size={28} onClick={onMenuClick} />
      </div>

    </div>
  );
};

export default Header;
