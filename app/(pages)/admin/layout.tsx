"use client"

import Header from "@/app/_components/shared/header";
import Sidebar from "@/app/_components/shared/sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="bg-[#F9FAFB] h-dvh overflow-y-scroll">
        <Header />
        <main className="max-w-[960px] mx-auto">
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminLayout