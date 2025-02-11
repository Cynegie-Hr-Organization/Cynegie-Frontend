import DetailGroup from "@/app/_components/shared/detail-group";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import usePayrollSlip from "../hooks/usePayrollSlip";
import { color } from "@/constants";
import Image from "next/image";

const PayrollSlip = () => {
  const { payslipSummaryDetails } = usePayrollSlip();
  return (
    <div className="flex flex-col gap-4">
      <div
        className={`bg-[${color.info.dark}] flex items-center sm:justify-center p-10 card-title-large !text-white mt-[-22] mx-[-25] relative gap-10`}
      >
        <div
          className="static sm:absolute left-10"
          style={{
            minWidth: "81px",
            height: "25.43px",
            backgroundImage: 'url("/image/logo-white.png")',
          }}
        >
          <Image src="/image/logo-white.png" width={81} height={25.43} alt="" />
        </div>
        <div>PAYSLIP JULY 2024</div>
      </div>
      <div className="common-card">
        <div className="card-title-small mb-4">Payslip Summary</div>
        <DetailGroup gridLayout="3-columns" details={payslipSummaryDetails} />
      </div>
      <Table
        title="Earnings Breakdown"
        headerRowData={["Description", "Hours Worked", "Rate", "Amount"]}
        bodyRowData={Array(2).fill({
          description: "Regular Hours",
          hoursWorked: 40,
          rate: "N5,300.00",
          amount: "N550,000.00",
        })}
        fieldTypes={Array(4).fill(FieldType.text)}
        displayedFields={["description", "hoursWorked", "rate", "amount"]}
        hasSearchFilter={false}
        hasPagination={false}
      />
      <Table
        title="Deductions Breakdown"
        headerRowData={["Description", "Amount"]}
        bodyRowData={Array(2).fill({
          description: "Tax",
          amount: "N90,000.00",
        })}
        fieldTypes={Array(2).fill(FieldType.text)}
        displayedFields={["description", "amount"]}
        hasSearchFilter={false}
        hasPagination={false}
      />
    </div>
  );
};

export default PayrollSlip;
