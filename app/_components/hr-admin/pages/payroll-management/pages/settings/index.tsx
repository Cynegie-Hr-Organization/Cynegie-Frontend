"use client";
import { ChevronRight } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import GeneralDropdownSettings from "./dropdowns/general";
import OvertimeDropdownSettings from "./dropdowns/overtime";
import DeductionAndContributionSettingsDropdown from "./dropdowns/deduction-and-contribution";
import LeaveDropdownSettings from "./dropdowns/leave";
import PayrollApprovalDropdownSettings from "./dropdowns/payroll-approval";
import ProratedPaymentDropdownSettings from "./dropdowns/prorated-payment";

const HrAdminPayrollSettingsPage = () => {
  const dropdownComponents = [
    GeneralDropdownSettings,
    OvertimeDropdownSettings,
    DeductionAndContributionSettingsDropdown,
    LeaveDropdownSettings,
    PayrollApprovalDropdownSettings,
    ProratedPaymentDropdownSettings,
  ];

  const dropdowns = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  return (
    <Stack gap={4} mx={5} mb={10} mt={6}>
      <div className="section-heading">Payroll Settings</div>
      <div style={{ padding: "30px" }} className="common-card">
        <Stack gap={2}>
          {[
            "General",
            "Overtime",
            "Deduction and Contribution",
            "Leave",
            "Payroll Approval",
            "Prorated Payment",
          ].map((item, index) => {
            const [isOpen, setIsOpen] = dropdowns[index];
            const DropdownComponent = dropdownComponents[index];

            return (
              <Stack
                sx={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  padding: "20px",
                }}
                key={index}
              >
                <Stack direction="row" alignItems="center" mb={isOpen ? 3 : 0}>
                  <div style={{ flexGrow: 1 }}>{`${item} Settings`}</div>
                  <ChevronRight
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                      transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                      cursor: "pointer",
                    }}
                  />
                </Stack>
                {isOpen && <DropdownComponent />}
              </Stack>
            );
          })}
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
            padding: "10px 40px",
            // width: '250px',
            backgroundColor: "#FFFFFF",
          }}
        >
          Cancel
        </button>
        <button
          //   onClick={() => router.push('/hr-admin/payroll/review-payroll')}
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: "#344054",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 40px",
            // width: '250px',
            backgroundColor: "#98A2B3",
          }}
        >
          Save
        </button>
      </Stack>
    </Stack>
  );
};

export default HrAdminPayrollSettingsPage;
