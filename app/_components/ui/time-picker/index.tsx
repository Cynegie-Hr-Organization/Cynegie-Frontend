import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CustomTimePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            id: "time-picker",
            placeholder: "Pick Time",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                borderColor: "#7e57c2",
                paddingY: 0.6, // Reduce vertical padding
                height: "auto",
                marginTop: "8px",
              },
              "& .MuiInputBase-input": {
                paddingY: 0.6, // Reduce padding inside the input
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
