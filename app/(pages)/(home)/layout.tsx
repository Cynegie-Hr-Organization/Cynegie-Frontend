// landing-layout.tsx
import Footer from "@/app/_components/home/footer";
import GuestNavBar from "@/app/_components/home/header";
import React from "react";


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GuestNavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
