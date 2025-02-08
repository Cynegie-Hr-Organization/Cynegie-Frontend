import { newIndex } from "@/lib/utils";
import { Grid2, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const GeneralDropdownSettings = ({
  payPeriod,
  payDate,
}: {
  payPeriod?: string;
  payDate?: string;
}) => {
  return (
    <Grid2 spacing={2} container>
      {[
        {
          label: "Pay Period Setup",
          // placeholder: 'Select Date',
          options: [
            "Select Date",
            "Monthly",
            "Biweekly",
            "Weekly",
            "Semi Monthly",
          ],
          defaultValue: payPeriod,
        },
        {
          label: "Pay Date",
          placeholder: "Select Date",
          defaultValue: payDate,
        },
      ].map((item, index) => (
        <Grid2 key={newIndex(index)} size={{ xs: 12, md: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                color: "#101928",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              {item.label}
            </div>
            {index == 0 && item.options ? (
              <Select
                defaultValue={item.defaultValue}
                sx={{
                  height: "35px",
                  borderRadius: "4.62px",
                  pr: "15px",
                }}
              >
                <MenuItem sx={{ display: "none" }} value={item.options[0]}>
                  {item.options[0]}
                </MenuItem>
                {item.options?.slice(1)?.map((option, index) => (
                  <MenuItem key={newIndex(index)} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    fontSize: "14px",
                    "& .MuiInputBase-root": {
                      height: "35px",
                      // border: '1px solid #D0D5DD',
                    },
                  }}
                  defaultValue={dayjs(item.defaultValue)}
                  slotProps={{
                    textField: { placeholder: item.placeholder },
                  }}
                />
              </LocalizationProvider>
            )}
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GeneralDropdownSettings;
