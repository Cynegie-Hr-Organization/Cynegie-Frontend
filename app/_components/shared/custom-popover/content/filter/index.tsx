import React from "react";
import { FilterPopoverContentProps } from "../../types";
import { MenuItem, Select, Stack } from "@mui/material";
import Button from "../../../button-group/button";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Form from "../../../form";

const FilterPopoverContent: React.FC<FilterPopoverContentProps> = (props) => {
  const { filters, formFilters, onResetClick, onFilterClick } = props;

  return (
    <Stack padding={5} gap={5}>
      {filters && (
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
      )}
      {formFilters && (
        <div className="w-[250px]">
          <Form {...formFilters} gridSpacing={2} />
        </div>
      )}
      <Stack direction="row" justifyContent="space-between">
        <Button text="Reset" onClick={onResetClick} />
        <Button
          type={ButtonType.contained}
          text="Filter"
          onClick={onFilterClick}
        />
      </Stack>
    </Stack>
  );
};

export default FilterPopoverContent;
