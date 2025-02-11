import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import { color } from "@/constants";
import reviewCycleProgressChartData from "./chart/data";
import reviewCycleProgressChartOptions from "./chart/options";
import LegendSeries from "../../../attendance-and-time-tracking/leave-balance/legend/series";
import DoughnutChart from "@/app/_components/shared/charts/donut-chart";

const ReviewCycleProgressSection = () => {
  return (
    <SectionCardContainer
      title="Review Cycle Progress"
      period="View Report"
      periodFont={{ size: 14, weight: 600, color: color.info.dark }}
      periodClick={() => {}}
    >
      <div style={{ marginTop: -10 }} className=" card-subtitle-small">
        Cycle End Date: March 30, 2024
      </div>
      <DoughnutChart
        data={reviewCycleProgressChartData}
        options={reviewCycleProgressChartOptions}
        chartwidth={100}
        chartheight={60}
        centertext={{ value: 75 }}
        isvaluepercentage={true}
        containersx={{ height: "166px" }}
      />
      <LegendSeries
        color={color.warning.dark}
        label="Your review cycle is currently in progress"
        valueOnTop
        value="In Progress"
      />
    </SectionCardContainer>
  );
};

export default ReviewCycleProgressSection;
