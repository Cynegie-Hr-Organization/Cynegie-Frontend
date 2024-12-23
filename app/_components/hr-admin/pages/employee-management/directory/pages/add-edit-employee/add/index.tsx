'use client';
import HrAdminEmployeeDirectoryAddEditEmployee from '..';
import SvgIcon from '@/app/_components/icons/container';
import { icon } from '@/constants';

const HrAdminEmployeeDirectoryAddEmployee = () => {
  return (
    <HrAdminEmployeeDirectoryAddEditEmployee
      title='Add Employee'
      bioData={[
        {
          name: 'First Name',
          type: 'text',
          placeholder: 'Enter first name',
        },
        {
          name: 'Middle Name',
          type: 'text',
          placeholder: 'Enter middle name',
        },
        {
          name: 'Last Name',
          type: 'text',
          placeholder: 'Enter last name',
        },
        {
          name: 'Email Address',
          type: 'text',
          placeholder: 'Enter email',
        },
        {
          name: 'Phone Number',
          type: 'text',
          placeholder: 'Enter phone number',
        },
        { name: 'Date of Birth', type: 'date' },
        { name: 'Country', type: 'select', placeholder: 'Select' },
        {
          name: 'Street Address',
          type: 'text',
          placeholder: 'Enter address',
        },
        { name: 'City', type: 'text', placeholder: 'Enter city' },
        { name: 'State', type: 'select', placeholder: 'Select' },
        {
          name: 'Postal Code',
          type: 'text',
          placeholder: 'Enter postal code',
        },
        {
          name: 'Nationality',
          type: 'text',
          placeholder: 'Enter nationality',
        },
        {
          name: 'Marital Status',
          type: 'select',
          placeholder: 'Select',
        },
        { name: 'ID Upload', type: 'drag-upload' },
        { name: 'Passport', type: 'drag-upload' },
      ]}
      nextOfKin={[
        {
          name: 'First Name',
          type: 'text',
          placeholder: 'Enter first name',
        },
        {
          name: 'Last Name',
          type: 'text',
          placeholder: 'Enter last name',
        },
        {
          name: 'Gender',
          type: 'select',
          placeholder: 'Select',
        },
        {
          name: 'Email Address',
          type: 'text',
          placeholder: 'Enter email',
        },
        {
          name: 'Phone Number',
          type: 'text',
          placeholder: 'Enter phone number',
        },
        {
          name: 'Relationship',
          type: 'select',
          placeholder: 'Select',
        },
      ]}
      employment={[
        {
          name: 'Job Title',
          type: 'text',
          placeholder: 'Enter job title',
        },
        {
          name: 'Department',
          type: 'select',
        },
        {
          name: 'Manager/Supervisor',
          type: 'select',
        },
        {
          name: 'Employment Type',
          type: 'select',
        },
        {
          name: 'Employment Status',
          type: 'select',
        },
        {
          name: 'Hire Date',
          type: 'date',
        },
        {
          name: 'Work Location/Branch',
          type: 'select',
        },
        {
          name: 'Work Schedule',
          type: 'select',
        },
        {
          name: 'Staff ID',
          type: 'text',
          placeholder: 'CYN123',
          disabled: true,
        },
        {
          name: 'Probation Period',
          type: 'text',
          placeholder: 'Enter probation period',
        },
        {
          name: 'Contract End Date',
          type: 'date',
        },
        {
          name: 'Work Email',
          type: 'text',
          placeholder: 'Enter work email',
        },
        {
          name: 'Work Phone Number',
          type: 'text',
          placeholder: 'Enter phone number',
        },
        {
          name: 'Job Description',
          type: 'drag-upload',
        },
      ]}
      compensation={[
        {
          name: 'Base Salary',
          type: 'text',
          placeholder: 'Enter base salary',
        },
        { name: 'Salary Frequency', type: 'select' },
        {
          name: 'Bonus Structure',
          type: 'text',
          placeholder: 'Enter bonus structure',
        },
        {
          name: 'Commission',
          type: 'text',
          placeholder: 'Enter commission',
        },
        {
          name: 'Stock Options',
          type: 'text',
          placeholder: 'Enter stock options',
        },
        { name: 'Effective Date of Compensation', type: 'date' },
        { name: 'Pay Grade/Level', type: 'select' },
        { name: 'Payment Method', type: 'select' },
        { name: 'Bank Account Name', type: 'select' },
        {
          name: 'Bank Account Number',
          type: 'text',
          placeholder: 'Enter account number',
        },
        {
          name: 'Routing Number',
          type: 'text',
          placeholder: 'Enter routing number',
        },
        { name: 'Tax Filing Status', type: 'select' },
        {
          name: 'Tax Identification Number (TIN)',
          type: 'text',
          placeholder: 'Enter TIN',
        },
        {
          name: 'Overtime',
          type: 'select',
        },
      ]}
      allowances={[
        {
          name: 'Allowances',
          type: 'add-items',
          addItemsProps: {
            addText: 'Include More Allowance',
            type: 'no-select',
            addedItems: [{ name: '', value: '' }],
            inputFieldType: 'text',
            showFieldLabels: false,
            hasSecondaryField: true,
            inputFieldPlacehdoler: 'Enter name of allowance',
            secondaryFieldPlaceholder: 'Amount',
            startIndexToShowDelete: 1,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
          },
        },
      ]}
      deductions={[
        {
          name: 'Deductions',
          type: 'add-items',
          addItemsProps: {
            addText: 'Include More Deductions',
            type: 'no-select',
            addedItems: [{ name: '', value: '' }],
            inputFieldType: 'text',
            showFieldLabels: false,
            hasSecondaryField: true,
            inputFieldPlacehdoler: 'Enter name of deduction',
            secondaryFieldPlaceholder: 'Amount',
            startIndexToShowDelete: 1,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
          },
        },
      ]}
      documents={[
        {
          type: 'add-items',
          addItemsProps: {
            addText: 'Add More Documents',
            type: 'no-select',
            addedItems: [
              { name: 'ID Upload', value: '' },
              { name: 'Proof of Contract', value: '' },
            ],
            inputFieldType: 'drag-upload',
            showFieldLabels: true,
            startIndexToShowDelete: 2,
            secondaryFieldStartAdornment: (
              <SvgIcon path={icon.naira} width={15} height={13.33} />
            ),
          },
        },
      ]}
      equipment={[
        { name: 'Device Category', type: 'select' },
        { name: 'Device Type', type: 'select' },
      ]}
      access={[
        {
          type: 'add-items',
          addItemsProps: {
            addText: 'Add More Access',
            type: 'no-select',
            addedItems: [{ name: 'Tool', value: '' }],
            allItems: ['Behance', 'Figma', 'Maichimp', 'Slack'],
            hasSelectOptions: true,
            inputFieldType: 'select',
            inputFieldName: 'Tool',
            secondaryFieldType: 'text',
            secondaryFieldPlaceholder: 'Enter ID',
            showFieldLabels: true,
            startIndexToShowDelete: 1,
            hasSecondaryField: true,
            secondaryFieldName: 'ID',
          },
        },
      ]}
    />
  );
};

export default HrAdminEmployeeDirectoryAddEmployee;
