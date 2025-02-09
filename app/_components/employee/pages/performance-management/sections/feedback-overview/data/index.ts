import { SectionWithCardsProps } from "@/app/_components/shared/section-with-cards/types";

const feedbackOverviewSectionData: SectionWithCardsProps = {
  title: "Feedback Overview",
  period: "",
  headerDivider: true,
  cardsData: [
    {
      value: 3,
      iconColorVariant: "info",
      labelText: "Total Requests",
      hasIcon: true,
    },
    {
      value: 1,
      iconColorVariant: "warning",
      labelText: "Received",
      hasIcon: true,
    },
    {
      value: 2,
      iconColorVariant: "error",
      labelText: "Pending Responses",
      hasIcon: true,
    },
    {
      value: 4.2,
      iconColorVariant: "grey",
      labelText: "Average Rating",
      hasIcon: true,
      denominator: 5,
    },
  ],
};

export default feedbackOverviewSectionData;
