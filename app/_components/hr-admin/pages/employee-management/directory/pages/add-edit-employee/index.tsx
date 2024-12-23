'use client';
import { InputFieldProps } from '@/app/_components/employee/modal/types';
import Form from '@/app/_components/shared/form';
import Page from '@/app/_components/shared/page';
import TabFormat from '@/app/_components/shared/tab-format';
import React from 'react';

const formSectionContainer =
  'common-card !px-[80px] !pt-[60px] !pb-[80px] flex flex-col  gap-[60px]';

const formGridSpacing = 5;

type HrAdminEmployeeDirectoryAddEditEmployeeProps = {
  title: string;
  bioData: InputFieldProps[];
  nextOfKin: InputFieldProps[];
  employment: InputFieldProps[];
  compensation: InputFieldProps[];
  allowances: InputFieldProps[];
  deductions: InputFieldProps[];
  documents: InputFieldProps[];
  equipment: InputFieldProps[];
  access: InputFieldProps[];
};

const HrAdminEmployeeDirectoryAddEditEmployee: React.FC<
  HrAdminEmployeeDirectoryAddEditEmployeeProps
> = ({
  title,
  bioData,
  nextOfKin,
  employment,
  compensation,
  allowances,
  deductions,
  documents,
  equipment,
  access,
}) => (
  <Page title={title}>
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
                inputFields={bioData}
              />
              <Form
                layout='3-columns'
                title='Next of Kin Details'
                gridSpacing={formGridSpacing}
                inputFields={nextOfKin}
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
                inputFields={employment}
              />
            </div>
          ),
        },
        {
          name: 'Compensation',
          component: (
            <div className={formSectionContainer}>
              <Form
                gridItemSize={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                title='Compensation Breakdown'
                gridSpacing={formGridSpacing}
                inputFields={compensation}
              />
              <div className='grid md:grid-cols-2'>
                <Form gridSpacing={formGridSpacing} inputFields={allowances} />
                <Form gridSpacing={formGridSpacing} inputFields={deductions} />
              </div>
            </div>
          ),
        },
        {
          name: 'Documents',
          component: (
            <div className={formSectionContainer}>
              <Form
                // layout='3-columns'
                gridItemSize={{ xs: 12, sm: 6 }}
                title='Add Documents'
                gridSpacing={formGridSpacing}
                inputFields={documents}
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
                inputFields={equipment}
              />
              <Form
                title='Employee Access'
                gridSpacing={formGridSpacing}
                inputFields={access}
              />
            </div>
          ),
        },
      ]}
    />
  </Page>
);

export default HrAdminEmployeeDirectoryAddEditEmployee;
