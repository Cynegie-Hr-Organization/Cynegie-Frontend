import { IEmployee } from "@/app/_core/actions/user/employee";
import { localTime } from "@/lib/utils";
import DetailBlock from "./details-block";

const PersonalInformation = ({ userData, isLoading }: { userData?: IEmployee, isLoading?: boolean }) => {
  const {
    firstName,
    lastName,
    email,
    city,
    country,
    dateOfBirth,
    gender,
    maritalStatus,
    nationality,
    phoneNumber,
    postalCode,
    streetAddress,
    state,
  } = userData?.personalInfo ?? {}



  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Bio Details</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="First Name" value={firstName ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Middle Name" value="..." isLoading={isLoading} />
          <DetailBlock label="Last Name" value={lastName ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Email Address" value={email ?? 'NIL'} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Phone Number" value={phoneNumber ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Date of Birth" value={dateOfBirth ? localTime(dateOfBirth, 'dd MMM - yyyy') : 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Country" value={country ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Street Address" value={streetAddress ?? 'NIL'} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="City" value={city ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="State" value={state ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Postal Code" value={postalCode ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Nationality" value={nationality ?? 'NIL'} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Gender" value={gender ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="Marital Status" value={maritalStatus ?? 'NIL'} isLoading={isLoading} />
          <DetailBlock label="ID Upload" value="ID.pdf" valueClassName="text-primary" isLoading={isLoading} />
          <DetailBlock label="Passport" value="Passport.pdf" valueClassName="text-primary" isLoading={isLoading} />
        </div>
      </div>

      <div>
        {userData?.nextOfKin?.map((kin,) => {
          const {
            fName: nextOfKinFirstName,
            lName: nextOfKinLastName,
            gender: nextOfKinGender,
            relationship: nextOfKinRelationship,
            nextPhoneNumber: nextOfKinPhoneNumber,
            nextemail: nextOfKinEmail,
            id: nextOfKinId
          } = kin ?? {}

          return (
            <div className="space-y-5" key={nextOfKinId}>
              <h3 className="text-base font-semibold text-primary">Next of Kin Details</h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailBlock label="First Name" value={nextOfKinFirstName ?? 'NIL'} />
                <DetailBlock label="Last Name" value={nextOfKinLastName ?? 'NIL'} />
                <DetailBlock label="Gender" value={nextOfKinGender ?? 'NIL'} />
                <DetailBlock label="Email Address" value={nextOfKinEmail ?? 'NIL'} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DetailBlock label="Phone Number" value={nextOfKinPhoneNumber ?? 'NIL'} />
                <DetailBlock label="Relationship" value={nextOfKinRelationship ?? 'NIL'} />
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  );
};


export default PersonalInformation;
