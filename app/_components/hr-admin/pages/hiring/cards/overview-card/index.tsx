import { Card } from "@/app/_components/ui/card";
import React from "react";

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  loading?: boolean; // New prop for loading state
  overall?: string;
  className?: string;
}

const OverviewCards: React.FC<OverviewCardProps> = ({
  icon,
  title,
  value,
  loading = false,
  overall,
  className,
}) => {
  return (
    <Card className={`rounded-xl p-4 ${className} bg-white text-[#1B1B1B]`}>
      <div className="flex flex-row items-center gap-1 space-y-0 pb-2">
        {icon}
        <div className="mx-2 font-semibold text-base font-sans">{title}</div>
      </div>
      <div>
        <div className="text-[24px] md:text-[33px] font-bold flex items-baseline">
          {loading ? (
            <div className="w-14 h-8 mt-4 bg-gray-200 rounded animate-pulse"></div> // Skeleton loader
          ) : (
            value
          )}
          {overall && !loading && (
            <span className="text-Tin font-light text-[20px] ml-1">
              {overall}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OverviewCards;
