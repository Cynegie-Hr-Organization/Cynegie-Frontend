import { ReactNode } from "react";

const CardLayout = ({
  children,
  className,
  bg = "bg-white border-[#E5E7EB] p-6",
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) => {
  return (
    <div className={`border  rounded-xl ${className} ${bg}`}>{children}</div>
  );
};

export default CardLayout;
