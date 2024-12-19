'use client';
import DetailGroup from '@/app/_components/shared/detail-group';
import Page from '@/app/_components/shared/page';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import TabFormat from '@/app/_components/shared/tab-format';
import { route } from '@/constants';
import { useRouter } from 'next/navigation';

const tabContainerStyle = 'common-card flex flex-col gap-12';

const HrAdminEmployeeManagementViewEmployee = () => {
  const router = useRouter();
  return (
    <Page
      backText='Back to Employees'
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.directory.home)
      }
      title='View Employee Details'
    >
      <TabFormat
        tabs={[
          {
            name: 'Personal Information',
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title='Bio Details'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'First Name', value: 'Alibaba' },
                      { name: 'Middle Name', value: 'Victoria' },
                      { name: 'Last Name', value: 'Udor' },
                      { name: 'Email Address', value: 'allivic@cynergie.co' },
                      { name: 'Phone Number', value: '09010101010' },
                      { name: 'Date of Birth', value: '13 Mar - 1988' },
                      { name: 'Country', value: 'Nigeria' },
                      {
                        name: 'Street Address',
                        value: '67, Ade Crescent, Iloyi',
                      },
                      { name: 'City', value: 'Lagos' },
                      { name: 'State', value: 'Lagos' },
                      { name: 'Postal Code', value: '100456' },
                      { name: 'Nationality', value: 'Nigerian' },
                      { name: 'Marital Status', value: 'Single' },
                      {
                        name: 'ID Upload',
                        value: 'ID.pdf',
                        type: 'document',
                      },
                      {
                        name: 'Passport',
                        value: 'Passport.pdf',
                        type: 'document',
                      },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title='Next of Kin Details'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'First Name', value: 'Charleson' },
                      { name: 'Last Name', value: 'Omonigo' },
                      { name: 'Gender', value: 'Female' },
                      { name: 'Email Address', value: 'charle@gmail.com' },
                      { name: 'Phone Number', value: '09010101010' },
                      { name: 'Relationship', value: 'Sister' },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: 'Employment Information',
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title='Employment Information'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'Job Title', value: 'Software Engineer' },
                      { name: 'Department', value: 'Product' },
                      { name: 'Manager/Supervisor', value: 'Ifunanya Adenle' },
                      { name: 'Employment', value: 'Full Time' },
                      { name: 'Employment Status', value: 'Active' },
                      { name: 'Hire Date', value: '11 - Feb - 2024' },
                      { name: 'Work Location', value: 'Lagos' },
                      {
                        name: 'Work Schedule',
                        value: '9:00AM - 5:00PM',
                      },
                      { name: 'Employee ID', value: 'CYN0345678' },
                      { name: 'Probabtion Period', value: '3 months' },
                      { name: 'Contract End Dae', value: 'N/A' },
                      { name: 'Work Email', value: 'victoria@cynergie.com' },
                      { name: 'Work Phone Number', value: '08010101010' },
                      {
                        name: 'Job Description',
                        value: 'jd.pdf',
                        type: 'document',
                      },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: 'Compensation',
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title='Compensation'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'Base Salary', value: 'N 110,,000.00' },
                      { name: 'Salary Frequency', value: 'Monthly' },
                      { name: 'Bonus Structure', value: '11%' },
                      { name: 'Commission', value: '-' },
                      { name: 'Employment Status', value: 'Active' },
                      { name: 'Stock Options', value: '11%' },
                      {
                        name: 'Effective Date of Compensation',
                        value: '27th of the month',
                      },
                      { name: 'Pay Grade/Level', value: 'Level 11' },
                      {
                        name: 'Employee ID',
                        value: 'CYN0345678',
                      },
                      { name: 'Payment Method', value: 'Bank Transfer' },
                      {
                        name: 'Bank Account Name',
                        value: 'Guaranty Trust Bank',
                      },
                      { name: 'Bank Account Number', value: '0217703343' },
                      { name: 'Routing Number', value: '234100' },
                      { name: 'Tax Filing Status', value: 'Active' },
                      {
                        name: 'Tax Identification Number',
                        value: '000111222333',
                      },
                      {
                        name: 'Overnight',
                        value: 'Night',
                      },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title='Allowances'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'Data Allowance', value: 'N 23,000.00' },
                      { name: 'Wardrobe Allowance', value: 'N 43,500.00' },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title='Deductions'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      { name: 'Pension', value: 'Charleson' },
                      { name: 'N 56,000.00', value: 'N 37,500.00' },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: 'Documents',
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title='Documents'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      {
                        name: 'ID Upload',
                        value: 'ID.pdf',
                        type: 'document',
                      },
                      {
                        name: 'Proof of Contract',
                        value: 'contract.pdf',
                        type: 'document',
                      },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
          {
            name: 'Equipments & Access',
            component: (
              <div className={tabContainerStyle}>
                <SectionCardContainer title='Employee Equipment'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      {
                        name: 'Device Category',
                        value: 'Laptop',
                      },
                      {
                        name: 'Device Category',
                        value: 'Macbook Pro 2022',
                      },
                    ]}
                  />
                </SectionCardContainer>
                <SectionCardContainer title='Employee Access'>
                  <DetailGroup
                    gridLayout='3-columns'
                    details={[
                      {
                        name: 'Behance ID',
                        value: 'simbi.behance.com',
                        type: 'document',
                      },
                    ]}
                  />
                </SectionCardContainer>
              </div>
            ),
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminEmployeeManagementViewEmployee;
