import { FormHelperText, MenuItem, Select } from "@mui/material";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldName,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { InputFieldOption, InputFieldValue } from "../../modal/types";

export type SelectFieldProps = {
  value?: string | number;
  // setValue?: React.Dispatch<SetStateAction<SelectValue>>;
  setValue?: (arg: InputFieldValue) => void;
  placeholder?: string;
  options?: InputFieldOption[];
  valueControlledFromOutside?: boolean;
  defaultValue?: string | number;
  getCurrentValue?: (arg: string | number) => void;
  hookFormField?: boolean;
  name?: string;
  control?: Control<FieldValues, any>;
  errors?: FieldErrors<FieldValues>;
  controllerRules?: Omit<
    RegisterOptions<FieldValues, FieldName<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export type SelectValue = string | number | undefined;

export const InputFieldPlaceholder: React.FC<{ placeholder: string }> = ({
  placeholder,
}) => {
  return <p style={{ color: "grey" }}>{placeholder}</p>;
};

const classStyle = "!rounded-md !h-[37.5px] !w-full !bg-white !text-[14px]";

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const {
    options,
    placeholder,
    value,
    setValue,
    valueControlledFromOutside,
    defaultValue,
    getCurrentValue,
    hookFormField,
    name,
    control,
    errors,
    controllerRules,
  } = props;
  return hookFormField ? (
    <>
      <Controller
        name={name ?? ""}
        control={control}
        defaultValue=""
        rules={controllerRules}
        render={({ field }) => (
          <Select {...field} displayEmpty className={classStyle}>
            <MenuItem value="" disabled sx={{ display: "none" }}>
              {placeholder}
            </MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors && name && errors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof errors[name].message === "string" && errors[name].message}
        </FormHelperText>
      )}
    </>
  ) : (
    <Select
      className={classStyle}
      defaultValue={defaultValue ?? ""}
      {...(valueControlledFromOutside ? { value: value ?? "" } : {})}
      displayEmpty
      onChange={(e) => {
        setValue?.(e.target.value);
        getCurrentValue?.(e.target.value);
      }}
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
