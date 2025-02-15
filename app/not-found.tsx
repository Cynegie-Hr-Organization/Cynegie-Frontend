'use client'

import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import NotFoundSVG from "./_components/shared/404-rafiki";





const NotFoundPage = () => {
  return (
    <div className="bg-primary flex flex-col lg:flex-row items-center justify-center p-6 h-dvh gap-6 relative">
      <div className="space-y-6 lg:space-y-12">
        <div className="flex flex-col items-center justify-center w-full md:w-[389px] h-max">
          <p className="text-2xl md:text-4xl font-bold text-white font-roboto">Oops! We couldn’t find the page you were looking for.</p>
          <p className="text-sm text-white">The page may have been moved or deleted. Let’s get you back on track.</p>
        </div>

        <div>
          <Link
            href={"/"}
            className="bg-white w-full md:w-max 
            hover:ring-1 ring-offset-2
            text-primary rounded-lg py-3 px-4 flex items-center 
            gap-2 font-bold no-underline hover:no-underline transition-all duration-300 hover:text-primary">
            <FaArrowLeftLong className="text-primary" /> Go back to Homepage
          </Link>
        </div>

      </div>


      <div className="w-full lg:w-[500px] h-80 lg:h-[500px]">
        <NotFoundSVG className="w-full h-full" />
      </div>

      <div className="hidden lg:block absolute bottom-0 inset-x-0 w-full bg-white rounded-se-2xl rounded-ss-2xl" >
        <BottomNavbar />
      </div>
    </div>
  );
};


const BottomNavbar = () => {
  const menuItems = [
    { name: "Product", link: "/product" },
    { name: "Pricing", link: "/pricing" },
    { name: "Integrations", link: "/integrations" },
    { name: "About us", link: "/about-us" },
    { name: "Contact us", link: "/contact-us" },
  ];

  return (
    <nav className="flex-grow flex items-center justify-evenly p-4 px-6">
      <ul className="flex gap-x-4 font-semibold text-gray-900 m-0 items-center w-full justify-center">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.link} className="font-semibold  text-primary hover:text-primary hover:no-underline hover:border-b-2 hover:pb-1 hover:border-primary transition-all duration-300">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center">
        <a href={"/"} className="lg:mr-10 xl:mr-20 w-[87px] h-[27.32px]">
          <img
            src={"/image/logo.png"}
            alt={"Cynegie Logo"}
            className="object-cover"
          />
        </a>
      </div>
    </nav>
  );
};





export default NotFoundPage;