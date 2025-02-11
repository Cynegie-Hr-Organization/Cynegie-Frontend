import { Stack } from "@mui/material";
import React from "react";
import CenterTextLabel from "./label";
import { ChartCenterTextProps } from "../types";
import Value from "../../../section-with-cards/card-group/card/value";

const ChartCenterText: React.FC<ChartCenterTextProps> = ({
  value,
  label,
  isPercentage = false,
  denominator,
}) => {
  return (
    <Stack alignItems="center">
      <div style={{ ...(!label && { marginTop: 4 }) }}>
        <Value
          value={value}
          isPercentage={isPercentage}
          denominator={denominator}
        />
      </div>
      {label && <CenterTextLabel label={label} />}
    </Stack>
  );
};

export default ChartCenterText;
