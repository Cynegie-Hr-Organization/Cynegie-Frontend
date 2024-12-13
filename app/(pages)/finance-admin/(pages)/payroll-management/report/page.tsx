"use client"

import AppButton from "@/app/_components/shared/button";
import PayrollReportTable from "./table";

const PayrollReport = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Payroll Report</p>
        <AppButton label="Generate Custom Report" className="btn-primary" />
      </div>

      <PayrollReportTable />
    </div>
  )
}

export default PayrollReport;