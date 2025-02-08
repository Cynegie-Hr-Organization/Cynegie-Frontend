import { Grid2, TextField } from "@mui/material";

const LeaveDropdownSettings = ({
  unpaidLeaveDeduction,
  sickLeavePolicies,
}: {
  unpaidLeaveDeduction?: string;
  sickLeavePolicies?: string;
}) => {
  return (
    <Grid2 spacing={2} container>
      {[
        {
          label: "Unpaid Leave Deduction",
          placeholder: "Enter",
          defaultValue: unpaidLeaveDeduction,
        },
        {
          label: "Sick Leave Policies",
          placeholder: "Enter",
          defaultValue: sickLeavePolicies,
        },
      ].map((item, index) => (
        <Grid2 key={index} size={{ xs: 12, md: 6 }}>
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
            <TextField
              defaultValue={item.defaultValue}
              sx={{
                fontSize: "14px",
                "& .MuiInputBase-root": {
                  height: "35px",
                  // border: '1px solid #D0D5DD',
                },
              }}
              placeholder={item.placeholder}
              {...(index == 0 && {
                slotProps: {
                  input: {
                    endAdornment: <p>%</p>,
                  },
                },
              })}
            />
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LeaveDropdownSettings;
