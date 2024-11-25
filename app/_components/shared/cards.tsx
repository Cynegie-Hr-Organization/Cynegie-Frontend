import { ReactNode } from "react";

const CardLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`border border-[#E5E7EB] p-6 rounded-xl ${className}`}>{children}</div>;
};

export default CardLayout;
