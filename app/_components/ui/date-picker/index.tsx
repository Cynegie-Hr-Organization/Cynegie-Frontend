import { color } from "@/constants";
import Calendar from "@/public/icons/calendar";
import { FormHelperText, InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldName,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface CustomDatePickerProps {
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

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
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
        render={({ field /*fieldState*/ }) => (
          <DatePicker
            {...field}
            // label="Date of Birth"
            // inputFormat="DD/MM/YYYY"
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toDate() : null)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#7e57c2",
                paddingY: 0.6,
                // height: "auto",
                // marginTop: "4px",
                height: "37px",
                ...(disabled && color.inputfield.disabled),
              },
              "& .MuiInputBase-input": {
                paddingY: 0.6,
              },
              "& .MuiSvgIcon": {
                styleOverrides: {
                  root: {
                    display: "block", // Ensure the icon is visible
                    fill: "red",
                    color: "red",
                  },
                },
              },
            }}
            // renderInput={(params) => (
            //   <TextField
            //     {...params}
            //     error={!!fieldState.error}
            //     helperText={fieldState.error ? fieldState.error.message : ""}
            //   />
            // )}
            // render
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
      <DatePicker
        // value={value}
        {...(value && { value: value })}
        {...(defaultValue && { defaultValue: defaultValue })}
        disabled={disabled}
        {...(onChange && { onChange: onChange })}
        slotProps={{
          textField: {
            id: "date-picker",
            placeholder: "Pick Date",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#7e57c2",
                paddingY: 0.6,
                // height: "auto",
                // marginTop: "4px",
                height: "37px",
                ...(disabled && color.inputfield.disabled),
              },
              "& .MuiInputBase-input": {
                paddingY: 0.6,
              },
              "& .MuiSvgIcon": {
                styleOverrides: {
                  root: {
                    display: "block", // Ensure the icon is visible
                    fill: "red",
                    color: "red",
                  },
                },
              },
            },
            slotProps: {
              input: {
                startAdornment: (
                  <InputAdornment position="end">
                    <Calendar />
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

//From Rsuite
{
  /* <DatePicker
        key={index}
        placeholder={item.placeholder}
        style={{
          borderRadius: "6px",
        }}
        format="dd MMM yyyy"
        cleanable={false}
        caretAs={CalendarIcon}
      /> */
}

export default CustomDatePicker;
