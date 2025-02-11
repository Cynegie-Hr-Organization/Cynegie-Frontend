import { List, ListItem, ListItemText } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { MoreOptionsPopoverContentProps } from "../../types";

const MoreOptionsPopoverContent: React.FC<MoreOptionsPopoverContentProps> = (
  props,
) => {
  const { options, itemClick } = props;

  return (
    <List sx={{ color: "#475367", fontWeight: 400, fontSize: "14px" }}>
      {options?.map((item) => (
        <ListItem
          key={item.name}
          component="button"
          sx={{
            "&:hover": { color: "#0035C3" },
          }}
          onClick={(e: React.SyntheticEvent) => {
            item.onClick(e as string);
            item.onDataReturned?.(props.dataToReturnOnItemClick ?? "");
            itemClick();
          }}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default MoreOptionsPopoverContent;
