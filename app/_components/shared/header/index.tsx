"use client";

import { getUserDetails } from "@/utils/getUserDetails";
import { useFetchSecurityAlertsMetric } from "@/utils/it-admin/useFetchMetrics";
import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RecentActivities from "../../it-admin/pages/it-admin/recent-activities";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { data: securityAlertsData, isLoading: isLoading } =
    useFetchSecurityAlertsMetric();
  const { recentAlerts = [] } = securityAlertsData || {};

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails) {
          setUserName(userDetails?.name);
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

  const handleNotificationClick = async () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between p-5 md:border-b md:border-DreamyCloud md:bg-white">
      <div className="items-center hidden gap-3 xl:flex">


        <div>
          {loading ? (
            <ProfileSkeleton />
          ) : (
            <div className="flex items-center gap-2">
              <img
                className="w-[40px] h-[40px]"
                src="/image/avatar.png"
                alt="avatar"
              />
              <div className="space-y-1">
                <p className="font-sans text-lg font-bold text-Sambucus">
                  Welcome, {userName || "User"} 👋
                </p>
                {currentDate && (
                  <p className="font-sans text-xs font-normal text-Charcoal">
                    It’s {currentDate}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="items-center justify-between hidden gap-5 xl:flex">
        <IoIosNotificationsOutline
          size={25}
          onClick={handleNotificationClick}
        />

        <select className="border-[0.9px] border-SatinWhite w-[90px] rounded-md h-[36px] outline-none text-BlackRiverFalls text-sm px-2 font-sans font-semibold">
          <option value="">Admin</option>
          <option>Samuel</option>
          <option>Lucky</option>
          <option>Tolu</option>
        </select>
      </div>

      <h3 className="xl:hidden font-semibold text-lg">Overview</h3>

      <div className="z-50 flex items-center gap-5 xl:hidden">
        <IoIosNotificationsOutline
          size={25}
          onClick={handleNotificationClick}
        />
        <IoMenu size={28} onClick={onMenuClick} />
      </div>

      {/* Notification Pop-up */}
      {isPopupVisible && (
        <div className="absolute z-50 bg-white  max-w-xs w-full top-16 right-5">
          <RecentActivities recentAlerts={recentAlerts} isLoading={isLoading} />
        </div>
      )}
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

export default Header;
