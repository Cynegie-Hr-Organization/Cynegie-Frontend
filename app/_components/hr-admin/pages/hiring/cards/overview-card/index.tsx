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
    <Card className={` p-2 md:p-3 text-sm space-y-4  ${className}`}>
      <div className="flex h-16 flex-row items-center gap-1 space-y-0 pb-2">
        {loading ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" /> // Skeleton for icon
        ) : (
          icon
        )}
        <div className="flex-1 mx-1 md:mx-2">
          {loading ? (
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" /> // Skeleton for title
          ) : (
            <span className="text-xs md:text-sm font-semibold text-gray-500 break-words">
              {title}
            </span> // Truncate long titles
          )}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold flex items-baseline">
          {loading ? (
            <div className="w-14 h-8 bg-gray-200 rounded animate-pulse" /> // Skeleton for value
          ) : (
            <>
              {value}
              {overall && (
                <span className="text-Tin font-light text-[20px] ml-1">
                  {overall}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OverviewCards;