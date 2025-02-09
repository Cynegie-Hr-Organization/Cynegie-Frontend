import { Stack } from "@mui/material";
import SummaryItem from "./item";
import Title from "@/app/_components/shared/section-with-cards/title";
import useMyCoursesTable from "../hooks/table/useMyCoursesTable";

const SummaryOfCompletedTraining = () => {
  const { completedCourses } = useMyCoursesTable();

  return (
    <Stack sx={{ height: "100%" }} gap={2}>
      <Title text="Summary of Completed Training" />
      <Stack
        className="common-card"
        justifyContent="space-between"
        sx={{
          height: "100%",
        }}
        gap={2}
      >
        {completedCourses.map((item, index) => (
          <SummaryItem
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
            }}
            {...item}
            key={index}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SummaryOfCompletedTraining;