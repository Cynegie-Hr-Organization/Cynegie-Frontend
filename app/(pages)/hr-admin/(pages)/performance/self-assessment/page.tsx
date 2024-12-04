"use client"

import AppButton from "@/app/_components/shared/button"
import Link from "next/link"
import SelfAssessmentTable from "./table"
import { useRouter } from "next/dist/client/components/navigation"
import { PageHeader } from "@/app/_components/hr-admin/performance/page-header"

const SelfAssessmentPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Self Assessment"
        description="Manage access to all employee in your organization"
        buttonLabel="New Assessment"
        to="/hr-admin/performance/self-assessment/new"
      />

      <SelfAssessmentTable />
    </div>
  )
}
export default SelfAssessmentPage
