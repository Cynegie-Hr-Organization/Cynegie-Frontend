import { newIndex } from "@/lib/utils";
import { Grid2, MenuItem, Select, TextField } from "@mui/material";

const OvertimeDropdownSettings = () => {
  return (
    <Grid2 spacing={2} container>
      {[
        { label: "Overtime Rate", placeholder: "Enter" },
        {
          label: "Maximum Overtime Allowed",
          placeholder: "Select Type",
          options: [
            "10 hours/week",
            "15 hours/week",
            "20 hours/week",
            "Custom",
          ],
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
                defaultValue={item.placeholder}
                sx={{
                  height: "35px",
                  borderRadius: "4.62px",
                  pr: "15px",
                }}
              >
                <MenuItem value={item.placeholder}>{item.placeholder}</MenuItem>
                {item.options?.map((option, index) => (
                  <MenuItem key={newIndex(index)} value={option}>
                    {option}
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
                placeholder={item.placeholder}
              />
            )}
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default OvertimeDropdownSettings;
