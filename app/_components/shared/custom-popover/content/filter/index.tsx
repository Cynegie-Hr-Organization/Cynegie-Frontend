import React from "react";
import { FilterPopoverContentProps } from "../../types";
import { MenuItem, Select, Stack } from "@mui/material";
import Button from "../../../button-group/button";
import { ButtonType } from "@/app/_components/shared/page/heading/types";

const FilterPopoverContent: React.FC<FilterPopoverContentProps> = (props) => {
  const { filters } = props;

  return (
    <Stack padding={5} gap={5}>
      <Stack gap={3}>
        {filters?.map((filter) => (
          <Stack key={filter.name} gap={1}>
            <div
              style={{
                fontWeight: 400,
                fontSize: "12px",
                color: "#303030",
              }}
            >
              {filter.name}
            </div>
            <Select
              defaultValue={filter.items[0]}
              sx={{ height: "40px", borderRadius: "5px", width: "200px" }}
            >
              {filter.items.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Button text="Reset" />
        <Button type={ButtonType.contained} text="Filter" />
      </Stack>
    </Stack>
  );
};

export default FilterPopoverContent;
