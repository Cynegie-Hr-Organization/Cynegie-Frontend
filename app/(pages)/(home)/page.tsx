import {
  CardComponent,
  CardComponent2,
  CardComponent3,
  CompanyLogo,
} from "@/app/_components/home/card";
import { PageTitleComponents } from "@/app/_components/home/common";
import { LandingHero } from "@/app/_components/home/hero";

const GuestHome = () => {
  return (
    <div className={"min-h-screen font-sans "}>
      <LandingHero />

      <div className={"mt-32"}>
        <div className={"mb-24"}>
          <PageTitleComponents
            subtitle={
              <span
                className={
                  "text-base text-Charcoal font-normal max-w-[17.5rem]  md:max-w-full lg:max-w-full lg:text-sm"
                }
              >
                With Cynegie, you are empowered to do so much more
              </span>
            }
            className={
              "text-[1.75rem] font-bold flex flex-col justify-center items-center text-PennBlue leading-normal px-5 mb-2 text-center lg:leading-relaxed lg:px-10 lg:text-3xl"
            }
          >
            Simplify HR Operation for your Team
          </PageTitleComponents>
        </div>

        <div className={"px-5 lg:px-10"}>
          <CardComponent />
          <CardComponent2 />
          <CardComponent3 />
        </div>
      </div>

      {/* partners */}
      <div className={"mt-32"}>
        <PageTitleComponents
          className={
            "flex items-center justify-center text-3xl text-PennBlue font-bold mb-10 text-center px-3.5  lg:px-10 lg:text-4xl"
          }
        >
          In association with 150+ Integrations
        </PageTitleComponents>
        <CompanyLogo />
        <div className={"flex items-center justify-center mt-12"}>
          <button
            className={
              "text-PersianBlue border-2 border-PersianBlue rounded-md py-2.5 px-5 font-semibold inline-block"
            }
          >
            See All Integrations
          </button>
        </div>
      </div>

      {/* call to action section */}
      <section
        className={"bg-PersianBlue mt-32 py-10 relative px-5 lg:pl-10 lg:py-32"}
      >
        <div className={"max-w-7xl mx-auto"}>
          <div
            className={
              "flex flex-col flex-wrap items-center  justify-between gap-10 lg:flex-row lg:gap-0"
            }
          >
            <div>
              <PageTitleComponents
                subheader={
                  <span
                    className={
                      "text-CarrotOrange text-lg font-semibold inline-block mb-5"
                    }
                  >
                    GET A DEMO
                  </span>
                }
                subtitle={
                  <p
                    className={
                      "text-white text-sm inline-block max-w-sm font-medium leading-normal"
                    }
                  >
                    Request a free, personalized demo, and discover how Cynergie
                    can transform your workforce management. Tailored for
                    businesses of any size, our platform simplifies workflows
                    and empowers your teams.
                  </p>
                }
                className={
                  "text-white text-3xl font-bold mb-5 lg:leading-relaxed lg:text-4xl lg:max-w-lg"
                }
              >
                Manage Your Employee Data and Operations Today
              </PageTitleComponents>

              {/* call to action button */}
              <div className={"flex "}>
                <button
                  className={
                    "text-white border-2 border-white rounded-md py-2.5 px-5 font-semibold inline-block"
                  }
                >
                  Request Live Demo
                </button>
              </div>
            </div>
            {/*  image  */}
            <figure className={"lg:absolute lg:bottom-0 lg:right-0 lg:hidden"}>
              <img src={"/public/image/call-to-action-2.png"} alt={"Image"} width={700} />
            </figure>{" "}
            <figure
              className={" hidden lg:absolute lg:bottom-0 lg:right-0 lg:block"}
            >
              <img src={"/image/call-to-action.png"} alt={"Image"} width={700} />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestHome;
