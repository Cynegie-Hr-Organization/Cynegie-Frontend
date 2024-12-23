'use client';
import AddItems from '@/app/_components/shared/custom-popover/content/add-items';
import Form from '@/app/_components/shared/form';
import Page from '@/app/_components/shared/page';
import { ChevronRight } from '@mui/icons-material';
import React, { useState } from 'react';

const HrAdminSettings = () => {
  const dropdownComponents = [
    <AddItems
      addText='Add Leave Type'
      addedItems={[{ name: 'Annual Value', value: 0 }]}
      allItems={[
        'Annual Leave',
        'Sick Leave',
        'Maternity Leave',
        'Study Leave',
      ]}
      type='no-select'
      inputFieldName='Leave Type'
      inputFieldType='select'
      hasSelectOptions
      startIndexToShowDelete={1}
      middleField={{
        name: 'Eligibilty Criteria',
        type: 'select',
        options: [{ label: 'All Employees', value: 2 }],
      }}
      hasSecondaryField
      secondaryFieldType='text'
      secondaryFieldName='Available Days'
      gridCols={{ xs: 1, sm: 4, md: 4, lg: 4 }}
    />,
    <AddItems
      addText='Add Stage'
      addedItems={[{ name: 'Candidate Pipeline Stage', value: 'Stage 1' }]}
      type='no-select'
      inputFieldName='Candidate Pipeline Stage'
      inputFieldType='text'
      hasSelectOptions
      startIndexToShowDelete={1}
      disabled
      disabledValue='Stage'
      middleField={{
        name: 'Eligibilty Criteria',
        type: 'select',
        options: [{ label: 'Screening', value: 2 }],
      }}
      gridCols={{ xs: 1, sm: 3, md: 3, lg: 3 }}
    />,
    <Form
      gridItemSize={{ xs: 12, sm: 6 }}
      gridSpacing={3}
      inputFields={[
        {
          name: 'Standard Daily Working Hours',
          type: 'text',
        },
        {
          name: 'Late Mark Threshold',
          type: 'time',
        },
        {
          name: 'Overtime Rate',
          type: 'text',
        },
        {
          name: 'Maximum Overtime Allowed',
          type: 'select',
        },
        {
          name: 'Number of Breaks Allowed',
          type: 'text',
        },
        {
          name: 'Break Duration',
          type: 'time',
        },
      ]}
    />,
  ];
  const dropdowns = [useState(false), useState(false), useState(false)];

  const dropdownComponents2 = [
    <div>
      <Form
        gridSpacing={3}
        gridItemSize={{ xs: 12, sm: 6 }}
        inputFields={[
          {
            name: 'Theme',
            type: 'select',
            options: [{ label: 'Light Mode', value: 0 }],
          },
          {
            name: 'Default Dashboard View',
            type: 'select',
            options: [{ label: 'Overview', value: 0 }],
          },
          {
            name: '',
            type: 'checkbox',
            checkboxItems: [
              'Enable Email Notifications',
              'Enable in App Notifications',
            ],
          },
        ]}
      />
    </div>,
  ];
  const dropdowns2 = [useState(false)];

  return (
    <Page title='Settings'>
      <div className='common-card p-[30px]'>
        <div className='card-title-large mb-4'>Company Settings</div>
        <div className='flex flex-col gap-4'>
          {['Leave', 'Hiring', 'Attendance'].map((item, index) => {
            const [isOpen, setIsOpen] = dropdowns[index];
            const DropdownComponent = dropdownComponents[index];

            return (
              <div
                className='p-[20px]'
                style={{
                  border: '1px solid #D0D5DD',
                  borderRadius: '6px',
                }}
                key={index}
              >
                <div className={`flex items-center mb-${isOpen ? 6 : 0}`}>
                  <div className='flex-grow'>{`${item} Settings`}</div>
                  <ChevronRight
                    onClick={() => setIsOpen(!isOpen)}
                    className='cursor-pointer'
                    sx={{
                      transform: isOpen ? 'rotate(270deg)' : 'rotate(90deg)',
                    }}
                  />
                </div>
                {isOpen && DropdownComponent}
              </div>
            );
          })}
        </div>

        <div className='card-title-large mb-4 mt-8'>
          Personalization Settings
        </div>
        <div className='flex flex-col gap-4'>
          {['Customization'].map((item, index) => {
            const [isOpen, setIsOpen] = dropdowns2[index];
            const DropdownComponent = dropdownComponents2[index];

            return (
              <div
                className='p-[20px]'
                style={{
                  border: '1px solid #D0D5DD',
                  borderRadius: '6px',
                }}
                key={index}
              >
                <div className={`flex items-center mb-${isOpen ? 6 : 0}`}>
                  <div className='flex-grow'>{`${item} Settings`}</div>
                  <ChevronRight
                    onClick={() => setIsOpen(!isOpen)}
                    className='cursor-pointer'
                    sx={{
                      transform: isOpen ? 'rotate(270deg)' : 'rotate(90deg)',
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
