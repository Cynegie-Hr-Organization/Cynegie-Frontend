"use client"

import AppButton from "@/app/_components/shared/button"
import Link from "next/link"
import SelfAssessmentTable from "./table"
import { useRouter } from "next/dist/client/components/navigation"

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



const PageHeader = ({ title, description, buttonLabel, to }: { title: string, description: string, buttonLabel: string, to: string }) => {
  const router = useRouter();

  const handleClick = () => router.push(to)


  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <AppButton onClick={handleClick} label={buttonLabel} className="btn-primary w-full" />
    </div>
  )
}
export default SelfAssessmentPage
