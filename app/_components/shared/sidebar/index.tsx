"use client";

import { baseUrl } from "@/constants/config";
import { getUserDetails } from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import NavLinks from "./nav-links";

const Sidebar = ({
  openMobileMenu,
  setOpenMobileMenu,
}: {
  openMobileMenu: boolean;
  setOpenMobileMenu: () => void;
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
      className={`${openMobileMenu ? "translate-x-0" : "-translate-x-full"} 
			xl:translate-x-0 transition duration-500 flex bg-white h-dvh z-50 fixed w-[256px] px-3 pt-7 flex-col justify-between`}
    >
      <div className="space-y-8 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <img
              src="/image/logo.png"
              alt="logo"
              className="w-[122px] h-[38px]"
            />
            <IoClose
              size={30}
              onClick={setOpenMobileMenu}
              className="block xl:hidden place-self-end"
            />
          </div>

          <div className="border border-[#D0D5DD] w-full flex items-center gap-x-2 p-2 rounded-[6px] focus-within:border-primary hover:border-primary duration-300 transition">
            <RiSearchLine className="text-sm" />
            <input
              className="outline-none border-none w-full group-hover:ring ring-primary text-sm placeholder:text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <NavLinks
          onNavLinkClick={setOpenMobileMenu}
          isMobile={openMobileMenu}
        />
      </div>

      <div className="flex items-center justify-between py-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="truncate">
            {userDetails ? (
              <div className="flex items-center gap-2">
                <img
                  className="w-12 h-12"
                  src="/image/avatar.png"
                  alt="avatar"
                />

                <div className="space-y-0">
                  <p className="font-sans text-sm font-bold text-Sambucus">
                    {userDetails.name}
                  </p>
                  <p className="font-sans text-xs font-normal text-Charcoal">
                    {userDetails.email}
                  </p>
                </div>
              </div>
            ) : (
              <ProfileSkeleton />
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

const ProfileSkeleton = () => {
  return (
    <div className="flex gap-2">
      <Skeleton width={40} height={40} circle className="mb-0" />
      <div className="space-y-0">
        <Skeleton width={200} height={18} className="mb-0" />
        <Skeleton width={200} height={10} className="mb-0" />
      </div>
    </div>
  );
};

export default Sidebar;
