import DetailBlock from "@/app/(pages)/super-admin/(pages)/users/overview/[userDetails]/components/details-block"
import { ICompanyUser } from "@/app/_core/interfaces/user"

export const EmploymentInformation = ({ userData }: { userData?: ICompanyUser }) => {
  return (
    <div>
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Employment Information</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Job Title" value="Software Engineer" />
          <DetailBlock label="Department" value="Product" />
          <DetailBlock label="Manager/Supervisor" value="Ifunanya Adenle" />
          <DetailBlock label="Employment" value="Full Time" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Employment Status" value="Active" />
          <DetailBlock label="Hire Date" value="11 - Feb - 2024" />
          <DetailBlock label="Work Location" value="Lagos" />
          <DetailBlock label="Work Schedule" value="9:00AM - 5:00PM" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Employee ID" value="CYN0345678" />
          <DetailBlock label="Probabtion Period" value="3 months" />
          <DetailBlock label="Contract End Dae" value="N/A" />
          <DetailBlock label="Work Email" value="work@example.com" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Work Phone Number" value="08010101010" />
          <DetailBlock label="Job Description" value="jd.pdf" valueClassName="text-primary" />
        </div>
      </div>
    </div>
  )
}


