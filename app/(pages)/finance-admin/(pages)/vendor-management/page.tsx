"use client";

import AddVendorModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/add-modal";
import AppButton from "@/app/_components/shared/button";
import { LuPlus } from "react-icons/lu";
import { VendorTable } from "./components/tables";





const FinanceAdminVendors = () => {
  return (
    <div className="space-y-8 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-black font-roboto">Vendor Management </h3>
        <AddVendorModal trigger={
          <AppButton label="Add Vendor" className="btn-primary hidden md:block" />
        } />

        <AddVendorModal trigger={
          <button className="btn-primary py-2 px-2 rounded-full md:hidden block" >
            <LuPlus size={24} strokeWidth={3} />
          </button>
        } />
      </div>

      <VendorTable />
    </div>
  );
};

export default FinanceAdminVendors;