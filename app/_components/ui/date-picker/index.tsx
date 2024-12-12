<<<<<<< HEAD
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
=======
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface CustomDatePickerProps {
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  removeTopMargin?: boolean;
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
<<<<<<< HEAD
=======
  removeTopMargin,
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
<<<<<<< HEAD
            id: "date-picker",
            placeholder: "Pick Date",
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#7e57c2",
                paddingY: 0.6,
                height: "auto",
                marginTop: "4px",
              },
              "& .MuiInputBase-input": {
=======
            id: 'date-picker',
            placeholder: 'Pick Date',
            fullWidth: true,
            sx: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                borderColor: '#7e57c2',
                paddingY: 0.6,
                height: 'auto',
                ...(!removeTopMargin && { marginTop: '4px' }),
              },
              '& .MuiInputBase-input': {
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
                paddingY: 0.6,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
