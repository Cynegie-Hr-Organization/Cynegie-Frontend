'use client';
import Form from '@/app/_components/shared/form';
import Page from '@/app/_components/shared/page';
import TabFormat from '@/app/_components/shared/tab-format';

const formSectionContainer =
  'common-card !px-[80px] !pt-[60px] !pb-[80px] flex flex-col  gap-[60px]';

const formGridSpacing = 5;

const HrAdminEmployeeDirectoryAddEmployee = () => (
  <Page title='Add Employee'>
    <TabFormat
      type='multi-step-form'
      tabs={[
        {
          name: 'Personal Information',
          component: (
            <div className={formSectionContainer}>
              <Form
                layout='3-columns'
                title='Bio Data'
                gridSpacing={formGridSpacing}
                inputFields={[
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
              />
              <Form
                layout='3-columns'
                title='Next of Kin Details'
                gridSpacing={formGridSpacing}
                inputFields={[
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
              />
            </div>
          ),
        },
        {
          name: 'Employee Information',
          component: (
            <div className={formSectionContainer}>
              <Form
                layout='3-columns'
                title='Employment Information'
                gridSpacing={formGridSpacing}
                inputFields={[
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
              />
            </div>
          ),
        },
        {
          name: 'Compensation',
          component: (
            <div className={formSectionContainer}>
              <Form
                layout='3-columns'
                title='Compensation Breakdown'
                gridSpacing={formGridSpacing}
                inputFields={[
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
                  {
                    name: 'Allowances',
                    type: 'text',
                    placeholder: 'Enter name of allowance',
                  },
                  {
                    name: 'Deductions',
                    type: 'text',
                    placeholder: 'Enter name of deduction',
                  },
                ]}
              />
            </div>
          ),
        },
        {
          name: 'Documents',
          component: (
            <div className={formSectionContainer}>
              <Form
                layout='3-columns'
                title='Add Documents'
                gridSpacing={formGridSpacing}
                inputFields={[
                  { name: 'ID Upload', type: 'drag-upload' },
                  { name: 'Proof of Contract', type: 'drag-upload' },
                  {
                    name: 'Name of document',
                    type: 'text',
                    placeholder: 'Enter name of document',
                  },
                ]}
              />
            </div>
          ),
        },
        {
          name: 'Equipments & Access',
          component: (
            <div className={formSectionContainer}>
              <Form
                layout='3-columns'
                title='Employee Equipment'
                gridSpacing={formGridSpacing}
                inputFields={[
                  { name: 'Device Category', type: 'select' },
                  { name: 'Device Type', type: 'select' },
                ]}
              />
              <Form
                layout='3-columns'
                title='Employee Access'
                gridSpacing={formGridSpacing}
                inputFields={[
                  { name: 'Tool', type: 'select' },
                  { name: 'ID', type: 'text', placeholder: 'Enter ID' },
                ]}
              />
            </div>
          ),
        },
      ]}
    />
  </Page>
);

export default HrAdminEmployeeDirectoryAddEmployee;
