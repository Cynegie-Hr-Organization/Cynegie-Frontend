'use client'

import AppTabs from "@/app/_components/shared/tabs";
import { useGetEmployee } from "@/app/_core/use-cases/user/employee";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { CompensationTab } from "./components/compensation";
import { DocumentsInformation } from "./components/documents";
import { EmploymentInformationComponent } from "./components/employment-information";
import { EquipmentAccessInformation } from "./components/equipment-access";
import PersonalInformation from "./components/personal-informations";





type DetailsTabLabel = 'personal-information' | 'employment-information' | 'compensation' | 'documents' | 'equipments-access';

const UserDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<DetailsTabLabel>('personal-information');
  const router = useRouter();
  const id = useParams().userDetails as string
  const { data: userData, isLoading } = useGetEmployee({ id })


  const tabs = [
    {
      label: "Personal Information",
      onClick: () => setActiveTab('personal-information'),
    },
    {
      label: "Employment Information",
      onClick: () => setActiveTab('employment-information'),
    },
    {
      label: "Compensation",
      onClick: () => setActiveTab('compensation'),
    },
    {
      label: "Documents",
      onClick: () => setActiveTab('documents'),
    },
    {
      label: "Equipments & Access",
      onClick: () => setActiveTab('equipments-access'),
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4">
        <button className="text-xs flex items-center gap-1 text-gray-500" onClick={() => router.back()}>
          <IoIosArrowBack size={20} />
          Back to User Management
        </button>
        <h3 className="text-base font-bold text-gray-900">View User Details</h3>
      </div>


      <div className="space-y-4 -mx-4 lg:mx-auto">
        <div className="w-full overflow-x-auto no-scrollbar">
          <AppTabs tabs={tabs} tabHorizontalPadding="px-4" />
        </div>


        <div className="common-card mx-4 md:mx-0">
          <div className="p-4 border border-gray-200 rounded-xl">
            {activeTab === 'personal-information' && <PersonalInformation userData={userData} isLoading={isLoading} />}
            {activeTab === 'employment-information' && <EmploymentInformationComponent userData={userData?.employmentInformation} />}
            {activeTab === 'compensation' && <CompensationTab userData={userData?.compensation} />}
            {activeTab === 'documents' && <DocumentsInformation userData={userData?.documents} />}
            {activeTab === 'equipments-access' && <EquipmentAccessInformation userData={userData?.accessRights} />}
          </div>
        </div>
      </div>
    </div>
  );
};





export default UserDetailsPage;