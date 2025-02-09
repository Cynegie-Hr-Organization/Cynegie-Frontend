"use client";

import AppButton from "@/app/_components/shared/button";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import { useRouter } from "next/navigation";

const PayrollReportGenerator = () => {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Payroll Report Generator</h3>

      <div className="common-card space-y-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-4">
          <AppSelect
            label="Select Report Type"
            placeholder="Select Type"
            listItems={[
              { label: "Payroll Summary", value: "payroll-summary" },
              {
                label: "Employee Payroll Details",
                value: "employee-payroll-summary",
              },
              { label: "Tax Reports", value: "tax-reports" },
              { label: "Benefit Report", value: "benefit-report" },
              { label: "Deduction Reports", value: "deduction-reports" },
              { label: "Compliance Reports", value: "compliance-reports" },
            ]}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <AppDatePicker
            label="Select Payroll Period"
            placeholder="Select Date"
            selectedDate={new Date()}
            setSelectedDate={() => {}}
          />
        </div>

        <div className="space-y-4">
          <p className="font-roboto font-semibold text-base">
            Employee Filters
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <AppMultipleSelect
              label="Filter by Department"
              placeholder="Select Department"
              items={[
                { label: "Engineering", value: "engineering" },
                { label: "Product", value: "product" },
                { label: "Marketing", value: "marketing" },
                { label: "Admin", value: "admin" },
                { label: "Human Resource", value: "human-resource" },
                { label: "Brand", value: "brand" },
                { label: "Sales", value: "sales" },
                { label: "Finance", value: "finance" },
              ]}
              onSelectionChange={(value) => {
                console.log(value);
              }}
            />
            <AppSelect
              label="Filter by Employment Type"
              placeholder="Select Type"
              listItems={[
                { label: "Full-Time", value: "full-time" },
                { label: "Part-Time", value: "part-time" },
                { label: "Contract Workers", value: "contract-workers" },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
            <AppSelect
              label="Filter by Location"
              placeholder="Select Location"
              listItems={[
                { label: "Location 1", value: "location-1" },
                { label: "Location 2", value: "location-2" },
                { label: "Location 3", value: "location-3" },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-roboto font-semibold text-base">
            Report Customization
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <AppSelect
              label="Choose Specific Data Points"
              placeholder="Select Data Points"
              listItems={[
                { label: "Salary", value: "salary" },
                { label: "Deductions", value: "deductions" },
                { label: "Taxes", value: "taxes" },
                { label: "Bonuses", value: "bonuses" },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
            <AppSelect
              label="Select Visual Representation"
              placeholder="Select Representation"
              listItems={[
                { label: "Bar Chart", value: "bar-chart" },
                { label: "Pie Chart", value: "pie-chart" },
              ]}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </div>
      </div>

      <FooterButtons
        btn1Label="Save & Continue Later"
        btn2Label="Generate Report"
        onBtn1Click={() => {}}
        onBtn2Click={() => {
          router.push("/finance-admin/payroll-management");
        }}
      />
    </div>
  );
};

const FooterButtons = ({
  btn1Label,
  btn2Label,
  onBtn1Click,
  onBtn2Click,
  className,
}: {
  btn1Label: string;
  btn2Label: string;
  onBtn1Click: () => void;
  onBtn2Click: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ""}`}
    >
      <AppButton
        label={btn1Label}
        className="btn-secondary"
        onClick={onBtn1Click}
      />
      <AppButton
        label={btn2Label}
        className="disabled:btn-inactive btn-primary"
        onClick={onBtn2Click}
      />
    </div>
  );
};
export default PayrollReportGenerator;
