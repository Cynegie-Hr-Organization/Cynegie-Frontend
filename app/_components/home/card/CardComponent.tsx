import { PageTitleComponents } from "../common";

const CardComponent = () => {
  return (
    <>
      <section className={"max-w-7xl mx-auto mb-24"}>
        <div
          className={
            "flex flex-col flex-wrap items-center justify-between lg:flex-row"
          }
        >
          <PageTitleComponents
            subheader={
              <span
                className={
                  "text-CarrotOrange text-xs font-semibold inline-block mb-2"
                }
              >
                YOUR SUITE
              </span>
            }
            subtitle={
              <span
                className={
                  "text-Charcoal text-sm inline-block max-w-sm font-medium"
                }
              >
                From hiring to offboarding, Cynergie simplifies employee
                management. Automate payroll, track attendance, and performance
                review, all within one centralized platform.
              </span>
            }
            className={
              "text-PennBlue text-4xl max-w-md md:max-w-xl lg:max-w-md font-bold mb-2"
            }
          >
            Efficient HR Management for Every Stage of the Employee Lifecycle
          </PageTitleComponents>
          <figure className={"mt-8 lg:mt-0"}>
            <img src={"./image/HireTalent.png"} alt={"Hire"} width={550} />
          </figure>
        </div>
      </section>
    </>
  );
};

export const CardComponent2 = () => {
  return (
    <>
      <section className={"max-w-7xl mx-auto mb-24"}>
        <div
          className={
            "flex flex-col flex-wrap items-center justify-between lg:flex-row-reverse"
          }
        >
          <PageTitleComponents
            subheader={
              <span
                className={
                  "text-CarrotOrange text-xs font-semibold inline-block mb-2"
                }
              >
                YOUR TEAM
              </span>
            }
            subtitle={
              <span
                className={
                  "text-Charcoal text-sm inline-block max-w-sm font-medium"
                }
              >
                Manage devices, software, and security effortlessly. Monitor and
                approve IT requests, keep track of assets, and safeguard your
                company&apos;s digital environment with real-time alerts.
              </span>
            }
            className={
              "text-PennBlue text-4xl max-w-md md:max-w-xl lg:max-w-md  font-bold mb-2"
            }
          >
            Centralized IT Control for Seamless Operations
          </PageTitleComponents>
          <figure className={"mt-8 lg:mt-0"}>
            <img src={"./image/team.png"} alt={"Hire"} width={550} />
          </figure>
        </div>
      </section>
    </>
  );
};

export const CardComponent3 = () => {
  return (
    <>
      <section className={"max-w-7xl mx-auto"}>
        <div
          className={
            "flex flex-col flex-wrap items-center justify-between lg:flex-row"
          }
        >
          <PageTitleComponents
            subheader={
              <span
                className={
                  "text-CarrotOrange text-xs font-semibold inline-block mb-2"
                }
              >
                YOUR FINANCE
              </span>
            }
            subtitle={
              <span
                className={
                  "text-Charcoal text-sm inline-block max-w-sm font-medium"
                }
              >
                Gain full visibility into your company&apos;s finances. Control
                budgets, oversee transactions, and generate reports with ease,
                ensuring financial accuracy and accountability across all
                departments.
              </span>
            }
            className={
              "text-PennBlue text-4xl max-w-md font-bold  mb-2 md:max-w-xl lg:max-w-md "
            }
          >
            Comprehensive Financial Oversight at Your Fingertips
          </PageTitleComponents>
          <figure className={"mt-8 lg:mt-0"}>
            <img src={"./image/finance.png"} alt={"Hire"} width={550} />
          </figure>
        </div>
      </section>
    </>
  );
};

export default CardComponent;
