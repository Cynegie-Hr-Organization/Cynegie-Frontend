"use client"

import { IoIosArrowDown } from "react-icons/io";
import AppButton from "@/app/_components/shared/button";
import { useRouter } from "next/navigation";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import TransactionsTable from "./table";
import { ReactNode } from "react";
import { DrawerDialog } from "@/components/drawer/modal";
import InputText, { InputTextArea } from "@/app/_components/shared/input-text";
import { DialogTitle } from "@/components/ui/dialog";
import { AppSelect } from "@/app/_components/shared/select";
import { AppDatePicker } from "@/app/_components/shared/date-picker";






const Transactions = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-black font-roboto">Transactions</h3>
      <TransactionsTable />
    </div>
  )
}





export default Transactions;