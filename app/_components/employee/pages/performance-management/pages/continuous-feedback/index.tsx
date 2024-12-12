'use client';
import Page from '@/app/_components/shared/page';
import TabFormat from '@/app/_components/shared/tabs';
import useContinuousFeedbackPage from '../../hooks/useContinuousFeedbackPage';
import Modal from '@/app/_components/employee/modal';

const EmployeePerformanceManagementContinuousFeeback = () => {
  const {
    continuousFeedbackPageData,
    requestFeedbackModalData,
    giveFeedbackModalData,
    successModalData,
    tableTabs,
  } = useContinuousFeedbackPage();

  return (
    <Page {...continuousFeedbackPageData}>
      <TabFormat tabs={tableTabs} />
      <Modal {...requestFeedbackModalData} />
      <Modal {...giveFeedbackModalData} />
      <Modal {...successModalData} />
    </Page>
  );
};

export default EmployeePerformanceManagementContinuousFeeback;
