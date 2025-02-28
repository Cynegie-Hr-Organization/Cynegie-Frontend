"use client";
import Page from "@/app/_components/shared/page";
import Table from "@/app/_components/shared/table";
import useManagerDevelopmentPlanPage from "../../hooks/useDevelopmentPlanPage";

const ManagerPerformanceManagementDevelopmentPlan = () => {
  const { pageData, tableData } = useManagerDevelopmentPlanPage();
  return (
    <Page {...pageData}>
      <Table {...tableData} />
    </Page>
  );
};

export default ManagerPerformanceManagementDevelopmentPlan;
