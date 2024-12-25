import { MenuItem, Select } from "@mui/material";
import React, { SetStateAction } from "react";
import { InputFieldOption } from "../../modal/types";

export type SelectFieldProps = {
  value?: string | number;
  setValue?: React.Dispatch<SetStateAction<string | number | undefined>>;
  placeholder?: string;
  options?: InputFieldOption[];
  valueControlledFromOutside?: boolean;
};

export const InputFieldPlaceholder: React.FC<{ placeholder: string }> = ({
  placeholder,
}) => {
  return <p style={{ color: "grey" }}>{placeholder}</p>;
};

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { options, placeholder, value, setValue, valueControlledFromOutside } =
    props;
  return (
    <Select
      className="!rounded-md"
      style={{ height: "42px", width: "100%" }}
      defaultValue=""
      {...(valueControlledFromOutside ? { value: value ?? "" } : {})}
      displayEmpty
      onChange={(e) => setValue?.(e.target.value)}
      renderValue={(selected) => {
        if (selected === "") {
          return <InputFieldPlaceholder placeholder={placeholder ?? ""} />;
        }
        const selectedItem = options?.find((item) => item.value === selected);
        return selectedItem ? selectedItem.label : "";
      }}
    >
      <MenuItem value="" disabled sx={{ display: "none" }}>
        {placeholder}
      </MenuItem>
      {options?.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectField;
