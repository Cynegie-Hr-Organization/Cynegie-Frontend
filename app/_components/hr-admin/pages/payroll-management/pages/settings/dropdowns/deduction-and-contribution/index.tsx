import { Grid2, TextField } from "@mui/material";

const DeductionAndContributionSettingsDropdown = ({
  tax,
  pension,
  health,
  transportation,
}: {
  tax?: string;
  health?: string;
  pension?: string;
  transportation?: string;
}) => {
  return (
    <Grid2 spacing={2} container>
      {[
        { label: "Tax Deductions", placeholder: "Enter", defaultValue: tax },
        {
          label: "Pension Contributions",
          placeholder: "Enter",
          defaultValue: pension,
        },
        {
          label: "Health Insurance",
          placeholder: "Enter",
          defaultValue: health,
        },
        {
          label: "Transportation Allowance",
          placeholder: "Enter",
          defaultValue: transportation,
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
              slotProps={{
                input: {
                  endAdornment: <p>%</p>,
                },
              }}
            />
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default DeductionAndContributionSettingsDropdown;
