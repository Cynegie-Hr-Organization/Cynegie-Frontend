<<<<<<< HEAD
"use client";

import { FiLogOut } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import NavLinks from "./nav-links";
import { IoClose } from "react-icons/io5";
import { Skeleton } from "@mui/material";
import { getUserDetails } from "@/utils/getUserDetails";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { baseUrl } from "@/constants/config";





const Sidebar = ({ openMobileMenu, setOpenMobileMenu }: { 
  openMobileMenu: boolean, 
  setOpenMobileMenu: () => void 
}) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    fetchDetails();
  }, []);

  const handleLogout = async () => {
    try {
      // Retrieve the session to get the access token
      const session = await getSession();
      console.log(session);

      if (!session || !session.token) {
        console.error("No active session or token found");
        return;
      }

      const response = await fetch(`${baseUrl}/v1/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        console.error("Logout failed:", response.statusText);
        return;
      }

      console.log("Successfully logged out");

      // Redirect to the sign-in page
      router.push("/signin");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div
			className={`${openMobileMenu ? 'translate-x-0' : '-translate-x-full'} 
			xl:translate-x-0 transition duration-500 flex bg-white h-dvh z-50 fixed w-[256px] px-3 pt-7 flex-col justify-between`}>

			<div className="space-y-8">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<img src='/image/logo.png' alt="logo" className="w-[122px] h-[38px]" />
						<IoClose size={30} onClick={setOpenMobileMenu} className="block xl:hidden place-self-end" />
					</div>

					<div className="border border-[#D0D5DD] w-full flex items-center gap-x-2 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
						<RiSearchLine className="text-xl" />
						<input
							className="outline-none border-none w-full group-hover:ring ring-primary"
							type="text"
							placeholder="Search"
						/>
					</div>

				</div>
				<NavLinks onNavLinkClick={setOpenMobileMenu} isMobile={openMobileMenu} />
			</div>

      <div className="flex items-center justify-between my-6 overflow-hidden">
        <div className="flex items-center gap-4">
          <img className="w-14 h-14" src="/image/avatar.png" alt="avatar" />

          <div className="truncate">
            {userDetails ? (
              <>
                <p className="font-sans text-sm font-bold text-Sambucus">
                  {userDetails.name}
                </p>
                <p className="font-sans text-xs font-normal text-Charcoal">
                  {userDetails.email}
                </p>
              </>
            ) : (
              <>
                <Skeleton width={80} height={16} />
                <Skeleton width={120} height={12} />
              </>
            )}
          </div>
        </div>
        <button onClick={handleLogout}>
          <FiLogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
=======
'use client'

import { FiLogOut } from "react-icons/fi"
import { RiSearchLine } from "react-icons/ri"
import NavLinks from "./nav-links"
import { IoClose } from "react-icons/io5";

const Sidebar = ({ openMobileMenu, setOpenMobileMenu }: { openMobileMenu: boolean, setOpenMobileMenu: () => void }) => {
	return (
		<div
			className={`${openMobileMenu ? 'translate-x-0' : '-translate-x-full'} 
			xl:translate-x-0 transition duration-500 flex bg-white h-dvh z-50 fixed w-[272px] px-4 pt-7 flex-col justify-between`}>

			<div className="space-y-5">
				<div className="flex items-center justify-between">
					<img src='/image/logo.png' alt="logo" className="w-[122px] h-[38px]" />
					<IoClose size={30} onClick={setOpenMobileMenu} className="block xl:hidden place-self-end" />
				</div>

				<div className="border border-[#D0D5DD] w-[240px] flex items-center gap-3 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
					<RiSearchLine className="text-2xl" />
					<input
						className="outline-none border-none w-full group-hover:ring ring-primary"
						type="text"
						placeholder="Search Apps"
					/>
				</div>

				<NavLinks onNavLinkClick={setOpenMobileMenu} isMobile={openMobileMenu} />
			</div>

			<div className="flex items-center justify-between my-6 overflow-hidden">
				<div className="flex items-center gap-3">
					<img
						className="w-10 h-10"
						src="/image/avatar.png"
						alt="avatar"
					/>

					<div className='truncate'>
						<p className="font-sans text-sm font-bold text-Sambucus">
							Alison Eyo
						</p>
						<p className="font-sans text-xs font-normal text-Charcoal">
							alison.e@rayna.ui
						</p>
					</div>
				</div>
				<button onClick={() => { }}>
					<FiLogOut />
				</button>
			</div>
		</div>
	)
}


export default Sidebar;
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
