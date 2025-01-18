"use client";

import { ChevronLeft } from "@mui/icons-material";
import { Box, Grid2, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
// import ReviewPayrollTable from "../../../tables/review-payroll";
import dayjs from "dayjs";
import Image from "next/image";
import { DatePicker, DateRangePicker, Input } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const HrAdminReviewPayrollPage = () => {
  const router = useRouter();
  const [, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });
  const CalendarIcon = () => {
    return (
      <svg
        style={{ margin: "-3px 0px" }}
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

  // const options = [
  //   { value: 0, label: 'Goranboy' },
  //   { value: 1, label: 'Safikurd' },
  //   { value: 2, label: 'Baku' },
  //   { value: 3, label: 'Ganja' },
  //   { value: 4, label: 'Shusha' },
  //   { value: 5, label: 'Agdam' },
  // ];

  // const [, setSelected] = React.useState<Option[] | null>();
  // const handleChange = (selected: Option[]) => {
  //   setSelected(selected);
  // };
  return (
    <>
      <Stack marginX={5} gap={3} mb={10}>
        {/* <div className='App'>
          <MultiSelect
            key='example_id'
            options={options}
            onChange={handleChange}
            value={optionSelected}
            isSelectAll={true}
            menuPlacement={'bottom'}
          />
        </div> */}
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer" }}
          onClick={() => router.push("/hr-admin/payroll/create-payroll")}
        >
          <ChevronLeft
            sx={{ color: "#8D8484", height: "36px", width: "36px" }}
          />
          <div style={{ color: "#667185", fontWeight: 400, fontSize: "16px" }}>
            Back to Create Payroll
          </div>
        </Stack>
        <Stack gap={2}>
          <div className="section-heading">Review Payroll</div>
          <div className="common-card">
            <Grid2 spacing={2} container>
              {[
                {
                  label: "Payroll Name",
                  placeholder: "Finance Sept 2024 Payroll",
                },
                { label: "Payroll Period", placeholder: "1st August 2024" },
                {
                  label: "Payment Date",
                  placeholder: "01 June - 31 June, 2024",
                },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        color: "#101928",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      {item.label}
                    </div>
                    {index == 0 ? (
                      // <TextField
                      //   key={index}
                      //   sx={{
                      //     borderRadius: '6px',
                      //     '&:hover': {
                      //       border: '0.5px solid #3498FF',
                      //     },
                      //   }}
                      //   inputProps={{
                      //     style: {
                      //       height: '3px',
                      //       fontSize: '14px',
                      //       fontWeight: 400,
                      //     },
                      //   }}
                      //   placeholder={item.placeholder}
                      // />
                      <Input
                        placeholder={item.placeholder}
                        key={index}
                        style={{ borderRadius: "6px" }}
                        disabled
                      />
                    ) : index == 1 ? (
                      <DateRangePicker
                        style={{
                          borderRadius: "6px",
                          // width: '40px',
                          // padding: '0px'
                        }}
                        preventOverflow
                        showOneCalendar
                        cleanable={false}
                        ranges={[]}
                        format="dd MMM yyyy"
                        placeholder={item.placeholder}
                        onChange={(e) => {
                          if (e)
                            setDateRange({ startDate: e[0], endDate: e[1] });
                        }}
                        character=" – "
                        caretAs={CalendarIcon}
                        disabled
                      />
                    ) : (
                      <DatePicker
                        key={index}
                        placeholder={item.placeholder}
                        style={{
                          borderRadius: "6px",
                        }}
                        format="dd MMM yyyy"
                        cleanable={false}
                        caretAs={CalendarIcon}
                        disabled
                      />
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
          </div>
        </Stack>
        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {[
            {
              title: "Total Payroll Cost",
              value: "₦34,886,000",
              icon: "/icons/group.svg",
            },
            {
              title: "Completed Payments",
              value: "40",
              icon: "/icons/paper-money.svg",
            },
            {
              title: "Pending Payments",
              value: "12",
              icon: "/icons/paper-money.svg",
            },
            {
              title: "Total Payrolls",
              value: "124",
              icon: "/icons/paper-money.svg",
            },
          ].map((item, index) => (
            <Grid2
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
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
        <Stack direction="row" justifyContent="flex-end">
          <div style={{ color: "#0035C3", fontSize: "14px", fontWeight: 700 }}>
            Add New Employee
          </div>
        </Stack>
        {/* <ReviewPayrollTable /> */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <button
            style={{
              borderRadius: "8px",
              border: "1.5px solid #98A2B3",
              color: "#344054",
              fontSize: "16px",
              fontWeight: 600,
              padding: "10px 0px",
              width: "250px",
              backgroundColor: "#FFFFFF",
            }}
          >
            Save & Continue Later
          </button>
          <button
            onClick={() => router.push("/hr-admin/payroll/payroll-summary")}
            style={{
              borderRadius: "8px",
              border: "1.5px solid #98A2B3",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 600,
              padding: "10px 0px",
              width: "250px",
              backgroundColor: "#0035C3",
            }}
          >
            Continue
          </button>
        </Stack>
      </Stack>
    </>
  );
};

export default HrAdminReviewPayrollPage;
