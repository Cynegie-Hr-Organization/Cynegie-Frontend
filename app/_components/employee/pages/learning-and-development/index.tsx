"use client";
import { Grid2, Stack } from "@mui/material";
import SummaryCards from "./summary-cards";
import SummaryOfCompletedTraining from "./summary-of-completed-training";
import Table from "@/app/_components/shared/table";
import useMyCoursesTable from "./hooks/table/useMyCoursesTable";
import Page from "@/app/_components/shared/page";

const EmployeeLearningAndDevelopment = () => {
  const { myCourseTableData } = useMyCoursesTable();
  return (
    <Page title="Learning and Development">
      <Grid2 container spacing={3}>
        {[<SummaryCards key={0} />, <SummaryOfCompletedTraining key={1} />].map(
          (component, index) => (
            <Grid2
              key={index}
              size={
                index === 0
                  ? { xs: 12, sm: 12, md: 5, lg: 7 }
                  : { xs: 12, sm: 12, md: 7, lg: 5 }
              }
            >
              {component}
            </Grid2>
          ),
        )}
      </Grid2>
      <Stack gap={2}>
        <Table {...myCourseTableData} />
      </Stack>
    </Page>
  );
};

export default EmployeeLearningAndDevelopment;
