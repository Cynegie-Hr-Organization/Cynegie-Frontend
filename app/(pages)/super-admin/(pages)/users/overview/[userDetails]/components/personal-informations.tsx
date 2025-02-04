import { ICompanyUser } from "@/app/_core/interfaces/user";
import DetailBlock from "./details-block";

const PersonalInformation = ({ userData, isLoading }: { userData?: ICompanyUser, isLoading?: boolean }) => {
  const { firstName, lastName, email, company, } = userData ?? {}

  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Bio Details</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="First Name" value={firstName ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Middle Name" value="missing" isLoading={isLoading} />
          <DetailBlock label="Last Name" value={lastName ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Email Address" value={email ?? 'NIL'} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Phone Number" value="09010101010" isLoading={isLoading} />
          <DetailBlock label="Date of Birth" value="13 Mar - 1988" isLoading={isLoading} />
          <DetailBlock label="Country" value="Nigeria" isLoading={isLoading} />
          <DetailBlock label="Street Address" value="67, Ade Crescent, Iloyi" isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="City" value="Lagos" isLoading={isLoading} />
          <DetailBlock label="State" value="Lagos" isLoading={isLoading} />
          <DetailBlock label="Postal Code" value="100456" isLoading={isLoading} />
          <DetailBlock label="Nationality" value="Nigerian" isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Marital Status" value="Marital Status" isLoading={isLoading} />
          <DetailBlock label="ID Upload" value="ID.pdf" valueClassName="text-primary" isLoading={isLoading} />
          <DetailBlock label="Passport" value="Passport.pdf" valueClassName="text-primary" isLoading={isLoading} />
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
