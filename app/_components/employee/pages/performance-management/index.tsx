'use client';
import Page from '@/app/_components/shared/page';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import AppTabs from '@/app/_components/shared/tabs';
import { Grid2 } from '@mui/material';
import Modal from '../../modal';
import usePerformanceManagementPage from './hooks/usePerformanceManagementPage';
import feedbackOverviewSectionData from './sections/feedback-overview/data';
import keyPerformanceIndiciatorsSectionData from './sections/key-performance-indicators/data';
import ReviewCycleProgressSection from './sections/review-cycle-progress';




const EmployeePerformanceManagement = () => {
  const sectionsWithCards = [
    keyPerformanceIndiciatorsSectionData,
    feedbackOverviewSectionData,
  ].map((sectionData, index) => (
    <SectionWithCards {...sectionData} key={index} />
  ));

  const {
    performanceManagementPageData,
    completeModalData,
  } = usePerformanceManagementPage();

  return (
    <Page {...performanceManagementPageData}>
      <Grid2 container spacing={2}>
        {[...sectionsWithCards, <ReviewCycleProgressSection key={2} />].map(
          (component, index) => (
            <Grid2
              className='common-card'
              key={index}
              size={{ xs: 12, sm: 12, md: 4 }}
            >
              {component}
            </Grid2>
          )
        )}
      </Grid2>
      <AppTabs
        tabs={[
          { label: 'Goals', onClick: () => { } },
          {
            label: 'Self Assessments',
            onClick: () => { },
          },
        ]}
      />
      <Modal {...completeModalData} />
    </Page>
  );
};

export default EmployeePerformanceManagement;
