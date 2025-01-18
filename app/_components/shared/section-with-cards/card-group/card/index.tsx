import { Skeleton } from "@mui/material";
import React from "react";
import { CardProps } from "../../types";
import CardLabel from "./label";
import Value from "./value";

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
    largeLabelText = false,
    additionalInfo,
    loading,
  } = props;
  return (
    <div
      className={`flex ${
        valueBelow ? "flex-col-reverse" : "flex-col"
      } gap-6 common-card h-full`}
    >
      {loading ? (
        <Skeleton variant="text" height={30} width={80} />
      ) : (
        <Value
          lineBelow={lineBelowValue}
          lineColor={valueLineColor}
          value={value}
          denominator={denominator}
          isPercentage={isPercentage}
          additionalInfo={additionalInfo}
        />
      )}
      <CardLabel
        icon={icon}
        iconColorVariant={iconColorVariant}
        iconContainerHeight={iconContainerHeight}
        iconContainerWidth={iconContainerWidth}
        text={labelText}
        largeText={largeLabelText}
        hasIcon={hasIcon}
      />
    </div>
  );
};

export default Card;
