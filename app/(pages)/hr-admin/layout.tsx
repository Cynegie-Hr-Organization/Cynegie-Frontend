"use client";

import Header from "@/app/_components/shared/header";
import Sidebar from "@/app/_components/shared/sidebar";
import { ReactNode, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  return (
    <>
      <Sidebar
        setOpenMobileMenu={handleToggleMenu}
        openMobileMenu={toggleMenu}
      />
      <div className="bg-[#F9FAFB] overflow-y-auto w-full xl:pl-64 relative">
        <div
          className={`bg-black bg-opacity-30 fixed inset-0 z-20 ${
            toggleMenu ? "block" : "hidden"
          }`}
        ></div>
        <Header onMenuClick={handleToggleMenu} />

        <main className="max-w-[1056px] xl:max-w-[1150px] 2xl:max-w-[1340px] 3xl:max-w-[1440px] mx-auto mt-6 px-4">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
