'use client';
import { Grid2 } from '@mui/material';
import feedbackOverviewSectionData from './sections/feedback-overview/data';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import keyPerformanceIndiciatorsSectionData from './sections/key-performance-indicators/data';
import ReviewCycleProgressSection from './sections/review-cycle-progress';
import Page from '@/app/_components/shared/page';
import TabFormat from '@/app/_components/shared/tabs';
import Table from '@/app/_components/shared/table';
import usePerformanceManagementPage from './hooks/usePerformanceManagementPage';
import Modal from '../../modal';

const EmployeePerformanceManagement = () => {
  const sectionsWithCards = [
    keyPerformanceIndiciatorsSectionData,
    feedbackOverviewSectionData,
  ].map((sectionData, index) => (
    <SectionWithCards {...sectionData} key={index} />
  ));

  const {
    performanceManagementPageData,
    goalsTableData,
    selfAssessmentsTableData,
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
      <TabFormat
        tabs={[
          { name: 'Goals', component: <Table {...goalsTableData} /> },
          {
            name: 'Self Assessments',
            component: <Table {...selfAssessmentsTableData} />,
          },
        ]}
      />
      <Modal {...completeModalData} />
    </Page>
  );
};

export default EmployeePerformanceManagement;
