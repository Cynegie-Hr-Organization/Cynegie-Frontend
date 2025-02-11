"use client";

import AppButton from "@/app/_components/shared/button";
import PayrollReportTable from "./table";
import { useRouter } from "next/navigation";

const PayrollReport = () => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Payroll Report</p>
        <AppButton
          label="Generate Custom Report"
          className="btn-primary"
          onClick={() => {
            router.push("/finance-admin/payroll-management/report/new");
          }}
        />
      </div>

      <PayrollReportTable />
    </div>
  );
};

export default PayrollReport;
