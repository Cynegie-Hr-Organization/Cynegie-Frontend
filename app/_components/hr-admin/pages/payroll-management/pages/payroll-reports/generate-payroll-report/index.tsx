"use client";
import CalendarIcon from "@/app/_components/icons/calendar";
import {
  MultiSelect,
  Option,
} from '@/app/_components/shared/multi-select-dropdown';
import { newIndex } from '@/lib/utils';
import { Grid2, MenuItem, Select, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const HrAdminGeneratePayrollReport = () => {
  const router = useRouter();

  const [departmentOptionSelected, setDepartmentOptionSelected] = useState<
    Option[] | null
  >();
  const departmentHandleChange = (selected: Option[]) => {
    setDepartmentOptionSelected(selected);
  };

  const [employmentOptionSelected, setEmploymentOptionSelected] = useState<
    Option[] | null
  >();
  const employmentHandleChange = (selected: Option[]) => {
    setEmploymentOptionSelected(selected);
  };

  const [locationOptionSelected, setLocationOptionSelected] = useState<
    Option[] | null
  >();
  const locationHandleChange = (selected: Option[]) => {
    setLocationOptionSelected(selected);
  };

  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });

  console.log(dateRange);

  return (
    <Stack gap={3} mb={10} mt={6}>
      <div className="section-heading">Payroll Report Generator</div>
      <div
        className="common-card"
        style={{ paddingBottom: "80px" }}
      >
        <Stack gap={4}>
          <Grid2 spacing={2} container>
            {[
              {
                label: "Select Report Type",
                placeholder: "Select Type",
                options: [
                  "Payroll Summary",
                  "Employee Payroll Details",
                  "Tax Reports",
                  "Benefit Report",
                  "Deduction Reports",
                  "Compliance Reports",
                ],
              },
              { label: "Select Payroll Period", placeholder: "Select Type" },
            ].map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
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
                    <Select
                      defaultValue={item.placeholder}
                      sx={{
                        height: "35px",
                        borderRadius: "4.62px",
                        pr: "15px",
                      }}
                    >
                      <MenuItem
                        style={{ display: "none" }}
                        value={item.placeholder}
                      >
                        {item.placeholder}
                      </MenuItem>
                      {item.options?.map((option, index) => (
                        <MenuItem key={newIndex(index)} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  ) : (
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
                        if (e) setDateRange({ startDate: e[0], endDate: e[1] });
                      }}
                      character=" – "
                      caretAs={CalendarIcon}
                    />
                  )}
                </div>
              </Grid2>
            ))}
          </Grid2>
          <Stack gap={2}>
            <div className="card-title-small">Employee Filters</div>
            <Grid2 spacing={2} container>
              {[
                {
                  label: "Filter by Department",
                  placeholder: "Select Department",
                  options: [
                    { value: 0, label: "Engineering" },
                    { value: 1, label: "Product" },
                    { value: 2, label: "Marketing" },
                    { value: 3, label: "Admin" },
                    { value: 4, label: "Human Resource" },
                    { value: 5, label: "Brand" },
                    { value: 6, label: "Sales" },
                    { value: 7, label: "Finance" },
                  ],
                  onChange: departmentHandleChange,
                  value: departmentOptionSelected,
                },
                {
                  label: "Filter by Employment Type",
                  placeholder: "Filter by Employment Type",
                  options: [
                    { value: "Full Time", label: "Full Time" },
                    { value: "Part Time", label: "Part Time" },
                    {
                      value: "Contract Employment",
                      label: "Contract Employment",
                    },
                  ],
                  onChange: employmentHandleChange,
                  value: employmentOptionSelected,
                },
                {
                  label: "Filter by Location",
                  placeholder: "Filter by Location",
                  options: [
                    { value: 0, label: "Abuja Branch" },
                    { value: 1, label: "Lagos Branch" },
                    { value: 2, label: "Ikota" },
                    { value: 3, label: "Lekki Branch" },
                    { value: 4, label: "Ajah Branch" },
                    { value: 5, label: "Ikeja Branch" },
                    { value: 6, label: "Maitama Branch" },
                    { value: 7, label: "Delta Branch" },
                  ],
                  onChange: locationHandleChange,
                  value: locationOptionSelected,
                },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
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
                    {index == 1 ? (
                      <Select
                        defaultValue={item.placeholder}
                        sx={{
                          height: "37.8px",
                          borderRadius: "4.62px",
                          pr: "15px",
                        }}
                      >
                        <MenuItem
                          style={{ display: "none" }}
                          value={item.placeholder}
                        >
                          {item.placeholder}
                        </MenuItem>
                        {item.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <div className="App">
                        <MultiSelect
                          key={newIndex(index)}
                          options={item.options}
                          onChange={item.onChange}
                          value={item.value ?? []}
                          isSelectAll={true}
                          menuPlacement={"bottom"}
                        />
                      </div>
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
          </Stack>
          <Stack gap={2}>
            <div className="card-title-small">Report Customization</div>
            <Grid2 spacing={2} container>
              {[
                {
                  label: "Choose Specific Data Points",
                  placeholder: "Select Data Points",
                  options: ["Salary", "Deductions", "Taxes", "Bonuses"],
                },
                {
                  label: "Select Visual Representation",
                  placeholder: "Select",
                  options: ["Bar Chart", "Pie Chart"],
                },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
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
                    <Select
                      defaultValue={item.placeholder}
                      sx={{
                        height: "35px",
                        borderRadius: "4.62px",
                        pr: "15px",
                      }}
                    >
                      <MenuItem
                        style={{ display: "none" }}
                        value={item.placeholder}
                      >
                        {item.placeholder}
                      </MenuItem>
                      {item.options?.map((option, index) => (
                        <MenuItem key={newIndex(index)} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </div>
                </Grid2>
              ))}
            </Grid2>
          </Stack>
        </Stack>
      </div>
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
          onClick={() => router.push("/hr-admin/payroll/reports")}
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: "#344054",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 0px",
            width: "250px",
            backgroundColor: "#98A2B3",
          }}
        >
          Generate Report
        </button>
      </Stack>
    </Stack>
  );
};

export default HrAdminGeneratePayrollReport;
