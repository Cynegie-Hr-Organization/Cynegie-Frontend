"use client";
import {
  Box,
  Button,
  Grid2,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import "./style.css";
import PayrollTable from "../../tables/overview";
import { ChevronLeft } from "@mui/icons-material";
import PayrollOverviewChartLarge from "../../charts/payroll-overview/large";
import PayrollOverviewChartMobile from "../../charts/payroll-overview/mobile";
import BonusAndIncentivesChart from "../../charts/bonuses-and-incentives-chart";
import { useRouter } from "next/navigation";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import dayjs from "dayjs";

const HrAdminPayrollOverviewPage = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const buttonElement = event.currentTarget;
    setAnchorEl(buttonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "actions-popover" : undefined;

  const CalendarIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16406 14.5833C4.16406 14.1231 4.53716 13.75 4.9974 13.75H10.8307C11.291 13.75 11.6641 14.1231 11.6641 14.5833C11.6641 15.0436 11.291 15.4167 10.8307 15.4167H4.9974C4.53716 15.4167 4.16406 15.0436 4.16406 14.5833Z"
          fill="#667185"
        />
        <path
          d="M13.3307 13.75C12.8705 13.75 12.4974 14.1231 12.4974 14.5833C12.4974 15.0436 12.8705 15.4167 13.3307 15.4167H14.9974C15.4576 15.4167 15.8307 15.0436 15.8307 14.5833C15.8307 14.1231 15.4576 13.75 14.9974 13.75H13.3307Z"
          fill="#667185"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.66406 1.25C7.1243 1.25 7.4974 1.6231 7.4974 2.08333V2.91667H12.4974V2.08333C12.4974 1.6231 12.8705 1.25 13.3307 1.25C13.791 1.25 14.1641 1.6231 14.1641 2.08333V2.91667H14.9974C16.8383 2.91667 18.3307 4.40905 18.3307 6.25V15.4167C18.3307 17.2576 16.8383 18.75 14.9974 18.75H4.9974C3.15645 18.75 1.66406 17.2576 1.66406 15.4167V6.25C1.66406 4.40905 3.15645 2.91667 4.9974 2.91667H5.83073V2.08333C5.83073 1.6231 6.20383 1.25 6.66406 1.25ZM12.4974 4.58333C12.4974 5.04357 12.8705 5.41667 13.3307 5.41667C13.791 5.41667 14.1641 5.04357 14.1641 4.58333H14.9974C15.9179 4.58333 16.6641 5.32953 16.6641 6.25V6.66667H3.33073V6.25C3.33073 5.32953 4.07692 4.58333 4.9974 4.58333H5.83073C5.83073 5.04357 6.20383 5.41667 6.66406 5.41667C7.1243 5.41667 7.4974 5.04357 7.4974 4.58333H12.4974ZM16.6641 8.33333H3.33073V15.4167C3.33073 16.3371 4.07692 17.0833 4.9974 17.0833H14.9974C15.9179 17.0833 16.6641 16.3371 16.6641 15.4167V8.33333Z"
          fill="#667185"
        />
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-5 min-h-screen">
      <Stack gap={2}>
        <Stack direction="row" mb={3}>
          <Stack flexGrow={1} gap={1} mr={2}>
            <Box className="section-heading">Payroll</Box>
            <Box className="section-subtitle">
              Manage employee and organization payroll
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <button
              style={{
                display: "flex",
                height: "38px",
                borderRadius: "4.62px",
                padding: "0px 15px",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid #98A2B3",
                color: "#98A2B3",
                fontSize: "16px",
                fontWeight: 700,
              }}
              onClick={handleClick}
            >
              <div style={{ flexGrow: 1 }}>Actions</div>{" "}
              <ChevronLeft sx={{ transform: "rotate(270deg)" }} />
            </button>
            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              variant="contained"
              className="common-button"
              onClick={() => router.push("/hr-admin/payroll/create-payroll")}
            >
              Create Payroll
            </Button>
          </Stack>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {[
            {
              title: "Total Payroll Cost",
              value: "₦34,886,000",
              additionalInfo: { value: "+20%", description: "Last Month" },
            },
            {
              title: "Completed Payments",
              value: "40",
              additionalInfo: { value: "₦90,251,000", description: "Paid" },
            },
            {
              title: "Pending Payments",
              value: "12",
              additionalInfo: { value: "₦7,251,000", description: "Pending" },
            },
            {
              title: "Total Payrolls",
              value: "124",
              additionalInfo: { value: "", description: "" },
            },
          ].map((item, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
              className="common-card"
            >
              <Stack gap={3}>
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1B1B1B",
                  }}
                >
                  {item.title}
                </Box>
                <Stack direction="row" alignItems="center">
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
                  <Box sx={{ fontWeight: 400, fontSize: "12px" }}>
                    <span style={{ color: index == 2 ? "#B56D00" : "#2B9943" }}>
                      {item.additionalInfo.value}
                    </span>{" "}
                    <span style={{ color: "#9094A1" }}>
                      {item.additionalInfo.description}
                    </span>
                  </Box>
                </Stack>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
      <Grid2 columnSpacing={3} rowSpacing={3} container>
        <Grid2 className="common-card" size={{ xs: 12, sm: 12, md: 8.5 }}>
          <Stack gap={3}>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "flex-start" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  fontSize: { xs: "16px", sm: "20px" },
                  fontWeight: 600,
                  color: { xs: "#101928", sm: "#000000" },
                  mr: 2,
                }}
              >
                Payroll Cost Overview
              </Box>
              <Stack
                sx={{ display: { xs: "none", sm: "flex" } }}
                direction="row"
                gap={2}
              >
                <Select
                  defaultValue="Monthly"
                  sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
                <Select
                  defaultValue="All Departments"
                  sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
                >
                  <MenuItem value="All Departments">All Departments</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </Stack>
              <Select
                defaultValue="01 June - 31 June, 2024"
                sx={{
                  height: "30px",
                  borderRadius: "4.62px",
                  pr: "5px",
                  display: { xs: "flex", sm: "none" },
                }}
                disabled
              >
                <MenuItem value="01 June - 31 June, 2024">
                  01 June - 31 June, 2024
                </MenuItem>
              </Select>
            </Stack>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <PayrollOverviewChartLarge />
            </Box>
            <Stack
              sx={{ display: { xs: "flex", sm: "none" }, mb: "-80px" }}
              gap={4}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#101928",
                  fontSize: "28px",
                }}
              >
                ₦120,574,000
              </div>
              <div style={{ margin: "0px -24.5px" }}>
                <PayrollOverviewChartMobile />
              </div>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 className="common-card" size={{ xs: 12, sm: 12, md: 3.5 }}>
          <Stack gap={4}>
            <Stack alignItems="center" direction="row">
              <Stack flexGrow={1} gap={0.5} mr={2}>
                <Box className="card-title-small">Bonuses and Incentives</Box>
                <Box className="card-subtitle-small">
                  From{" "}
                  {dayjs(dateRange.startDate).format("DD MMM YYYY") +
                    " - " +
                    dayjs(dateRange.endDate).format("DD MMM YYYY")}
                </Box>
              </Stack>
              <Button
                className="overview-calendar"
                sx={{ border: 0, padding: 0, mt: -4.5, pl: 6 }}
              >
                <DateRangePicker
                  preventOverflow
                  showOneCalendar
                  cleanable={false}
                  placement="auto"
                  ranges={[]}
                  format="dd MMM yyyy"
                  onChange={(e) => {
                    if (e) setDateRange({ startDate: e[0], endDate: e[1] });
                  }}
                  caretAs={CalendarIcon}
                />
              </Button>
            </Stack>

            <Grid2 rowSpacing={2} mb={-3} container>
              {Array(2)
                .fill(undefined)
                .map((_, index) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                    key={index}
                    className={index == 0 ? "grid-item-right-margin" : ""}
                  >
                    <Stack
                      sx={{
                        borderLeft: `3.26px solid ${
                          index == 0 ? "#8AA2E3" : "#0035C3"
                        }`,
                        pl: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          color: "#70707A",
                          fontWeight: 400,
                          fontSize: "11.4px",
                        }}
                      >
                        Bonuses
                      </Box>
                      <Box
                        sx={{
                          fontSize: "19.53px",
                          fontWeight: 600,
                          color: "#101928",
                        }}
                      >
                        ₦2,764,000
                      </Box>
                    </Stack>
                  </Grid2>
                ))}
            </Grid2>

            <Box
              sx={{
                position: "relative",
                marginBottom: "-20px",
                marginTop: { xs: 0, md: "-25px", lg: 0 },
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "300px",
                  margin: "0 auto -100px auto",
                }}
              >
                <BonusAndIncentivesChart />
              </div>
              <Box
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 100,
                  marginInline: "auto",
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    fontWeight: 400,
                    fontSize: "11.4px",
                    color: "#70707A",
                    textAlign: "center",
                  }}
                >
                  Total
                </Box>
                <Box
                  sx={{ fontWeight: 600, fontSize: "16px", color: "#101928" }}
                >
                  ₦32,764,000
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <Box sx={{ overflowX: "auto" }}>
        <PayrollTable />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List sx={{ color: "#475367", fontWeight: 400, fontSize: "14px" }}>
          {[
            { name: "Payroll Reports", route: "/hr-admin/payroll/reports" },
            { name: "Payroll Settings", route: "/hr-admin/payroll/settings" },
          ].map((item, index) => (
            <ListItem
              key={index}
              component="button"
              sx={{ "&:hover": { color: "#0035C3" } }}
              onClick={() => router.push(item.route)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default HrAdminPayrollOverviewPage;
