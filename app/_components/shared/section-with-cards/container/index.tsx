import { Stack } from "@mui/material";
import Header from "../header";
import { SectionCardContainerProps } from "../types";

const SectionCardContainer: React.FC<SectionCardContainerProps> = (props) => {
  const {
    headerIcon,
    title,
    titleSize,
    isCard,
    period,
    children,
    headerDivider = false,
    periodFont,
    periodClick,
  } = props;
  return (
    <Stack
      className={`${isCard && "common-card"} h-full`}
      sx={{ minHeight: "100%" }}
      gap={2}
    >
      <Header
        headerIcon={headerIcon}
        title={title}
        titleSize={titleSize}
        period={period}
        periodFont={periodFont}
        periodClick={periodClick}
        hasDivider={headerDivider}
      />
      {children}
    </Stack>
  );
};

export default SectionCardContainer;
