import PageTitleComponents from "../common/PageTitleComponents"
import { IntegrationData, integrationData } from "./data"

const Integration = () => {
  return (
    <div className="bg-[#F8F9F9]">
      <div className="">
        <div className='bg-PersianBlue md:px-20 px-5 py-20 flex flex-col gap-5 md:justify-center md:items-center'>
          <PageTitleComponents
              className='text-[36px] md:text-[56px] md:w-[700px] font-roboto text-left md:text-center text-white font-bold'
              subtitle={
              <p className='text-DreamyCloud text-lg font-sans font-normal text-left md:text-center mt-5'>
                  Tell us which service you’d love to use and we’ll send a custom code.
              </p>
              }
          >
              Cynegie API Connections for <span className="text-MaximumYellowRed">Employee Services</span>
          </PageTitleComponents>
          <button className='text-DarkRift bg-ChefsHat text-smr px-10 py-2 md:px-40 rounded-lg font-bold mt-14'>Request Now </button>
        </div>

        <div className="flex items-center md:px-32 bg-white flex-col gap-4 md:flex-row justify-between border-y py-5">
          <div className="flex items-center gap-5 font-sans text-base font-semibold">
            <p className="text-PersianBlue cursor-pointer">All Apps</p>
            <p className="cursor-pointer">Featured</p>
            <div className="flex items-center gap-2 cursor-pointer">
              <p>Categories</p>
              <img src="/down-arrow-icon.svg" alt="down-arrow-icon" />
            </div>
          </div>

            <div className="border border-#D0D5DD w-[375px] flex items-center gap-3 p-3 rounded-[6px]">
              <img src="/search-icon.svg" alt="search-icon" />
              <input className="outline-none" type="text" placeholder="Search Apps" />
            </div>
        </div>

        <p className="text-xl hidden md:block font-semibold font-roboto px-32 text-Charcoal my-5">All Apps</p>

        <div className="md:px-32 px-5 mt-10 flex flex-wrap md:gap-40 gap-5 justify-center">
          {integrationData.map((data: IntegrationData, index: number) => (
            <div key={index} className="w-[168px] md:w-[272px] md:px-5 md:py-8 md:pb-16 flex flex-col gap-3 bg-white text-Charcoal px-2 py-5 shadow-xl">
              <img className="w-[50px] h-[50px]" src={data.image} alt={data.image} />
              <p className="text-base font-sans font-semibold"> {data.title} </p>
              <p className="text-sm font-normal">{data.paragraph}</p>
            </div>
          ))}
          
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
              <img src={"./image/call-to-action.png"} alt={"Image"} width={700} />
            </figure>{" "}
            <figure
              className={" hidden lg:absolute lg:bottom-0 lg:right-0 lg:block"}
            >
              <img src={"./image/call-to-action-2.png"} alt={"Image"} width={700} />
            </figure>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Integration