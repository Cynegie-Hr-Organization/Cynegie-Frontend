import { newIndex } from "@/lib/utils";
import { Grid2, MenuItem, Select, TextField } from "@mui/material";

const OvertimeDropdownSettings = ({
  overtimeRate,
  maximumAllowed,
}: {
  overtimeRate?: string;
  maximumAllowed?: number;
}) => {
  return (
    <Grid2 spacing={2} container>
      {[
        {
          label: "Overtime Rate",
          placeholder: "Enter",
          defaultValue: overtimeRate,
        },
        {
          label: "Maximum Overtime Allowed",
          // placeholder: "Select Type",
          options: [
            { label: "10 hours/week", value: 10 },
            { label: "15 hours/week", value: 15 },
            { label: "20 hours/week", value: 20 },
            { label: "Custom", value: "custom" },
          ],
          defaultValue: maximumAllowed,
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
            {index == 1 ? (
              <Select
                defaultValue={item.defaultValue}
                sx={{
                  height: "35px",
                  borderRadius: "4.62px",
                  pr: "15px",
                }}
              >
                {/* <MenuItem value={item.placeholder}>{item.placeholder}</MenuItem> */}
                {item.options?.map((option, index) => (
                  <MenuItem key={newIndex(index)} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                sx={{
                  fontSize: "14px",
                  "& .MuiInputBase-root": {
                    height: "35px",
                    // border: '1px solid #D0D5DD',
                  },
                }}
                defaultValue={item.defaultValue}
                placeholder={item.placeholder}
                slotProps={{
                  input: {
                    endAdornment: <p>NGN/hour</p>,
                  },
                }}
              />
            )}
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default OvertimeDropdownSettings;
