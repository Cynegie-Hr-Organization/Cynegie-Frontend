"use client";
import AddItems from "@/app/_components/shared/custom-popover/content/add-items";
import Form from "@/app/_components/shared/form";
import InputField from "@/app/_components/shared/form/input-field";
import Page from "@/app/_components/shared/page";
import { ChevronRight } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import PerformanceSettingComponent from "./performance-settings";

const HrAdminSettings = () => {
  const dropdownComponents = [
    <div key={0} className="flex flex-col gap-2">
      <AddItems
        addText="Add Leave Type"
        addedItems={[{ name: "Annual Value", value: 0, checkValue: false }]}
        itemsHaveCheckValue={true}
        checkText="Enable Leave Accrual"
        allItems={[
          "Annual Leave",
          "Sick Leave",
          "Maternity Leave",
          "Study Leave",
        ]}
        type="no-select"
        inputFieldName="Leave Type"
        inputFieldType="select"
        hasSelectOptions
        startIndexToShowDelete={1}
        middleField={{
          label: "Eligibilty Criteria",
          type: "select",
          options: [{ label: "All Employees", value: 2 }],
        }}
        hasSecondaryField
        secondaryFieldType="text"
        secondaryFieldName="Available Days"
        gridCols={{ xs: 1, sm: 4, md: 4, lg: 4 }}
      />
      <p className="card-title-large mt-8 mb-4">Leave Policies</p>
      <p className="card-subtitle-small">Leave Accrual</p>
      <Form
        gridItemSize={{ xs: 12, sm: 6, md: 4 }}
        gridSpacing={3}
        inputFields={[
          {
            label: "Accrual Frequency",
            type: "select",
            defaultValue: 0,
            options: [{ label: "Monthly", value: 0 }],
          },
          {
            label: "Accrual Rate",
            type: "text",
            defaultValue: "10 days per month",
          },
          {
            label: "Max Carryover Days",
            type: "text",
            defaultValue: "20",
          },
        ]}
      />
      <p className="card-subtitle-small mt-4">
        Public Holidays and Leave Calculation
      </p>
      <div className="flex ml-[-10] items-center">
        <Checkbox />
        Exclue public holiday from leave calculation
      </div>
      <p className="card-subtitle-small mt-2">Leave Restrictions</p>
      <div className="w-[50%]">
        <InputField
          type="text"
          label="Max consecutive leave days"
          defaultValue={30}
        />
      </div>
    </div>,
    <AddItems
      key={1}
      addText="Add Stage"
      addedItems={[{ name: "Candidate Pipeline Stage", value: "Stage 1" }]}
      type="no-select"
      inputFieldName="Candidate Pipeline Stage"
      inputFieldType="text"
      hasSelectOptions
      startIndexToShowDelete={1}
      disabled
      disabledValue="Stage"
      middleField={{
        label: "Eligibilty Criteria",
        type: "select",
        options: [{ label: "Screening", value: 2 }],
      }}
      gridCols={{ xs: 1, sm: 3, md: 3, lg: 3 }}
    />,
    <Form
      key={2}
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      inputFields={[
        {
          label: "Standard Daily Working Hours",
          type: "text",
        },
        {
          label: "Late Mark Threshold",
          type: "time",
        },
        {
          label: "Overtime Rate",
          type: "text",
        },
        {
          label: "Maximum Overtime Allowed",
          type: "select",
        },
        {
          label: "Number of Breaks Allowed",
          type: "text",
        },
        {
          label: "Break Duration",
          type: "time",
        },
      ]}
    />,
    <PerformanceSettingComponent key={3} />, // Add the PerformanceWeighting component
  ];
  const dropdowns = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ]; // Add a new state for the fourth dropdown

  const dropdownComponents2 = [
    <div key={0}>
      <Form
        gridSpacing={3}
        gridItemSize={{ xs: 12, sm: 6 }}
        inputFields={[
          {
            label: "Theme",
            type: "select",
            options: [{ label: "Light Mode", value: 0 }],
          },
          {
            label: "Default Dashboard View",
            type: "select",
            options: [{ label: "Overview", value: 0 }],
          },
          {
            label: "",
            type: "checkbox",
            checkboxItems: [
              "Enable Email Notifications",
              "Enable in App Notifications",
            ],
          },
        ]}
      />
    </div>,
  ];
  const dropdowns2 = [useState(false)];

  return (
    <Page title="Settings">
      <div className="common-card p-[30px]">
        <div className="card-title-large mb-4">Company Settings</div>
        <div className="flex flex-col gap-4">
          {["Leave", "Hiring", "Attendance", "Performance Management"].map(
            (item, index) => {
              const [isOpen, setIsOpen] = dropdowns[index];
              const DropdownComponent = dropdownComponents[index];

              return (
                <div
                  className="p-[20px]"
                  style={{
                    border: "1px solid #D0D5DD",
                    borderRadius: "6px",
                  }}
                  key={index}
                >
                  <div className={`flex items-center mb-${isOpen ? 6 : 0}`}>
                    <div className="flex-grow">{`${item} Settings`}</div>
                    <ChevronRight
                      onClick={() => setIsOpen(!isOpen)}
                      className="cursor-pointer"
                      sx={{
                        transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                      }}
                    />
                  </div>
                  {isOpen && DropdownComponent}
                </div>
              );
            }
          )}
        </div>

        <div className="card-title-large mb-4 mt-8">
          Personalization Settings
        </div>
        <div className="flex flex-col gap-4">
          {["Customization"].map((item, index) => {
            const [isOpen, setIsOpen] = dropdowns2[index];
            const DropdownComponent = dropdownComponents2[index];

            return (
              <div
                className="p-[20px]"
                style={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                }}
                key={index}
              >
                <div className={`flex items-center mb-${isOpen ? 6 : 0}`}>
                  <div className="flex-grow">{`${item} Settings`}</div>
                  <ChevronRight
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer"
                    sx={{
                      transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                    }}
                  />
                </div>
                {isOpen && DropdownComponent}
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default HrAdminSettings;
