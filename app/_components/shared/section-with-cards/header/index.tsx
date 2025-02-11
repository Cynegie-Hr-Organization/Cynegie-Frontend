import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import Title from "../title";
import Period from "../period";
import { CardHeaderProps } from "../types";

const Header: React.FC<CardHeaderProps> = (props) => {
  const {
    headerIcon,
    title,
    period = "",
    hasDivider = false,
    titleSize = "small",
    periodFont,
    periodClick,
  } = props;
  return (
    <Stack {...(hasDivider && { gap: 1.5 })}>
      <Stack direction="row" alignItems="center">
        <Box
          flexGrow={1}
          style={{
            ...(headerIcon && {
              display: "flex",
              alignItems: "center",
              gap: 8,
            }),
          }}
        >
          {headerIcon && headerIcon}
          <Title text={title} size={titleSize} />
        </Box>
        <div
          onClick={periodClick}
          style={{ ...(periodClick && { cursor: "pointer" }) }}
        >
          <Period
            isClickable={periodClick ? true : false}
            text={period}
            font={periodFont}
          />
        </div>
      </Stack>
      {hasDivider && (
        <Box mx={-2.5}>
          <Divider />
        </Box>
      )}
    </Stack>
  );
};

export default Header;
