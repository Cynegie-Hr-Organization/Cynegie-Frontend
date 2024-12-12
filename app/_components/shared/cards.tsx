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
<<<<<<< HEAD
  return (
    <div className={`border  rounded-xl ${className} ${bg}`}>{children}</div>
  );
=======
  return <div className={`border  rounded-xl ${className} ${bg}`}>{children}</div>;
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
};

export default CardLayout;
