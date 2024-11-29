'use client';

import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/utils/getUserDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({
  onMenuClick,
  onNotificationClick,
}: {
  onNotificationClick?: () => void;
  onMenuClick: () => void;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUserName(userDetails.name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();

    // Populate the date client-side
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="flex items-center justify-between p-5 md:border-b md:border-DreamyCloud md:bg-white">
      <div className="items-center hidden gap-3 xl:flex">
        <img
          className="w-[40px] h-[40px]"
          src="/image/avatar.png"
          alt="avatar"
        />

        <div>
          {loading ? (
            <p className="font-sans text-lg font-bold text-Sambucus">
              Welcome, <Skeleton width={100} /> 👋
            </p>
          ) : (
            <p className="font-sans text-lg font-bold text-Sambucus">
              Welcome, {userName || "User"} 👋
            </p>
          )}

          {/* Render date only after it is set on the client */}
          {currentDate && (
            <p className="font-sans text-xs font-normal text-Charcoal">
              It’s {currentDate}
            </p>
          )}
        </div>
      </div>

      <div className="items-center justify-between hidden gap-5 xl:flex">
        <select className="border-[0.9px] border-SatinWhite w-[90px] rounded-md h-[36px] outline-none text-BlackRiverFalls text-sm px-2 font-sans font-semibold">
          <option value="">Admin</option>
          <option>Samuel</option>
          <option>Lucky</option>
          <option>Tolu</option>
        </select>

        <IoIosNotificationsOutline size={25} />
      </div>

      <h3 className="xl:hidden font-semibold text-lg">Overview</h3>

      <div className="z-50 flex items-center gap-5 xl:hidden">
        <IoIosNotificationsOutline size={25} onClick={onNotificationClick} />
        <IoMenu size={28} onClick={onMenuClick} />
      </div>
    </div>
  );
};

export default Header;
