"use client";
import { Stack } from "@mui/material";
import PayrollReportsTable from "../../tables/payroll-reports";
import { useRouter } from "next/navigation";

const HrAdminPayrollReportsPage = () => {
  const router = useRouter();
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <Stack direction="row" alignItems="center">
        <div style={{ flexGrow: 1 }} className="section-heading">
          Payroll Reports
        </div>
        <button
          onClick={() =>
            router.push("/hr-admin/payroll/generate-payroll-report")
          }
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 0px",
            width: "250px",
            backgroundColor: "#0035C3",
          }}
        >
          Generate Custom Report
        </button>
      </Stack>
      <PayrollReportsTable />
    </Stack>
  );
};

export default HrAdminPayrollReportsPage;
