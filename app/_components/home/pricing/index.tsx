import { mobilePricingData, PricingData } from "./data";
import PageTitleComponents from "../common/PageTitleComponents";

const Pricing = () => {
  return (
    <div className="">
      <div className="bg-PersianBlue md:px-20 px-5 py-20 flex flex-col gap-5 md:justify-center md:items-center">
        <PageTitleComponents className="text-[36px] md:text-[56px] md:w-[650px] font-roboto text-left md:text-center text-white font-bold ">
          Choose the Perfect Plan for Your Business
        </PageTitleComponents>
        <img
          className="mx-auto w-[1054px]"
          src="/pricing-hero-img.svg"
          alt="img"
        />
      </div>

      <div className="md:px-20 px-5 mt-20 flex flex-col justify-center items-center gap-5 py-5">
        <PageTitleComponents
          className="text-PennBlue text-center text-[32px] font-roboto font-semibold md:text-5xl md:w-[674px]"
          subtitle={
            <p className="text-Charcoal text-xl font-roboto font-normal text-center mt-5">
              Our transparent pricing ensures that you get the best value for
              every stage of your growth.
            </p>
          }
        >
          Flexible Pricing to Suit Your Business
        </PageTitleComponents>

        <div className="mx-auto w-full flex justify-center gap-3">
          <button className="text-BlueHour text-sm font- border-BlueHour border-[1.5px] px-10 py-2 rounded-lg font-bold">
            Monthly
          </button>
          <button className="text-white text-sm font- bg-BlueHour border-[1.5px] px-10 py-[9px] rounded-lg font-bold">
            Annually
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-wrap my-20 gap-5">
        <div className="text-PennBlue flex flex-col gap-7 px-5 py-10 mx-5 bg-IcyLilac rounded-[34px]  md:max-w-[361px]">
          <img className="w-9 h-9" src="/cube-icon.svg" alt="img" />
          <div>
            <h2 className="text-2xl font-roboto font-semibold mb-3">Basic</h2>
            <p className="text-lg font-sans font-semibold">
              Essentials to get started with core features and functionality.
            </p>
          </div>
          <p className="text-[40px] font-bold font-roboto">Free</p>
          <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[6.4rem] py-[15px] rounded-lg font-bold">
            Get Started
          </button>
          <div className="flex flex-col gap-5">
            <p className="text-[22px] font-roboto font-bold">
              What you will get
            </p>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">Up to 50 users</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Core HR, IT, Finance tools
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">Email Support</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Standard Reporting
              </p>
            </div>
          </div>
        </div>

        <div className="text-PennBlue flex flex-col gap-7 px-5 py-10 mx-5 shadow-lg border rounded-[34px] md:max-w-[361px]">
          <img className="w-9 h-9" src="/cube-icon.svg" alt="img" />
          <div>
            <h2 className="text-2xl font-roboto font-semibold mb-3">Pro</h2>
            <p className="text-lg font-sans font-semibold">
              Advanced features and integrations for growing teams.
            </p>
          </div>
          <p className="text-[40px] font-bold font-roboto">$5000</p>
          <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[6.4rem] py-[15px] rounded-lg font-bold">
            Get Started
          </button>
          <div className="flex flex-col gap-5">
            <p className="text-[22px] font-roboto font-bold">
              What you will get
            </p>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">Up to 200 users</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Full HR, IT, Finance suite
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Phone & Email Support
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Advanced Reporting & Analytics
              </p>
            </div>
          </div>
        </div>

        <div className="text-PennBlue flex flex-col gap-7 px-5 py-10 mx-5 bg-IcyLilac rounded-[34px] md:max-w-[361px]">
          <img className="w-9 h-9" src="/cube-icon.svg" alt="img" />
          <div>
            <h2 className="text-2xl font-roboto font-semibold">Enterprise</h2>
            <p className="text-lg font-sans font-semibold">
              Customized solutions and support for large-scale organizations.
            </p>
          </div>
          <p className="text-[40px] font-bold font-roboto mb-3">$10000</p>
          <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[6.4rem] py-[15px] rounded-lg font-bold">
            Get Started
          </button>
          <div className="flex flex-col gap-5">
            <p className="text-[22px] font-roboto font-bold">
              What you will get
            </p>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">Unlimited users</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Dedicated Account Manager
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">Priority Support</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/blue-tick.svg" alt="blue-tick" />
              <p className="text-xl font-sans font-normal">
                Custom Integrations & Reporting
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:px-20 px-5 my-20 flex flex-col justify-center items-center">
        <PageTitleComponents className="text-PennBlue text-center text-[30px] font-roboto font-semibold md:text-5xl md:w-[900px]">
          Select your company size to get updated pricing information
        </PageTitleComponents>
        <div className="flex gap-10 justify-center flex-wrap my-20">
          <div className="shadow-2xl">
            <div className="w-[148px] h-[12px] bg-BeeCluster"></div>
            <p className="text-2xl font-roboto font-medium text-PennBlue bg-IcyLilac p-6 rounded-tr-lg text-center">
              Less than 100 Employees
            </p>
            <div className="flex gap-3 bg-DrWhite pb-3 md:pb-0">
              <div className="bg-white p-3 py-9 flex flex-col justify-between md:h-[368px]">
                <div className="">
                  <p className="text-MidnightExpress text-xl font-semibold font-roboto w-20 md:w-fit mb-5">
                    Payroll Essential
                  </p>
                  <p className="text-[15px] md:w-[204px] font-semibold font-sans text-BlackRiverFalls">
                    Core payroll and worker&apos;s comp to meet your small
                    business needs.
                  </p>
                </div>
                <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1">
                  Get pricing
                </p>
              </div>
              <div className="bg-white p-3 py-9 flex justify-between md:h-[368px] flex-col gap-10">
                <div className="">
                  <p className="text-MidnightExpress text-xl font-semibold font-roboto w-20 md:w-[202px] mb-5">
                    Payroll & Time Essentials
                  </p>
                  <p className="text-[15px] font-semibold md:w-[204px] font-sans text-BlackRiverFalls">
                    Integrated payroll and time tracking designed for growing
                    teams.
                  </p>
                </div>
                <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1">
                  Get pricing
                </p>
              </div>
            </div>
          </div>

          <div className="shadow-2xl">
            <div className="w-[148px] h-[12px] bg-BeeCluster hidden md:block"></div>
            <p className="text-2xl font-roboto font-medium text-PennBlue bg-IcyLilac p-6 rounded-tr-lg text-center">
              Less than 100 Employees
            </p>
            <div className="flex gap-3 bg-DrWhite pb-3 md:pb-0">
              <div className="bg-white p-3 py-9 flex justify-between md:h-[368px] flex-col gap-[4.5rem]">
                <div className="">
                  <p className="text-MidnightExpress text-xl font-semibold font-roboto w-20 md:w-fit mb-5">
                    HR Pro
                  </p>
                  <p className="text-[15px] md:w-[204px] font-semibold font-sans text-BlackRiverFalls">
                    Full HR and payroll solutions to manage larger teams
                    effectively.
                  </p>
                </div>
                <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1">
                  Get pricing
                </p>
              </div>
              <div className="bg-white p-3 py-9 flex justify-between md:h-[368px] flex-col gap-10">
                <div className="">
                  <p className="text-MidnightExpress text-xl font-semibold font-roboto w-20 md:w-[202px] mb-5">
                    HCM Pro
                  </p>
                  <p className="text-[15px] font-semibold md:w-[204px] font-sans text-BlackRiverFalls">
                    Comprehensive HCM suite to streamline HR, payroll, and
                    compliance at scale.
                  </p>
                </div>
                <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1">
                  Get pricing
                </p>
              </div>
            </div>
            <div className="w-[148px] h-[12px] bg-BeeCluster md:hidden"></div>
          </div>
        </div>
      </div>

      <div className="2xl:px-44 flex flex-col gap-10 mb-10 justify-center">
        <div className="text-PennBlue flex flex-col md:flex-row md:gap-7 justify-around px-5 py-10 mx-5 bg-white shadow-2xl border md:max-w-full">
          <div className="flex flex-col gap-6 mb-9 md:mb-20">
            <div className="">
              <h2 className="text-[21px] font-roboto text-ArtistBlue font-bold mb-3">
                Suite Enterprise Plus
              </h2>
              <p className="text-sm font-sans font-normal w-[286px]">
                Talk to us for a comprehensive solution that meets all your
                enterprise needs.
              </p>
            </div>
            <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[6.4rem] py-[15px] rounded-lg font-bold">
              Talk to Sales
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] text-ArtistBlue font-roboto font-bold">
              Talk to us for a comprehensive solution that meets all your
              enterprise needs
            </p>
            <div className="flex items-center gap-3">
              <img className="w-[16px]" src="/tick-icon.svg" alt="tick-icon" />
              <p className="text-sm font-sans font-normal text-PennBlue">
                Optimize support and fine-tune change management with our most
                robust sandbox
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-[16px]" src="/tick-icon.svg" alt="tick-icon" />
              <p className="text-sm font-sans font-normal text-PennBlue">
                Scale your business with our highest API rate limits
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img className="w-[16px]" src="/tick-icon.svg" alt="tick-icon" />
              <p className="text-sm font-sans font-normal text-PennBlue">
                Protect your operations with enhanced disaster recovery
              </p>
            </div>
          </div>
        </div>

        <div className="text-PennBlue flex flex-col md:flex-row gap-7 md:px-20 px-5 py-10 mx-5 md:justify-between bg-white shadow-2xl border ">
          <div>
            <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[1rem] w-fit py-[10px] rounded-lg font-bold mb-2">
              New: Add-on
            </button>
            <div>
              <h2 className="text-[21px] font-roboto text-ArtistBlue font-bold mb-3">
                Advanced AI
              </h2>
              <p className="text-sm font-sans font-normal w-[286px] mb-4">
                $50 per agent/month
              </p>
            </div>

            <p className="text-sm font-sans font-normal text-PennBlue w-[308px] md:w-[529px] mb-10">
              Advanced AI that instantly understands common customer issues,
              routes tickets, and gives your teams actionable insights and
              suggestions. It comes with AI-powered tools to optimize your
              service workflows, empower agents to solve issues faster, and
              easily scale your knowledge base.
            </p>

            <div>
              <div className="flex flex-col gap-5 md:gap-x-4 md:grid grid-cols-3 max-w-[764px]">
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Intelligent triage
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Macro insights for admins
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Generative AI tools for knowledge
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Actionable insights and suggestions
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Advanced AI is available at the Professional and higher plan
                    levels.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Generative AI tools for agents
                  </p>
                </div>
              </div>
              <p className="text-sm font-sans font-normal text-PennBlue mt-5">
                Advanced AI is available at the Professional and higher plan
                levels.
              </p>
            </div>
          </div>
          <button className="text-BlueHour text-sm font-sans border-BlueHour border-[1.5px] px-[1rem] md:px-10 h-[54px] w-fit rounded-lg font-bold">
            Talk to Sales
          </button>
        </div>

        <div className="text-PennBlue flex flex-col md:flex-row gap-7 md:px-20 px-5 py-10 mx-5 md:justify-between bg-white shadow-2xl border ">
          <div>
            <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[1rem] w-fit py-[10px] rounded-lg font-bold mb-2">
              New: Add-on
            </button>
            <div>
              <h2 className="text-[21px] font-roboto text-ArtistBlue font-bold mb-3">
                Zendesk Workforce Management
              </h2>
              <p className="text-sm font-sans font-normal w-[286px] mb-4">
                $25 per agent/month
              </p>
            </div>

            <p className="text-sm font-sans font-normal text-PennBlue w-[308px] md:w-[529px] mb-10">
              For organizations managing teams in Zendesk, Workforce Management
              (WFM) is the ideal scheduling solution to meet AI-forecasted needs
              and to provide comprehensive historical and real-time reporting
              into team performance and capacity.
            </p>

            <div>
              <div className="flex flex-col gap-5 md:gap-x-4 md:grid grid-cols-3 max-w-[764px]">
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    AI-powered forecasting
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Real-time agent activity tracking
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Agent schedule views
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Automatic agent scheduling
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Agent performance reporting.
                  </p>
                </div>
              </div>
              <p className="text-sm font-sans font-normal text-PennBlue mt-5">
                Available for all Zendesk plans.
              </p>
            </div>
          </div>
          <button className="text-BlueHour text-sm font-sans border-BlueHour border-[1.5px] px-[1rem] md:px-10 h-[54px] w-fit rounded-lg font-bold">
            Talk to Sales
          </button>
        </div>

        <div className="text-PennBlue flex flex-col md:flex-row gap-7 md:px-20 px-5 py-10 mx-5 md:justify-between bg-white shadow-2xl border ">
          <div>
            <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[1rem] w-fit py-[10px] rounded-lg font-bold mb-2">
              New: Add-on
            </button>
            <div>
              <h2 className="text-[21px] font-roboto text-ArtistBlue font-bold mb-3">
                Zendesk Quality Assurance (formerly Klaus)
              </h2>
              <p className="text-sm font-sans font-normal w-[286px] mb-4">
                $35 per agent/month
              </p>
            </div>

            <p className="text-sm font-sans font-normal text-PennBlue w-[308px] md:w-[529px] mb-10">
              Automatically analyze 100% of conversations across agents, BPOs,
              channels, and languages. AI detects issues, knowledge gaps and
              coaching opportunities to improve service.
            </p>

            <div>
              <div className="flex flex-col gap-5 md:gap-x-4 md:grid grid-cols-3 max-w-[764px]">
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    AutoQA 100% coverage
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Agent feedback and coaching
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Spotlight AI insight filters
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Automatic agent scheduling
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Track performance trends
                  </p>
                </div>
              </div>
              <p className="text-sm font-sans font-normal text-PennBlue mt-5">
                Available for all Cynergie plans.
              </p>
            </div>
          </div>
          <button className="text-BlueHour text-sm font-sans border-BlueHour border-[1.5px] px-[1rem] md:px-10 h-[54px] w-fit rounded-lg font-bold">
            Talk to Sales
          </button>
        </div>

        <div className="text-PennBlue flex flex-col md:flex-row gap-7 md:px-20 px-5 py-10 mx-5 md:justify-between bg-white shadow-2xl border ">
          <div>
            <button className="text-white text-sm font-sans bg-BlueHour border-[1.5px] px-[1rem] w-fit py-[10px] rounded-lg font-bold mb-2">
              New: Add-on
            </button>
            <div>
              <h2 className="text-[21px] font-roboto text-ArtistBlue font-bold mb-3">
                Advanced Data Privacy and Protection
              </h2>
              <p className="text-sm font-sans font-normal w-[286px] mb-4">
                $50 per agent/month
              </p>
            </div>

            <p className="text-sm font-sans font-normal text-PennBlue w-[308px] md:w-[529px] mb-10">
              Support your compliance and security policy obligations with an
              extra layer of protection and privacy above and beyond the trusted
              experience we deliver to every customer.
            </p>

            <div>
              <div className="flex flex-col gap-5 md:gap-x-4 md:grid grid-cols-3 max-w-[764px]">
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Access log
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Advanced data retention policies
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Spotlight AI insight filters
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Data maskings
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="blue-tick"
                  />
                  <p className="text-sm font-sans font-normal text-PennBlue">
                    Advanced redaction
                  </p>
                </div>
              </div>
              <p className="text-sm font-sans font-normal text-PennBlue mt-5">
                Available for all Cynergie plans.
              </p>
            </div>
          </div>
          <button className="text-BlueHour text-sm font-sans border-BlueHour border-[1.5px] px-[1rem] md:px-10 h-[54px] w-fit rounded-lg font-bold">
            Talk to Sales
          </button>
        </div>
      </div>

      <div>
        <p className="text-center hidden md:block text-[40px] font-bold">
          Compare plans and features
        </p>

        {/* This code below shows pricing for desktop */}
        <div className="md:px-20 px-5 hidden md:flex justify-center gap-5 flex-wrap my-10">
          <div className=" w-[512px] flex flex-col justify-center gap-10 shadow-xl">
            <div className="bg-BlueHour h-[74px] flex items-center justify-end rounded-t-lg text-left pr-5 text-lg font-roboto font-medium text-white">
              <p>
                Payroll <br /> Essentials
              </p>
            </div>
            <p className="text-MidnightExpress font-roboto text-[22px] font-bold px-10">
              Payroll <br /> Essentials
            </p>
            <div className="flex flex-col gap-5 px-10 pb-16">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Unified workforce
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Unified workforce{" "}
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                  <img
                    className="w-[16px]"
                    src="/tick-icon.svg"
                    alt="tick-icon"
                  />
                  <p className="text-base font-sans font-semibold text-OfficeBrown">
                    Automated payroll
                  </p>
                </div>
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1 mt-5">
                Learn more
              </p>
            </div>
          </div>

          <div className=" w-[132px] flex flex-col gap-[9.6rem] shadow-xl">
            <div className="bg-BlueHour h-[74px] flex items-center px-2 rounded-t-lg text-left text-lg font-roboto font-medium text-white">
              <p>
                Payroll & time <br /> Essential
              </p>
            </div>
            <div className="flex flex-col gap-10 px-10 pb-16">
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
            </div>
          </div>

          <div className=" w-[132px] flex flex-col gap-[9.6rem] shadow-xl">
            <div className="bg-BlueHour h-[74px] flex items-center px-2 rounded-t-lg text-left text-lg font-roboto font-medium text-white">
              <p>
                HCM <br /> Essential
              </p>
            </div>
            <div className="flex flex-col gap-10 px-10 pb-16">
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
            </div>
          </div>

          <div className=" w-[132px] flex flex-col gap-[9.6rem] shadow-xl">
            <div className="bg-BlueHour h-[74px] flex items-center px-2 rounded-t-lg text-left text-lg font-roboto font-medium text-white">
              <p>
                HR <br /> Pro
              </p>
            </div>
            <div className="flex flex-col gap-10 px-10 pb-16">
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
            </div>
          </div>

          <div className=" w-[132px] flex flex-col gap-[9.6rem] shadow-xl">
            <div className="bg-BlueHour h-[74px] flex items-center px-2 rounded-t-lg text-left text-lg font-roboto font-medium text-white">
              <p>
                HCM <br /> Pro
              </p>
            </div>
            <div className="flex flex-col gap-10 px-10 pb-16">
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-[16px]"
                  src="/blue-tick-icon.svg"
                  alt="tick-icon"
                />
              </div>
            </div>
          </div>
        </div>

        {/* This code below shows pricing for mobile */}
        <div className="flex justify-center md:hidden gap-5 flex-wrap my-10">
          {mobilePricingData.map((data: PricingData, index: number) => (
            <div
              key={index}
              className="mx-5 flex flex-col border justify-center gap-10 shadow-xl"
            >
              <div className="bg-BlueHour h-[74px] flex items-center justify-center rounded-t-lg text-left pr-5 text-lg font-roboto font-medium text-white">
                <p className="text-center">{data.title}</p>
              </div>
              <p className="text-MidnightExpress font-roboto text-[22px] font-bold px-10">
                {data.title}
              </p>
              <div className="flex flex-col gap-5 px-10 pb-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature1}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature2}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature3}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature4}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature5}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature6}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature7}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature8}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature9}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[236px] border-b-SatinWhite border-b pb-2">
                    <img
                      className="w-[16px]"
                      src="/tick-icon.svg"
                      alt="tick-icon"
                    />
                    <p className="text-base font-sans font-semibold text-OfficeBrown">
                      {data.feature10}
                    </p>
                  </div>
                  <img
                    className="w-[16px]"
                    src="/blue-tick-icon.svg"
                    alt="tick-icon"
                  />
                </div>
                <p className="text-base hidden md:block font-bold font-roboto text-PennBlue border-b-2 border-VitaminC w-fit pb-1 mt-5">
                  Learn more
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className={"bg-PersianBlue mt-32 py-32 relative px-5 lg:pl-10"}>
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
                      "text-CarrotOrange text-xs font-semibold inline-block mb-5"
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
              <img
                src={"./image/call-to-action.png"}
                alt={"Image"}
                width={700}
              />
            </figure>{" "}
            <figure
              className={" hidden lg:absolute lg:bottom-0 lg:right-0 lg:block"}
            >
              <img
                src={"./image/call-to-action-2.png"}
                alt={"Image"}
                width={700}
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
