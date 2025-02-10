import { SectionWithCardsProps } from "@/app/_components/shared/section-with-cards/types";

const keyPerformanceIndiciatorsSectionData: SectionWithCardsProps = {
  title: "Key Performance Indicators",
  period: "",
  headerDivider: true,
  cardsData: [
    {
      value: 80,
      iconColorVariant: "info",
      labelText: "Engagement Level",
      isPercentage: true,
    },
    {
      value: 75,
      iconColorVariant: "warning",
      labelText: "Goal Achievement",
      isPercentage: true,
    },
    {
      value: 5,
      iconColorVariant: "error",
      labelText: "Training Completion",
      denominator: 8,
    },
  ],
};

export default keyPerformanceIndiciatorsSectionData;
