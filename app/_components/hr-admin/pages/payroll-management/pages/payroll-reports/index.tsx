"use client";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { useRouter } from "next/navigation";

const HrAdminPayrollReportsPage = () => {
  const router = useRouter();
  return (
    <Page
      title="Payroll Reports"
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Generate Custom Report",
        onClick: () => router.push("/hr-admin/payroll/generate-payroll-report"),
      }}
    >
      <Table
        hasActionsColumn
        headerRowData={[
          "Report Name",
          "Date Generated",
          "Payroll Period",
          "No of Employees",
          "Status",
        ]}
        displayedFields={Array(4).fill("")}
        fieldTypes={Array(4).fill(FieldType.text)}
        bodyRowData={[]}
      />
    </Page>
  );
};

export default HrAdminPayrollReportsPage;
