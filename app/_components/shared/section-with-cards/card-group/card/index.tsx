import { Stack } from "@mui/material";
import Value from "./value";
import CardLabel from "./label";
import React from "react";
import { CardProps } from "../../types";

const Card: React.FC<CardProps> = (props) => {
  const {
    value,
    icon,
    iconColorVariant,
    iconContainerHeight,
    iconContainerWidth,
    labelText,
    valueBelow = true,
    lineBelowValue = false,
    valueLineColor,
    hasIcon = false,
    denominator,
    isPercentage = false,
  } = props;
  return (
    <Stack
      flexDirection={valueBelow ? "column-reverse" : "column"}
      className=" common-card"
      gap={2}
    >
      <Value
        lineBelow={lineBelowValue}
        lineColor={valueLineColor}
        value={value}
        denominator={denominator}
        isPercentage={isPercentage}
      />
      <CardLabel
        icon={icon}
        iconColorVariant={iconColorVariant}
        iconContainerHeight={iconContainerHeight}
        iconContainerWidth={iconContainerWidth}
        text={labelText}
        hasIcon={hasIcon}
      />
    </Stack>
  );
};

export default Card;
