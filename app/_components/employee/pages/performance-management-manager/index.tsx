"use client";
import Page from "@/app/_components/shared/page";
import SectionWithCards from "@/app/_components/shared/section-with-cards";
import { Grid2 } from "@mui/material";
import Modal from "../../modal";
import usePerformanceManagementPage from "./hooks/usePerformanceManagementPage";
import feedbackOverviewSectionData from "./sections/feedback-overview/data";
import keyPerformanceIndiciatorsSectionData from "./sections/key-performance-indicators/data";
import ReviewCycleProgressSection from "./sections/review-cycle-progress";
import TabFormat from "@/app/_components/shared/tab-format";
import Table from "@/app/_components/shared/table";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";

const ManagerPerformanceManagement = () => {
  const sectionsWithCards = [
    keyPerformanceIndiciatorsSectionData,
    feedbackOverviewSectionData,
  ].map((sectionData, index) => (
    <SectionWithCards {...sectionData} key={index} />
  ));

  const {
    performanceManagementPageData,
    teamReviewTableData,
    selfAssessmentsTableData,
    completeModalData,
    cardGroupProps,
  } = usePerformanceManagementPage();

  return (
    <Page {...performanceManagementPageData}>
      <CardGroup {...cardGroupProps} />
      <Grid2 container spacing={2}>
        {[...sectionsWithCards, <ReviewCycleProgressSection key={2} />].map(
          (component, index) => (
            <Grid2
              className="common-card"
              key={index}
              size={{ xs: 12, sm: 12, md: 4 }}
            >
              {component}
            </Grid2>
          ),
        )}
      </Grid2>
      <TabFormat
        tabs={[
          {
            name: "Self Assessment",
            component: <Table {...selfAssessmentsTableData} />,
          },
          { name: "My Team Review", component: <Table {...teamReviewTableData} /> },
        ]}
      />
      <Modal {...completeModalData} />
    </Page>
  );
};

export default ManagerPerformanceManagement;
