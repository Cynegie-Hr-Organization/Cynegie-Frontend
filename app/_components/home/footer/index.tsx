import { HeadingComponents } from "../common";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const GuestFooter = () => {
  return (
    <>
      <section className={"max-w-7xl mx-auto mt-32 min-h-[55vh]"}>
        <section
          className={
            "flex flex-col gap-6 lg:gap-32 justify-between lg:flex-row mb-20 px-10"
          }
        >
          {/* footer section one */}
          <header>
            <figure className={"mb-5"}>
              <img src={"./image/logo.png"} alt={"Logo"} width={200} />
            </figure>

            <p className={"max-w-sm text-slate-700"}>
              Be the first to receive all the recent updates, articles, and
              valuable materials.
            </p>
            <div className={"flex lg:flex-row items-center  gap-5 mt-5"}>
              <form>
                <input
                  type={"text"}
                  placeholder={"Email Address"}
                  className={
                    "input-field border-[1px] rounded-md w-full lg:min-w-[20rem] border-gray-200 p-2"
                  }
                />
              </form>
              <div>
                <Link
                  href={""}
                  className={`bg-PersianBlue font-semibold text-white py-3.5 lg:py-2.5 px-5 rounded-md`}
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </header>

          <div className="flex flex-col justify-between w-full gap-5 lg:gap-20 lg:flex-row">
            {/*  footer section two  */}
            <div>
              <HeadingComponents className={"text-CadetGray text-xl mb-5 "}>
                Company
              </HeadingComponents>
              <nav className={"flex flex-col text-slate-500 space-y-2.5"}>
                <Link href={""}>About Us</Link>
                <Link href={""}>Blog</Link>
                <Link href={""}>Careers</Link>
                <Link href={""}>Contact Us</Link>
                <Link href={""}>Partnerships</Link>
              </nav>
            </div>

            {/*  footer section three  */}
            <div>
              <HeadingComponents className={"text-CadetGray text-xl mb-5 "}>
                Solutions
              </HeadingComponents>
              <nav className={"flex flex-col text-slate-500 space-y-2.5"}>
                <Link href={""}>HR Management</Link>
                <Link href={""}>IT Management</Link>
                <Link href={""}>Finance Management</Link>
                <Link href={""}>Intergrations</Link>
              </nav>
            </div>

            {/*  footer section four  */}
            <div>
              <HeadingComponents className={"text-CadetGray text-xl mb-5 "}>
                Legal
              </HeadingComponents>
              <nav className={"flex flex-col text-slate-500 space-y-2.5"}>
                <Link href={""}>Terms of Service</Link>
                <Link href={""}>Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </section>

        {/*    */}
        <hr className={"border-2 mb-10"} />
        <section
          className={
            "flex flex-col lg:flex-row text-center gap-4 lg:text-left items-center justify-between px-10"
          }
        >
          <p className={"text-slate-500"}>
            &copy; 2024 Cynergie. All rights reserved.
          </p>
          <div className={"flex gap-5 "}>
            <i
              className={
                "w-8 h-8 bg-PersianBlue grid place-content-center rounded-full"
              }
            >
              <FaFacebook className={"text-white"} />
            </i>
            <i
              className={
                "w-8 h-8 bg-PersianBlue grid place-content-center rounded-full"
              }
            >
              <FaTwitter className={"text-white"} />
            </i>
            <i
              className={
                "w-8 h-8 bg-PersianBlue grid place-content-center rounded-full"
              }
            >
              <FaInstagram className={"text-white"} />
            </i>
            <i
              className={
                "w-8 h-8 bg-PersianBlue grid place-content-center rounded-full"
              }
            >
              <FaLinkedin className={"text-white"} />
            </i>
          </div>
        </section>
      </section>
    </>
  );
};

export default GuestFooter;
