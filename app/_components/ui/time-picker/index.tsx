import { color } from "@/constants";
import ClockIcon from "@/public/icons/clock";
import { FormHelperText, InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldName,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface CustomTimePickerProps {
  value?: Dayjs | null;
  defaultValue?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  control?: Control<FieldValues, any>;
  hookFormField?: boolean;
  controllerRules?: Omit<
    RegisterOptions<FieldValues, FieldName<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  defaultValue,
  value,
  onChange,
  disabled,
  errors,
  control,
  hookFormField,
  controllerRules,
  name,
}) => {
  return hookFormField ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name ?? ""}
        control={control}
        rules={controllerRules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TimePicker
            {...field}
            value={field.value || null}
            onChange={(time) => field.onChange(time || null)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#7e57c2",
                paddingY: 0.6,
                height: "37px",
                ...(disabled && color.inputfield.disabled),
              },
              "& .MuiInputBase-input": {
                paddingY: 0.6,
              },
            }}
          />
        )}
      />
      {errors && name && errors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof errors[name].message === "string" && errors[name].message}
        </FormHelperText>
      )}
    </LocalizationProvider>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        {...(value && { value: value })}
        {...(defaultValue && { defaultValue: defaultValue })}
        disabled={disabled}
        {...(onChange && { onChange: onChange })}
        slotProps={{
          textField: {
            id: "time-picker",
            placeholder: "Pick Time",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#7e57c2",
                paddingY: 0.6,
                height: "37px",
                ...(disabled && color.inputfield.disabled),
              },
              "& .MuiInputBase-input": {
                paddingY: 0.6,
              },
            },
            slotProps: {
              input: {
                startAdornment: (
                  <InputAdornment position="end">
                    <ClockIcon />
                  </InputAdornment>
                ),
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
