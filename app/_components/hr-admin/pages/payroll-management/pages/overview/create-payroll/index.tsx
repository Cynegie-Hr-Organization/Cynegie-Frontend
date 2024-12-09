"use client";
import { ChevronLeft } from "@mui/icons-material";
import { Grid2, Stack } from "@mui/material";
import React, { useState } from "react";
import SelectEmployeesForPayrollTable from "../../../tables/select-employees-for-payroll";
import { useRouter } from "next/navigation";
import { DatePicker, DateRangePicker, Input } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import dayjs from "dayjs";
import CalendarIcon from "@/app/_components/icons/calendar";

const HrAdminCreatePayrollPage = () => {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<number[]>([0]);
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });

  console.log(dateRange);
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  return (
    <Stack gap={3} mb={10}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer" }}
        onClick={() => router.push("/hr-admin/payroll/overview")}
      >
        <ChevronLeft sx={{ color: '#8D8484', height: '36px', width: '36px' }} />
        <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
          Back to Payroll Management
        </div>
      </Stack>
      <Stack gap={2}>
        <div className="section-heading">Create Payroll</div>
        <div className="common-card">
          <Grid2 spacing={2} container>
            {[
              { label: "Payroll Name", placeholder: "Enter" },
              { label: "Payroll Period", placeholder: "Select period" },
              { label: "Payment Date", placeholder: "Select date" },
            ].map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                <div className='flex flex-col gap-5'>
                  <div className='text-[#101928] font-semibold text-sm'> {item.label}</div>
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
                        if (e) {
                          setDateRange({ startDate: e[0], endDate: e[1] });
                        }
                      }}
                      character=" – "
                      caretAs={CalendarIcon}
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
                    />
                  )}
                </div>
              </Grid2>
            ))}
          </Grid2>
        </div>
      </Stack>
      <Stack gap={2}>
        <div className="card-title-small">
          Select Employees for Payroll Cycle
        </div>
        <SelectEmployeesForPayrollTable
          getSelectedRows={(rows) => setSelectedRows(rows)}
        />
      </Stack>
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
          onClick={() => router.push("/hr-admin/payroll/review-payroll")}
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: selectedRows.length > 1 ? "#FFF" : "#344054",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 0px",
            width: "250px",
            backgroundColor: selectedRows.length > 1 ? "#0035C3" : "#98A2B3",
          }}
        >
          Continue
        </button>
      </Stack>
    </Stack>
  );
};

export default HrAdminCreatePayrollPage;
