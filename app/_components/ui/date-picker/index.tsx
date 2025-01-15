import { color } from "@/constants";
import Calendar from "@/public/icons/calendar";
import { InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import React from "react";

interface CustomDatePickerProps {
  value?: Dayjs | null;
  defaultValue?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  defaultValue,
  value,
  onChange,
  disabled,
}) => {
  return (
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
