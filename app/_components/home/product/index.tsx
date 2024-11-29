"use client";
import { useState } from "react";

import { IoCheckmark, IoCubeOutline } from "react-icons/io5";


import { ContentText } from "@/utils/ElemProp";
import Cards from "../card/Cards";
import { HeadingComponents, PageTitleComponents } from "../common";
import { ProductHero } from "../hero";


const Product = () => {
  //Track the active button index
  const [activeButton, setActiveButton] = useState(0);
  // const [showContent, setShowContent] = useState(false);

  const content: ContentText[] = [
    {
      headerText: "Empower Your HR Team",
      listItems: {
        list1: "Streamline hiring and onboarding",
        list2: "Ensure compliance with real-time tracking and reporting.",
      },
      button: "Explore",
      image: "./image/Hr-team.png",
      altText: "logo",
    },
    {
      headerText: "Manage Your IT Infrastructure",
      listItems: {
        list1: "Track and manage devices and software efficiently.",
        list2: "Monitor security with instant alerts and protection tools.",
      },
      button: "Explore",
      image: "./image/It-infrastructure.png",
      altText: "logo",
    },
    {
      headerText: "Control Your Finances",
      listItems: {
        list1: "Stay on top of budgets with real-time tracking.",
        list2: "Approve and monitor transactions seamlessly.",
      },
      button: "Explore",
      image: "./image/ctrl-finance.png",
      altText: "logo",
    },
  ];

  // Function to change the active button on click
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <>
      <ProductHero />
      {/* section two */}
      <div className={"max-w-7xl mx-auto mt-32"}>
        <HeadingComponents
          subheader={
            <p
              className={
                "text-base text-Charcoal max-w-[20rem] mx-auto text-center md:max-w-lg"
              }
            >
              Discover how our solution enhances productivity, simplifies
              workflows, and delivers exceptional value.
            </p>
          }
          className={
            "text-PennBlue text-xl font-bold text-center mb-2 px-5 lg:px-10 md:text-4xl"
          }
        >
          What Makes{" "}
          <strong className={"text-CarrotOrange uppercase"}>Cynegie’s</strong>{" "}
          Different?{" "}
        </HeadingComponents>
        <div
          className={
            "flex items-center gap-5  px-3 lg:px-10 lg:flex-row overflow-x-auto py-10 lg:mt-16"
          }
        >
          <Cards
            className="min-w-[290px] p-3 py-10 bg-white shadow-lg rounded-xl"
            icon={
              <i
                className={
                  "w-8 h-8 bg-[#E6EBF9] grid place-content-center rounded-xl border border-[#E6EBF9] mb-5"
                }
              >
                <IoCubeOutline className={"text-[#335DCF]"} />
              </i>
            }
            headerText={"Streamlined Operations"}
            paragraphText={
              "Simplify complex workflows across HR, IT, and Finance with automation, eliminating manual tasks and reducing errors."
            }
          />
          <Cards
            className="min-w-[290px] p-3 py-10 bg-white shadow-lg rounded-xl"
            icon={
              <i
                className={
                  "w-8 h-8 bg-[#FFF5E6] grid place-content-center rounded-xl border border-[#E6EBF9] mb-5"
                }
              >
                <IoCubeOutline className={"text-[#FF9900]"} />
              </i>
            }
            headerText={"Real-time Insights"}
            paragraphText={
              "Gain complete visibility into every aspect of your business with reports, dashboards, and data-driven decision-making tools."
            }
          />
          <Cards
            className="min-w-[290px] p-3 py-10 bg-white shadow-lg rounded-xl"
            icon={
              <i
                className={
                  "w-8 h-8 bg-[#E7F6EC] grid place-content-center rounded-xl border border-[#E6EBF9] mb-5"
                }
              >
                <IoCubeOutline className={"text-[#0F973D]"} />
              </i>
            }
            headerText={"Secure and Compliant"}
            paragraphText={
              "Ensure your company stays secure and compliant with built-in tools for auditing and monitoring, across all departments"
            }
          />
        </div>
      </div>
      {/* section three */}
      <div className={"max-w-7xl mx-auto mt-28 px-5 lg:px-10"}>
        <div className={"lg:grid lg:place-content-center mb-10"}>
          <PageTitleComponents
            subtitle={
              <p
                className={
                  "text-base text-Charcoal font-normal text-center leading-normal lg:text-start"
                }
              >
                Our platform combines cutting-edge tools and automation to help
                you manage your workforce seamlessly across HR, IT, and Finance.
                From payroll to IT asset management, you’ll have everything you
                need to run your operations smoothly.
              </p>
            }
            className={
              "text-PennBlue text-4xl font-bold max-w-4xl text-center mx-auto mb-2 "
            }
          >
            For businesses of all sizes, from startups to enterprise-level
            organizations.
          </PageTitleComponents>
        </div>

        {/*  card   */}
        <div
          className={
            "space-y-8 lg:grid lg:gap-10 lg:place-items-center  lg:grid-cols-2 lg:space-y-0"
          }
        >
          <Cards
            headerText={
              <h1
                className={
                  "text-[#041A14] text-base font-semibold md:text-4xl lg:text-2xl"
                }
              >
                End-to-End Employee Management
              </h1>
            }
            paragraphText={
              <p
                className={
                  "text-[#71717A] max-w-sm text-sm mb-5 md:text-base md:max-w-full"
                }
              >
                Handle everything easily from recruitment to offboarding with
                automated workflows and easy-to-use dashboards.
              </p>
            }
            image={{ src: "./image/employee-mgnt.png", alt: "HireTalent" }}
            className={
              " border-2 rounded-2xl grid place-content-center bg-gradient-to-b from-[#FFFFFF] to-[#F6F7F8] lg:w-[98%] lg:h-[500px] px-5  py-8"
            }
          />

          <Cards
            headerText={
              <h1
                className={
                  "text-[#041A14] text-base font-semibold md:text-4xl lg:text-2xl"
                }
              >
                Integrated Payroll System
              </h1>
            }
            paragraphText={
              <p
                className={
                  "text-[#71717A] max-w-sm text-sm mb-5 md:text-base md:max-w-full"
                }
              >
                Simplify payroll processing, tax calculations, and employee
                compensation with accuracy and compliance built-in.
              </p>
            }
            image={{ src: "./image/integration-payroll.png", alt: "HireTalent" }}
            className={
              "border-2 rounded-2xl grid place-content-center bg-gradient-to-b from-[#FFFFFF] to-[#F6F7F8] lg:w-[98%] lg:h-[500px] px-5  py-8"
            }
          />

          <Cards
            headerText={
              <h1
                className={
                  "text-[#041A14] text-base font-semibold md:text-4xl lg:text-2xl"
                }
              >
                IT Device and Asset Management
              </h1>
            }
            paragraphText={
              <p
                className={
                  "text-[#71717A] max-w-sm text-sm mb-5 md:text-base md:max-w-full"
                }
              >
                Seamlessly track, manage, and secure devices, software, and
                digital assets while ensuring smooth IT operations.
              </p>
            }
            image={{ src: "./image/attendance.png", alt: "HireTalent" }}
            className={
              " border-2 rounded-2xl grid place-content-center bg-gradient-to-b from-[#FFFFFF] to-[#F6F7F8] lg:w-[98%] lg:h-[500px] px-5  py-8"
            }
          />

          <Cards
            headerText={
              <h1
                className={
                  "text-[#041A14] text-base font-semibold md:text-4xl lg:text-2xl"
                }
              >
                Finance Control Center
              </h1>
            }
            paragraphText={
              <p
                className={
                  "text-[#71717A] max-w-sm text-sm mb-5 md:text-base md:max-w-full"
                }
              >
                Monitor budgets, oversee transactions, and generate financial
                reports with real-time insights into your company’s financial
                health.
              </p>
            }
            image={{ src: "./image/finace-control.png", alt: "HireTalent" }}
            className={
              " border-2 rounded-2xl grid place-content-center bg-gradient-to-b from-[#FFFFFF] to-[#F6F7F8] lg:w-[98%] lg:h-[500px] lg:mx-2 px-5  py-8"
            }
          />

          <Cards
            headerText={
              <h1 className={"text-[#232323] text-2xl font-bold "}>
                Performance Management
              </h1>
            }
            paragraphText={
              <p className={"text-[#9A9A9A]   mb-5"}>
                Set goals, conduct performance reviews, and provide continuous
                feedback to help your employees thrive.
              </p>
            }
            className={
              "col-span-2 self-center lg:w-[98%] bg-gradient-to-b from-[#FFFFFF] to-[#F6F7F8] px-5  pt-8 rounded-xl"
            }
          >
            <div className={"flex flex-col gap-8 lg:flex-row"}>
              <figure>
                <img
                  src={"./image/performance-review.png"}
                  alt="Performace Review"
                  width={700}
                />
              </figure>
              <figure>
                <img src={"./image/set-goal.png"} alt="Set Goal" width={700} />
              </figure>
            </div>
          </Cards>
        </div>
      </div>

      {/**/}
      <section className={"bg-PersianBlue mt-32 py-16 "}>
        <div className={"max-w-7xl mx-auto px-5 lg:px-10"}>
          <div className={"flex flex-col items-center justify-between"}>
            {/* icon */}
            <i
              className={
                "w-12 h-12 bg-white grid place-content-center rounded-xl border border-[#E6EBF9] mb-5"
              }
            >
              <IoCubeOutline className={"text-PennBlue"} />
            </i>
            <PageTitleComponents
              subtitle={
                <p
                  className={
                    "text-white text-base inline-block max-w-[21rem] font-medium leading-normal md:max-w-full lg:max-w-sm lg:text-sm"
                  }
                >
                  Discover how our solution enhances productivity, simplifies
                  workflows, and delivers exceptional value.
                </p>
              }
              className={
                "text-white text-center text-2xl max-w-lg font-bold mb-5 leading-tight lg:text-4xl"
              }
            >
              Discover how our solution enhances productivity
            </PageTitleComponents>
            <Cards
              className={"bg-white py-3.5 w-full rounded-xl px-5 lg:w-8/12 "}
            >
              <div
                className={
                  "flex items-center justify-center font-semibold text-nowrap"
                }
              >
                <button
                  className={`px-5 py-3 rounded-xl ${activeButton === 0 ? "bg-PersianBlue text-white" : "text-PennBlue"}`}
                  onClick={() => handleButtonClick(0)}
                >
                  Hr Suite
                </button>
                <button
                  className={`px-5 py-3 rounded-xl ${activeButton === 1 ? "bg-PersianBlue text-white" : "text-PennBlue"}`}
                  onClick={() => handleButtonClick(1)}
                >
                  Systems
                </button>
                <button
                  className={`px-5 py-3 rounded-xl ${activeButton === 2 ? "bg-PersianBlue text-white" : "text-PennBlue"}`}
                  onClick={() => handleButtonClick(2)}
                >
                  Finance
                </button>
              </div>
            </Cards>
            <div
              className={
                "flex flex-col justify-between gap-10 mt-20 md:flex-row lg:flex-row"
              }
            >
              <div className={"text-white"}>
                <h1 className={"text-2xl mb-5 font-bold lg:text-4xl"}>
                  {content[activeButton].headerText}
                </h1>
                <ul className={"space-y-2 mb-10"}>
                  <li className={"flex items-center gap-5"}>
                    <i className={"bg-[#335DCF] p-1 rounded-full"}>
                      <IoCheckmark />
                    </i>
                    {content[activeButton].listItems.list1}
                  </li>
                  <li className={"flex items-center gap-5 max-w-sm"}>
                    <i className={"bg-[#335DCF] p-1 rounded-full"}>
                      <IoCheckmark />
                    </i>
                    {content[activeButton].listItems.list2}
                  </li>
                </ul>
                <button
                  className={
                    "border-white border px-8 py-2 rounded-md bg-[#F3A218]"
                  }
                >
                  {content[activeButton].button}
                </button>
              </div>
              <figure>
                <img
                  src={content[activeButton].image}
                  alt={content[activeButton].altText}
                  width={400}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
