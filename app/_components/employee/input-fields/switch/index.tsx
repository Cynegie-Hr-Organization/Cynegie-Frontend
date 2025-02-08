import { Switch } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "../../modal/types";

const SwitchField: React.FC<Omit<InputFieldProps, "type">> = ({
  label,
  control,
  defaultChecked,
}) => {
  return (
    <Controller
      name={label ?? ""}
      control={control}
      defaultValue={defaultChecked}
      render={({ field }) => (
        <Switch {...field} checked={field.value ?? defaultChecked} />
      )}
    />
  );
};

export default SwitchField;
