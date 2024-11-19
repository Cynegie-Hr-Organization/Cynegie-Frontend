import { IoChevronBackOutline } from "react-icons/io5";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <div className="bg-white w-full xl:pl-[17rem]">
      <div className="flex items-center justify-between p-5 md:border-b md:border-DreamyCloud md:bg-white">
        <div className="items-center hidden gap-3 xl:flex">
          <Image className="w-[40px] h-[40px]" width={40} height={40} src="/avatar.svg" alt="avatar" />
          <div>
            <p className="font-sans text-lg font-bold text-Sambucus">
              Welcome, name 👋
            </p>
            <p className="font-sans text-xs font-normal text-Charcoal">
              It’s Monday, 14th July 2024
            </p>
          </div>
        </div>


        <div className="items-center justify-between hidden gap-5 xl:flex">
          <select className="border-[0.9px] border-SatinWhite w-[90px] rounded-md h-[36px] outline-none text-BlackRiverFalls text-sm px-2 font-sans font-semibold">
            <option value="">Admin</option>
            <option>Samuel</option>
            <option>Lucky</option>
            <option>Tolu</option>
          </select>

          <IoIosNotificationsOutline />
        </div>

        <IoChevronBackOutline className="xl:hidden" />

        <div className="z-50 flex items-center justify-between gap-5 xl:hidden">
          <IoIosNotificationsOutline />
          <GiHamburgerMenu />
        </div>

      </div>
    </div>
  )
}

export default Header;