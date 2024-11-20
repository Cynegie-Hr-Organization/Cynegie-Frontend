import { Card } from "@/app/_components/ui/card";
import React from "react";

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  overall?: string;
  className?: string;
}

const OverviewCards: React.FC<OverviewCardProps> = ({
  icon,
  title,
  value,
  overall,
  className,
}) => {
  return (
    <Card className={`rounded-xl p-4 ${className} bg-white text-[#1B1B1B] `}>
      <div className="flex flex-row items-center gap-1 space-y-0 pb-2">
        {icon}
        <div className="mx-2 font-semibold text-[16px]  font-sans">
          {title}
        </div>
      </div>
      <div>
        <div className="text-[33px] font-bold  flex items-baseline">
          {value}
          {overall && (
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
