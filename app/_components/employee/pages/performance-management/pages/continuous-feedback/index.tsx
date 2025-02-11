"use client";
import Page from "@/app/_components/shared/page";
import useContinuousFeedbackPage from "../../hooks/useContinuousFeedbackPage";
import Modal from "@/app/_components/employee/modal";
import TabFormat from "@/app/_components/shared/tab-format";

const EmployeePerformanceManagementContinuousFeeback: React.FC = () => {
  const { continuousFeedbackPageData, modalsProps, tableTabs } =
    useContinuousFeedbackPage();

  return (
    <Page {...continuousFeedbackPageData}>
      <TabFormat tabs={tableTabs} />
      {modalsProps.map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </Page>
  );
};

export default EmployeePerformanceManagementContinuousFeeback;
