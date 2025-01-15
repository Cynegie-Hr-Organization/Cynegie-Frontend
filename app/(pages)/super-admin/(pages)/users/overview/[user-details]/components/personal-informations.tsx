import DetailBlock from "./details-block";

const PersonalInformation = () => {
  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Bio Details</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="First Name" value="Alibaba" />
          <DetailBlock label="Middle Name" value="Victoria" />
          <DetailBlock label="Last Name" value="Udor" />
          <DetailBlock label="Email Address" value="allivic@cynergie.co" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Phone Number" value="09010101010" />
          <DetailBlock label="Date of Birth" value="13 Mar - 1988" />
          <DetailBlock label="Country" value="Nigeria" />
          <DetailBlock label="Street Address" value="67, Ade Crescent, Iloyi" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="City" value="Lagos" />
          <DetailBlock label="State" value="Lagos" />
          <DetailBlock label="Postal Code" value="100456" />
          <DetailBlock label="Nationality" value="Nigerian" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Marital Status" value="Marital Status" />
          <DetailBlock label="ID Upload" value="ID.pdf" valueClassName="text-primary" />
          <DetailBlock label="Passport" value="Passport.pdf" valueClassName="text-primary" />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Next of Kin Details</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="First Name" value="Lagos" />
          <DetailBlock label="Last Name" value="Lagos" />
          <DetailBlock label="Gender" value="100456" />
          <DetailBlock label="Email Address" value="Nigeria" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Phone Number" value="09010101010" />
          <DetailBlock label="Relationship" value="13 Mar - 1988" />
        </div>
      </div>
    </div>
  );
};


export default PersonalInformation;
