"use client";
import { ChevronLeft } from "@mui/icons-material";
import { Box, Grid2, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HrAdminPayrollSalaryAdvancePage = () => {
  const router = useRouter();
  // const [value, setValue] = useState("1");

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  // const tabStyle = {
  //   textTransform: "none",
  //   fontSize: "14px",
  //   borderBottom: 1,
  //   borderColor: "divider",
  // };
  return (
    <Stack gap={4} mb={10} mt={6}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer" }}
        onClick={() => router.push("/hr-admin/payroll/benefits-management")}
      >
        <ChevronLeft sx={{ color: "#8D8484", height: "36px", width: "36px" }} />
        <div style={{ color: "#667185", fontWeight: 400, fontSize: "16px" }}>
          Back to Benefits
        </div>
      </Stack>
      <div className="section-heading">Salary Advance</div>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {[
          {
            title: "Total Advances Disbursed",
            value: "N2,500,000",
            icon: "/icons/group.svg",
          },
          {
            title: "Oustanding Repayments",
            value: "N800,000",
            icon: "/icons/paper-money.svg",
          },
          {
            title: "Pending Requests",
            value: "3",
            icon: "/icons/paper-money.svg",
          },
        ].map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
            className="common-card"
          >
            <Stack gap={3}>
              <Stack direction="row" alignItems="center" gap={1}>
                <div
                  style={{
                    padding: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#EADAFF",
                  }}
                >
                  <Image src={item.icon} width={16} height={16} alt="" />
                </div>
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1B1B1B",
                  }}
                >
                  {item.title}
                </Box>
              </Stack>
              <Box
                flexGrow={1}
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1B1B1B",
                }}
              >
                {item.value}
              </Box>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};

export default HrAdminPayrollSalaryAdvancePage;
