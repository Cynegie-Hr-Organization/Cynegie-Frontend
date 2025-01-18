"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const GuestNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Product",
      link: "/product",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Integrations",
      link: "/integrations",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    {
      name: "Contact us",
      link: "/contact-us",
    },
  ];
  return (
    <>
      <header className="flex justify-between px-4 py-8 mx-auto max-w-7xl lg:px-6 ">
        <div>
          <Link href={"/"}>
            <img
              src={"./image/logo.png"}
              alt={"Cynegie Logo"}
              width={100}
              height={100}
            />
          </Link>
        </div>

        <RxHamburgerMenu
          className="w-10 h-10 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <nav
          className={`flex flex-col lg:justify-between gap-4 font-semibold text-gray-900 absolute bg-white w-screen top-0 p-4 inset-0 h-fit z-50  ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} transition-all lg:translate-y-0 lg:static lg:w-auto lg:items-center lg:gap-10 lg:bg-transparent lg:p-0 lg:transition-none lg:flex-row`}
        >
          <div className="relative">
            <img
              src={"./image/logo.png"}
              alt={"Cynegie Logo"}
              className="max-w-32 lg:hidden"
            />
            <IoMdClose
              className="absolute top-0 right-0 w-7 h-7 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div
            className="flex flex-col gap-4 font-semibold text-gray-900 lg:flex-row"
            onClick={() => setIsMenuOpen(false)}
          >
            {menuItems.map((item, index) => (
              <Link
                onClick={() => setIsMenuOpen(false)}
                href={item.link}
                key={index}
                className={` font-semibold`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Link href={"/signin"} className={`text-PersianBlue font-semibold`}>
              Login
            </Link>
            <Link href={"/signup"} className={`btn-link-primary`}>
              Explore Cynegie
            </Link>
          </div>
        </nav>

        <div
          className={`absolute h-screen w-screen inset-0 lg:hidden bg-gray/10 z-40 ${isMenuOpen ? "block" : "hidden"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* over lay */}
        </div>
      </header>
    </>
  );
};

export default GuestNavBar;
