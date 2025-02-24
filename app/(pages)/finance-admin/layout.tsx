"use client";

import Header from "@/app/_components/shared/header";
import { Suspense, useState } from "react";
import FinanceAdminSidebar from "./components/sidebar";

const FinanceAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinanceAdminSidebar
        setOpenMobileMenu={handleToggleMenu}
        openMobileMenu={toggleMenu}
      />
      <div className="bg-[#F9FAFB] h-dvh overflow-y-scroll w-full xl:pl-64 relative">
        <div
          className={`bg-black bg-opacity-30 fixed inset-0 z-20 ${toggleMenu ? "block" : "hidden"}`}
        ></div>
        <Header onMenuClick={handleToggleMenu} />

        <main className="max-w-[1056px] xl:max-w-[1150px] 2xl:max-w-[1340px] 3xl:max-w-[1440px] mx-auto mt-6 px-4">
          {children}
        </main>
      </div>
    </Suspense>
  );
};

export default FinanceAdminLayout;
