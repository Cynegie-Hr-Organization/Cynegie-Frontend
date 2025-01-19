"use client";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
// import PayrollBenefitsEnrollmentTable from "../../../tables/benefits-enrollment";

const HrAdminPayrollBenefitsEnrollmentPage = () => {
  const router = useRouter();
  return (
    <Stack gap={4} mb={10} mt={6}>
      <Stack direction="row" alignItems="center">
        <div style={{ flexGrow: 1 }} className="section-heading">
          Benefits Enrollment
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
            padding: "10px 30px",
            backgroundColor: "#0035C3",
          }}
        >
          Enroll Employee
        </button>
      </Stack>
      <Stack gap={2}>
        <div className="card-title-small">
          Select Employees for the benefits
        </div>
        {/* <PayrollBenefitsEnrollmentTable /> */}
      </Stack>
    </Stack>
  );
};

export default HrAdminPayrollBenefitsEnrollmentPage;
