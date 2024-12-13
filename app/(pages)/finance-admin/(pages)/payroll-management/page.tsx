"use client"

import AppButton from "@/app/_components/shared/button";
import { useRouter } from "next/navigation";
import { TiMediaStop } from "react-icons/ti";
import PayrollManagementTable from "./table";




const PayrollManagement = () => {
  const pageCards = [
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Total Amount Processed",
      description: "₦34,886,000",
    },
    {
      icon: <TiMediaStop />,
      color: "#FFF5E6",
      textColor: "#FFAD33",
      title: "Pending Payrolls",
      description: "3",
    },
    {
      icon: <TiMediaStop />,
      color: "#E7F6EC",
      textColor: "#0F973D",
      title: "Completed Payrolls",
      description: "27",
    },
    {
      icon: <TiMediaStop />,
      color: "#FBEAE9",
      textColor: "#D42620",
      title: "Rejected Payrolls",
      description: "80%",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payroll Management"
        description="Manage your payroll and organization"
        buttonLabel="Payroll Report"
        to="/finance-admin/payroll-management/report"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pageCards.map((card, index) => (
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



// const NewBudgetModal = ({ trigger }: { trigger: ReactNode }) => {
//   return (
//     <DrawerDialog trigger={trigger}
//       header={
//         <DialogTitle>
//           <p className="font-roboto text-xl font-bold">New Budget</p>
//         </DialogTitle>
//       }
//       footer={<div className="flex items-center justify-center gap-4">
//         <AppButton label="Cancel" className="btn-secondary w-[296px]" />
//         <AppButton label="Save" className="btn-primary w-[296px]" />
//       </div>}>

//       <form>
//         <div className="space-y-4">
//           <InputText label="Name" placeholder="Enter name" onChange={() => { }} value={""} id={"name"} requiredField={true} type={"text"} />
//           <AppSelect label="Department" placeholder="Select department" onChange={() => { }} requiredField={true} listItems={[
//             { label: "Department 1", value: "department-1" },
//             { label: "Department 2", value: "department-2" },
//             { label: "Department 3", value: "department-3" },
//           ]} />
//           <InputText label="Total Allocation" placeholder="0" onChange={() => { }} value={""} id={"total-allocation"} requiredField={true} type={"number"} />
//           <InputTextArea label="Description" placeholder="Enter description" onChange={() => { }} value={""} id={"description"} requiredField={true} type={"text"} />
//           <AppDatePicker
//             label="Start Date"
//             placeholder="Date"
//             selectedDate={new Date()}
//             setSelectedDate={(date) => { }}
//             requiredField
//           />
//           <AppDatePicker
//             label="End Date"
//             placeholder="Date"
//             selectedDate={new Date()}
//             setSelectedDate={(date) => { }}
//             requiredField
//           />
//         </div>
//       </form>
//     </DrawerDialog>
//   )
// }




export default PayrollManagement;