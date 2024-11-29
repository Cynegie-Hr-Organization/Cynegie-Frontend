import { PageTitleComponents } from "../common";

const ProductHero = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${"./image/Corporate-Team-Elegance.png"}`,
        }}
        className={
          "object-cover  bg-center bg-cover bg-no-repeat md:bg-cover lg:bg-cover"
        }
      >
        <section className="bg-PersianBlue/70  py-12 md:py-48 lg:py-64 ">
          <div className="max-w-7xl mx-auto px-5 flex flex-col justify-center items-center lg:px-10">
            <PageTitleComponents
              subtitle={
                <p
                  className={
                    "text-slate-200 text-center text-base font-medium max-w-3xl mx-auto"
                  }
                >
                  Manage HR, IT, and Finance seamlessly in one place. Empower
                  your team and drive efficiency with a system designed for
                  modern businesses.
                </p>
              }
              className={
                "text-4xl text-center  text-white font-bold lg:text-6xl mb-5"
              }
            >
              Transform Your Workforce with{" "}
              <strong className={"text-CarrotOrange"}>Cynegie’s</strong> Unified
              Platform
            </PageTitleComponents>
          </div>
        </section>
      </section>
    </>
  );
};

export default ProductHero;
