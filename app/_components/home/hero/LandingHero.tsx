import { PageTitleComponents } from "../common";
import Link from "next/link";
;

const LandingHero = () => {
  return (
    <>
      <section
        className={`max-w-7xl mx-auto mt-10 px-5 md:px-10 lg:px-10 lg:mt-32`}
      >
        <section className={`flex flex-col lg:flex-row items-center gap-10`}>
          <div>
            <PageTitleComponents
              className={`text-4xl mb-5 lg:text-5xl lg:max-w-4xl text-PennBlue font-bold `}
              subtitle={
                <p className={`text-Charcoal text-base font-medium `}>
                  Manage HR, IT, and Finance effortlessly in one unified
                  platform.
                </p>
              }
            >
              Streamline Your Work force Management with{" "}
              <span className={"text-CarrotOrange"}> Cynegie.</span>
            </PageTitleComponents>

            <div
              className={
                "flex flex-col flex-wrap gap-2.5 lg:flex-row lg:items-center lg:gap-2  mt-5 "
              }
            >
               <form>
                
                  <input
                    type={"text"}
                    placeholder={"Email Address"}
                    className={"input-field border-[1px] rounded-md w-full lg:min-w-[20rem] border-gray-200 p-[10px]"}

                  />
         
              </form>
              <div className={"flex items-center justify-center"}>
                <Link
                  href={"/"}
                  className={`bg-PersianBlue font-semibold text-center text-white py-3.5 lg:py-2.5 px-5 rounded-md w-full`}
                >
                  Explore Cynegie
                </Link>
              </div>
            </div>
          </div>

          <figure>
            <img src={"/image/dashboard.png"} alt={"Dashboard"} width={900} />
          </figure>
        </section>
      </section>
    </>
  );
};

export default LandingHero;
