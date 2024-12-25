import { Stack, SxProps } from "@mui/material";
import Name from "./name";
import ItemCompletionDate from "./completion-date";
import React from "react";

const SummaryItem: React.FC<{
  name: string;
  datePhrase: string;
  date: string;
  sx?: SxProps;
}> = ({ name, datePhrase, date, sx }) => {
  return (
    <Stack sx={sx}>
      <Name text={name} />
      <ItemCompletionDate phrase={datePhrase} date={date} />
    </Stack>
  );
};

export default SummaryItem;
