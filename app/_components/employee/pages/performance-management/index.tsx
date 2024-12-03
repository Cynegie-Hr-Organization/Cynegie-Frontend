'use client';
import { Grid2 } from '@mui/material';
import feedbackOverviewSectionData from './sections/feedback-overview/data';
import SectionWithCards from '@/app/_components/shared/section-with-cards';
import keyPerformanceIndiciatorsSectionData from './sections/key-performance-indicators/data';
import ReviewCycleProgressSection from './sections/review-cycle-progress';
import Page from '@/app/_components/shared/page';
import performanceManagementPageData from './data';

const EmployeePerformanceManagement = () => {
  const sectionsWithCards = [
    keyPerformanceIndiciatorsSectionData,
    feedbackOverviewSectionData,
  ].map((sectionData, index) => (
    <SectionWithCards {...sectionData} key={index} />
  ));

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
    </Page>
  );
};

export default EmployeePerformanceManagement;
