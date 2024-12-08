import { formatDate, truncateText } from "@/lib/utils";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface RecentActivity {
  id: string;
  alertTitle: string;
  description: string;
  date: string;
}

interface RecentActivitiesProps {
  recentAlerts: RecentActivity[];
  isLoading: boolean;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  recentAlerts,
  isLoading,
}) => {
  return (
    <div className="rounded-xl p-3 border-[#E6EBF9] border-[1px] bg-white">
      <div className="flex justify-between items-center mb-">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Activities
        </h2>
        <a
          href="#"
          className="text-primary text-sm font-medium hover:underline"
        >
          See all
        </a>
      </div>
      <ul className="space-y-2">
        {isLoading ? (
          // Display Skeleton Loader if data is loading
          <div className="space-y-2">
            <Skeleton height={70} />
            <Skeleton height={70} />
            <Skeleton height={70} />
          </div>
        ) : (
          recentAlerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-center border-t border-[#E5E7EB]  pt-2 space-x-4"
            >
              <div className="  flex items-center justify-center bg-blue-100 rounded-full">
                <Image
                  src={"/systemAvatar.svg"}
                  alt={"icon"}
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {alert.alertTitle}
                </p>
                <p className="text-sm text-gray-500">
                  {truncateText(alert.description, 50)}
                </p>
                <p className="text-xs my-2 text-gray-400">
                  {formatDate(alert.date)}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentActivities;
