"use client"

import Header from "@/app/_components/shared/header";
import Sidebar from "@/app/_components/shared/sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="bg-[#F9FAFB] h-dvh overflow-y-scroll w-full xl:pl-[17rem]">
        <Header />

        <main className="max-w-[1080px] 2xl:max-w-[1340px] 3xl:max-w-[1440px] mx-auto mt-6 px-4 xl:px-0">
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminLayout