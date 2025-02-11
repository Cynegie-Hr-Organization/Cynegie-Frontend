"use client";
import Page from "@/app/_components/shared/page";
import useLeaveManagementPage from "./hooks/useLeaveManagementPage";
import LeaveManagementChart from "./chart";
import Table from "@/app/_components/shared/table";
import Modal from "../../modal";

const EmployeeLeaveManagement: React.FC = () => {
  const { pageData, chartsData, tableData, modalsData } =
    useLeaveManagementPage();
  return (
    <Page {...pageData}>
      <div className="flex flex-col gap-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {chartsData.map((chart) => (
            <div key={chart.title} className="common-card">
              <LeaveManagementChart {...chart} />
            </div>
          ))}
        </div>
        <Table {...tableData} />
      </div>
      {modalsData.map((data, index) => (
        <Modal key={index} {...data} />
      ))}
    </Page>
  );
};

export default EmployeeLeaveManagement;
