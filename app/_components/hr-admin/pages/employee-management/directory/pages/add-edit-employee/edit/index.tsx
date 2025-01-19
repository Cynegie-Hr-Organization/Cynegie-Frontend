"use client";
import SvgIcon from "@/app/_components/icons/container";
import { icon } from "@/constants";
import HrAdminEmployeeDirectoryAddEditEmployee from "..";

const HrAdminEmployeeDirectoryEditEmployee = () => {
  return (
    <HrAdminEmployeeDirectoryAddEditEmployee
      title="Edit Employee"
      bioData={[
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
        },
        {
          label: "Middle Name",
          type: "text",
          placeholder: "Enter middle name",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
        },
        {
          label: "Email Address",
          type: "text",
          placeholder: "Enter email",
        },
        {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter phone number",
        },
        { label: "Date of Birth", type: "date" },
        { label: "Country", type: "select", placeholder: "Select" },
        {
          label: "Street Address",
          type: "text",
          placeholder: "Enter address",
        },
        { label: "City", type: "text", placeholder: "Enter city" },
        { label: "State", type: "select", placeholder: "Select" },
        {
          label: "Postal Code",
          type: "text",
          placeholder: "Enter postal code",
        },
        {
          label: "Nationality",
          type: "text",
          placeholder: "Enter nationality",
        },
        {
          label: "Marital Status",
          type: "select",
          placeholder: "Select",
        },
        { label: "ID Upload", type: "drag-upload" },
        { label: "Passport", type: "drag-upload" },
      ]}
      nextOfKin={[
        {
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
        },
        {
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
        },
        {
          label: "Gender",
          type: "select",
          placeholder: "Select",
        },
        {
          label: "Email Address",
          type: "text",
          placeholder: "Enter email",
        },
        {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter phone number",
        },
        {
          label: "Relationship",
          type: "select",
          placeholder: "Select",
        },
      ]}
      employment={[
        {
          label: "Job Title",
          type: "text",
          placeholder: "Enter job title",
        },
        {
          label: "Department",
          type: "select",
        },
        {
          label: "Manager/Supervisor",
          type: "select",
        },
        {
          label: "Employment Type",
          type: "select",
        },
        {
          label: "Employment Status",
          type: "select",
        },
        {
          label: "Hire Date",
          type: "date",
        },
        {
          label: "Work Location/Branch",
          type: "select",
        },
        {
          label: "Work Schedule",
          type: "select",
        },
        {
          label: "Staff ID",
          type: "text",
          placeholder: "CYN123",
          disabled: true,
        },
        {
          label: "Probation Period",
          type: "text",
          placeholder: "Enter probation period",
        },
        {
          label: "Contract End Date",
          type: "date",
        },
        {
          label: "Work Email",
          type: "text",
          placeholder: "Enter work email",
        },
        {
          label: "Work Phone Number",
          type: "text",
          placeholder: "Enter phone number",
        },
        {
          label: "Job Description",
          type: "drag-upload",
        },
      ]}
      compensation={[
        {
          label: "Base Salary",
          type: "text",
          placeholder: "Enter base salary",
        },
        { label: "Salary Frequency", type: "select" },
        {
          label: "Bonus Structure",
          type: "text",
          placeholder: "Enter bonus structure",
        },
        {
          label: "Commission",
          type: "text",
          placeholder: "Enter commission",
        },
        {
          label: "Stock Options",
          type: "text",
          placeholder: "Enter stock options",
        },
        { label: "Effective Date of Compensation", type: "date" },
        { label: "Pay Grade/Level", type: "select" },
        { label: "Payment Method", type: "select" },
        { label: "Bank Account Name", type: "select" },
        {
          label: "Bank Account Number",
          type: "text",
          placeholder: "Enter account number",
        },
        {
          label: "Routing Number",
          type: "text",
          placeholder: "Enter routing number",
        },
        { label: "Tax Filing Status", type: "select" },
        {
          label: "Tax Identification Number (TIN)",
          type: "text",
          placeholder: "Enter TIN",
        },
        {
          label: "Overtime",
          type: "select",
        },
      ]}
      allowances={[
        {
          label: "Allowances",
          type: "add-items",
          addItemsProps: {
            addText: "Include More Allowance",
            type: "no-select",
            addedItems: [{ name: "", value: "" }],
            inputFieldType: "text",
            showFieldLabels: false,
            hasSecondaryField: true,
            inputFieldPlacehdoler: "Enter name of allowance",
            secondaryFieldPlaceholder: "Amount",
            startIndexToShowDelete: 1,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
            gridCols: { xs: 3, lg: 3 },
          },
        },
      ]}
      deductions={[
        {
          label: "Deductions",
          type: "add-items",
          addItemsProps: {
            addText: "Include More Deductions",
            type: "no-select",
            addedItems: [{ name: "", value: "" }],
            inputFieldType: "text",
            showFieldLabels: false,
            hasSecondaryField: true,
            inputFieldPlacehdoler: "Enter name of deduction",
            secondaryFieldPlaceholder: "Amount",
            startIndexToShowDelete: 1,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
            gridCols: { xs: 3, lg: 3 },
          },
        },
      ]}
      documents={[
        {
          type: "add-items",
          addItemsProps: {
            addText: "Add More Documents",
            type: "no-select",
            addedItems: [
              { name: "ID Upload", value: "" },
              { name: "Proof of Contract", value: "" },
            ],
            inputFieldType: "drag-upload",
            showFieldLabels: true,
            startIndexToShowDelete: 2,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
            gridCols: { xs: 1 },
          },
        },
      ]}
      equipment={[
        { label: "Device Category", type: "select" },
        { label: "Device Type", type: "select" },
      ]}
      access={[
        {
          type: "add-items",
          addItemsProps: {
            addText: "Add More Access",
            type: "no-select",
            addedItems: [{ name: "Tool", value: "" }],
            allItems: ["Behance", "Figma", "Maichimp", "Slack"],
            hasSelectOptions: true,
            inputFieldType: "select",
            inputFieldName: "Tool",
            secondaryFieldType: "text",
            secondaryFieldPlaceholder: "Enter ID",
            showFieldLabels: true,
            startIndexToShowDelete: 1,
            hasSecondaryField: true,
            secondaryFieldName: "ID",
            gridCols: { xs: 1, lg: 3 },
          },
        },
      ]}
    />
  );
};

export default HrAdminEmployeeDirectoryEditEmployee;
