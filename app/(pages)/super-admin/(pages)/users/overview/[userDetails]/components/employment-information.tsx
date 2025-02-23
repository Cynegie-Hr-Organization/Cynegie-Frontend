import DetailBlock from "@/app/(pages)/super-admin/(pages)/users/overview/[userDetails]/components/details-block";
import { EmploymentInformation } from "@/app/_core/actions/user/employee";
import { localTime } from "@/lib/utils";

export const EmploymentInformationComponent = ({
  userData,
}: {
  userData?: EmploymentInformation;
}) => {
  const {
    jobTitle,
    department,
    manager,
    employmentStatus,
    hireDate,
    workLocation,
    workSchedule,
    staffId,
    probationPeriod,
    contractEndDate,
    jobDescription,
    employmentType,
    workEmail,
  } = userData ?? {};

  return (
    <div>
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">
          Employment Information
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Job Title" value={jobTitle ?? "NIL"} />
          <DetailBlock
            label="Department"
            value={department?.departmentName ?? "NIL"}
          />
          <DetailBlock label="Manager/Supervisor" value={manager ?? "NIL"} />
          <DetailBlock label="Employment" value={employmentType ?? "NIL"} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock
            label="Employment Status"
            value={employmentStatus ?? "NIL"}
          />
          <DetailBlock
            label="Hire Date"
            value={hireDate ? localTime(hireDate, "dd - MMM - yyyy") : "NIL"}
          />
          <DetailBlock label="Work Location" value={workLocation ?? "NIL"} />
          <DetailBlock label="Work Schedule" value={workSchedule ?? "NIL"} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Employee ID" value={staffId ?? "NIL"} />
          <DetailBlock
            label="Probabtion Period"
            value={probationPeriod ?? "NIL"}
          />
          <DetailBlock
            label="Contract End Date"
            value={
              contractEndDate
                ? localTime(contractEndDate, "dd - MMM - yyyy")
                : "NIL"
            }
          />
          <DetailBlock label="Work Email" value={workEmail ?? "NIL"} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock
            label="Work Phone Number"
            value={probationPeriod ?? "NIL"}
          />
          <DetailBlock
            label="Job Description"
            value={jobDescription ?? "NIL"}
            valueClassName="text-primary"
          />
        </div>
      </div>
    </div>
  );
};
