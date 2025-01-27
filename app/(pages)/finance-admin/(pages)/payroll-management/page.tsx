"use client"

import AppButton from "@/app/_components/shared/button";
import CardSkeleton from "@/app/_components/shared/skelentons/card";
import { usePayrollCount } from "@/app/_core/use-cases/finance/usePayroll";
import { useRouter } from "next/navigation";
import { TiMediaStop } from "react-icons/ti";
import PayrollManagementTable from "./table";




const PayrollManagement = () => {
  const { data, isLoading } = usePayrollCount();
  const { pending, processed, rejected } = data ?? {}

  const pageCards = [
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Total Amount Processed",
      description: `₦0`,
    },
    {
      icon: <TiMediaStop />,
      color: "#FFF5E6",
      textColor: "#FFAD33",
      title: "Pending Payrolls",
      description: `${pending ?? '...'}`,
    },
    {
      icon: <TiMediaStop />,
      color: "#E7F6EC",
      textColor: "#0F973D",
      title: "Completed Payrolls",
      description: `${processed ?? '...'}`,
    },
    {
      icon: <TiMediaStop />,
      color: "#FBEAE9",
      textColor: "#D42620",
      title: "Rejected Payrolls",
      description: `${rejected ?? '...'}`,
    },
  ];

  return (
    <div className="space-y-8 my-8">
      <PageHeader
        title="Payroll Management"
        description="Manage your payroll and organization"
        buttonLabel="Payroll Report"
        to="/finance-admin/payroll-management/report"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoading ? (
          <CardSkeleton numberOfCards={pageCards.length} />
        ) : pageCards.map((card, index) => (
          <div className="common-card space-y-5" key={index}>
            <div className="flex items-center gap-2">
              {card.icon && <div className="rounded-full p-2" style={{ backgroundColor: card.color, color: card.textColor }}>{card.icon}</div>}
              <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">{card.title}</h3>
            </div>
            <p className="font-roboto text-xl font-bold">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-roboto text-xl font-bold">Payrolls</h3>
        <PayrollManagementTable />
      </div>
    </div>
  )
}


const PageHeader = ({ title, description, buttonLabel, to }: {
  title: string,
  description: string,
  actionButtonLabel?: string,
  buttonLabel: string,
  to: string,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(to);
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-black font-roboto">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex items-center gap-4">
        <AppButton onClick={handleClick} label={buttonLabel} className="btn-primary w-full hidden md:block" />
      </div>
    </div>
  )
}



export default PayrollManagement;