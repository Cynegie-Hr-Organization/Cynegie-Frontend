import { getColorVariant } from "@/utils";
import React from "react";
import { CardLabelIconProps } from "../../../../types";

const CardLabelIcon: React.FC<CardLabelIconProps> = (props) => {
  const { icon, colorVariant, containerHeight, containerWidth } = props;
  return (
    <div
      style={{
        ...getColorVariant(colorVariant),
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${containerHeight}px`,
        width: `${containerWidth}px`,
      }}
    >
      {icon}
    </div>
  );
};

export default CardLabelIcon;
