import { Stack } from "@mui/material";
import React from "react";
import { HeadingBackProps } from "../types";
import { ChevronLeft } from "@mui/icons-material";

const HeadingBack: React.FC<HeadingBackProps> = (props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ display: "flex", cursor: "pointer" }}
      onClick={props.onClick}
    >
      <ChevronLeft sx={{ color: "#8D8484", height: "36px", width: "36px" }} />
      <div style={{ color: "#667185", fontWeight: 400, fontSize: "16px" }}>
        {props.text}
      </div>
    </Stack>
  );
};

export default HeadingBack;
