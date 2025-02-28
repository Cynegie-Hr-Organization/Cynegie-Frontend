"use client";
import Page from "@/app/_components/shared/page";
import Modal from "@/app/_components/employee/modal";
import TabFormat from "@/app/_components/shared/tab-format";
import useManagerContinuousFeedbackPage from "../../hooks/useContinuousFeedbackPage";

const ManagerPerformanceManagementContinuousFeeback: React.FC = () => {
  const { continuousFeedbackPageData, modalsProps, tableTabs } =
    useManagerContinuousFeedbackPage();

  return (
    <Page {...continuousFeedbackPageData}>
      <TabFormat tabs={tableTabs} />
      {modalsProps.map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </Page>
  );
};

export default ManagerPerformanceManagementContinuousFeeback;
