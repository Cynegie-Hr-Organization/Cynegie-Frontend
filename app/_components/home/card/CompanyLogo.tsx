const CompanyLogo = () => {
  return (
    <section className={"max-w-7xl mx-auto px-3 lg:px-10"}>
      <div
        className={
          "grid grid-cols-2 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        <figure
          className={
            "border border-gray-600  justify-self-center rounded-md py-5 px-12"
          }
        >
          <img src={"./image/asana-logo.png"} alt={"Asana Logo"} width={200} />
        </figure>

        <figure
          className={
            "border border-gray-600 place-content-center justify-self-center rounded-md py-5 px-12"
          }
        >
          <img
            src={"./image/atlassian-logo.png"}
            alt={"Atlassia Logo"}
            width={200}
          />
        </figure>

        <figure
          className={
            "border border-gray-600 place-content-center justify-self-center rounded-md py-5 px-12"
          }
        >
          <img src={"./image/zoom-logo.png"} alt={"Zoom Logo"} width={200} />
        </figure>

        <figure
          className={
            "border border-gray-600 place-content-center justify-self-center rounded-md py-5 px-12"
          }
        >
          <img
            src={"./image/paypal-logo.png"}
            alt={"Paypal Logo"}
            width={200}
          />
        </figure>

        <figure
          className={
            "border border-gray-600 place-content-center justify-self-center rounded-md py-5 px-12"
          }
        >
          <img
            src={"./image/github-logo.png"}
            alt={"Github Logo"}
            width={200}
          />
        </figure>

        <figure
          className={
            "border border-gray-600 place-content-center justify-self-center rounded-md py-5 px-12"
          }
        >
          <img src={"./image/slack-logo.png"} alt={"Slack Logo"} width={200} />
        </figure>
      </div>
    </section>
  );
};

export default CompanyLogo;
