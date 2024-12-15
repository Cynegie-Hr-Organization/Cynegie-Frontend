"use client"

import SuccessSvg from "@/app/(pages)/hr-admin/(pages)/onboarding/template/new-hire-list/SuccessSvg";
import AppButton from "@/app/_components/shared/button";
import { DrawerDialog } from "@/components/drawer/modal";
import { DrawerTitle } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const PayrollApproval = () => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2">
        <IoIosArrowBack size={24} /> Back to Payroll Management
      </button>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Payroll Approval</h3>

        <div className="rounded-lg bg-primary w-full h-[137px] p-5 blue-card-decoration flex items-center">
          <div className="space-y-2">
            <p className="text-white font-semibold">Available Balance</p>
            <div className="overflow-hidden h-max">
              <p className="text-white text-2xl font-bold animate-slide-up">₦300,286,000.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[10px] md:p-4 lg:p-6 p-2 space-y-4 py-5">
          <h6 className="text-lg font-bold">Detail Payment</h6>
          <TransactionDetailItem label="Total Gross Pay" value="₦1,440,000.00" />
          <TransactionDetailItem label="Total Tax Deductions" value="144,000" />
          <TransactionDetailItem label="Total Pension Deductions" value="₦90,000.00" />
          <TransactionDetailItem label="Total Other Deductions" value="₦23,000.00" />
          <TransactionDetailItem label="Total Bonuses" value="₦62,000" />
          <hr className="border-b-1 border-gray-200" />
          <TransactionDetailItem label="Total Payroll Cost" value="₦1,286,000.00" />
        </div>

        <FooterButtons
          btn1Label="Cancel"
          btn2Label="Approve"
          onBtn1Click={() => { }}
          onBtn2Click={() => { }}
        />
      </div>
    </div>
  )
}



const TransactionDetailItem = ({ label, value, pillValue }: { label: string, value?: string, pillValue?: string }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-black font-bold">{value}</p>
      {pillValue && <p className="text-sm font-semibold text-green-600 bg-green-50 rounded-full px-2 py-1 w-fit text-nowrap">{pillValue}</p>}
    </div>
  )
}

const FooterButtons = ({ btn1Label, btn2Label, onBtn1Click, onBtn2Click, className }: {
  btn1Label: string, btn2Label: string, onBtn1Click: () => void, onBtn2Click: () => void, className?: string
}) => {
  return (
    <div className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ''}`}>
      <AppButton
        label={btn1Label}
        className="btn-secondary"
        onClick={onBtn1Click}
      />
      <SuccessModal trigger={<AppButton label={btn2Label} className="disabled:btn-inactive btn-primary" onClick={onBtn2Click} />} />
    </div>
  )
}

const SuccessModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const router = useRouter()
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DrawerTitle className="flex justify-center"><SuccessSvg /></DrawerTitle>}
      footer={
        <div className="flex justify-center w-full">
          <AppButton label="Continue To Payroll Dasbboard" className="btn-primary md:w-[242px] text-sm text-nowrap" onClick={() => router.push('/finance-admin/payroll-management')} />
        </div>
      }
    >
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-bold">Payroll Cycle has been Approved Successfully </h3>
        <p className="text-sm text-gray-400">Payment will be processed according to the scheduled start date</p>
      </div>
    </DrawerDialog>
  )
}

export default PayrollApproval