import { Grid2, TextField } from "@mui/material";

const DeductionAndContributionSettingsDropdown = () => {
  return (
    <Grid2 spacing={2} container>
      {[
        { label: "Tax Deductions", placeholder: "Enter" },
        { label: "Pension Contributions", placeholder: "Enter" },
        { label: "Health Insurance", placeholder: "Enter" },
        { label: "Transportation Allowance", placeholder: "Enter" },
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
              sx={{
                fontSize: "14px",
                "& .MuiInputBase-root": {
                  height: "35px",
                  // border: '1px solid #D0D5DD',
                },
              }}
              placeholder={item.placeholder}
            />
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default DeductionAndContributionSettingsDropdown;
