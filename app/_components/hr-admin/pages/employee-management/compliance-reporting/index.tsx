'use client';
import Modal from '@/app/_components/employee/modal';
import BarChart from '@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart';
import SvgIcon from '@/app/_components/icons/container';
import PieChart from '@/app/_components/shared/charts/pie-chart';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import TabFormat from '@/app/_components/shared/tab-format';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { color, icon } from '@/constants';
import { useState } from 'react';

const chart1 = {
  chartLabels: ['Male', 'Female'],
  chartValues: [55, 45],
  chartColors: [color.pieChart.info, color.pieChart.warning],
};

const chart2 = {
  chartLabels: ['Full Time', 'Part Time', 'Contract', 'Intern', 'Freelancer'],
  chartValues: [50, 5, 10, 10, 25],
  chartColors: [
    color.pieChart.info,
    color.pieChart.success,
    color.pieChart.grey,
    color.pieChart.warning,
    color.pieChart.error,
  ],
};

const chart3 = {
  chartLabels: ['Active', 'On Leave', 'Probation', 'Resigned', 'Terminated'],
  chartValues: [50, 5, 10, 10, 25],
  chartColors: [
    color.pieChart.info,
    color.pieChart.success,
    color.pieChart.grey,
    color.pieChart.warning,
    color.pieChart.error,
  ],
};

const employeeTurnoverChartData = [
  { item: 'Jan', value: 23 },
  { item: 'Feb', value: 27 },
  { item: 'Mar', value: 18 },
  { item: 'Apr', value: 18 },
  { item: 'May', value: 22 },
  { item: 'Jun', value: 13 },
  { item: 'Jul', value: 25 },
  { item: 'Aug', value: 17 },
  { item: 'Sep', value: 11 },
  { item: 'Oct', value: 17 },
  { item: 'Nov', value: 12 },
  { item: 'Dec', value: 25 },
];

const HrAdminEmployeeComplianceReporting = () => {
  const [openExportModal, setOpenExportModal] = useState(false);
  const userGroupIcon = (
    <SvgIcon path={icon.userGroupTwo} width={14} height={14} />
  );
  return (
    <Page title='Compliance and Reports'>
      <TabFormat
        tabs={[
          {
            name: 'Compliance',
            component: (
              <div className='flex flex-col gap-6'>
                <CardGroup
                  gridItemSize={{ xs: 12, sm: 4, md: 3 }}
                  cards={[
                    {
                      labelText: 'Number of Tasks',
                      largeLabelText: true,
                      value: 19,
                      icon: userGroupIcon,
                      iconColorVariant: 'ash',
                      valueBelow: true,
                    },
                    {
                      labelText: 'Completed Tasks',
                      largeLabelText: true,
                      value: 4,
                      icon: userGroupIcon,
                      iconColorVariant: 'purple',
                      valueBelow: true,
                    },
                    {
                      labelText: 'Tasks in Progress',
                      largeLabelText: true,
                      value: 3,
                      icon: userGroupIcon,
                      iconColorVariant: 'purple',
                      valueBelow: true,
                    },
                    {
                      labelText: 'Due Tasks',
                      largeLabelText: true,
                      value: 12,
                      icon: userGroupIcon,
                      iconColorVariant: 'purple',
                      valueBelow: true,
                    },
                  ]}
                />
                <Table
                  title='Compliance Tasks'
                  headerRowData={['Task Name', 'Assigned To', 'Date', 'Status']}
                  fieldTypes={[
                    ...Array(3).fill(FieldType.text),
                    FieldType.status,
                  ]}
                  displayedFields={['name', 'assignedTo', 'dueDate', 'status']}
                  bodyRowData={Array(5).fill({
                    name: 'Data Privacy Audit',
                    assignedTo: 'Ayomide Alibaba',
                    dueDate: '13-Jul-2024',
                    status: 'In Progress',
                  })}
                  statusMap={{ 'In Progress': 'warning' }}
                  formFilter={{
                    inputFields: [
                      {
                        name: 'Status',
                        type: 'select',
                        placeholder: 'Select',
                        options: [
                          { label: 'Completed', value: 2 },
                          { label: 'In Progress', value: 1 },
                          { label: 'Not Started', value: 0 },
                        ],
                      },
                    ],
                  }}
                />
              </div>
            ),
          },
          {
            name: 'Reports',
            component: (
              <TabFormat
                type='button'
                tabs={[
                  {
                    name: 'Employee Demography',
                    component: (
                      <>
                        <div className='card-title-large my-4'>
                          Employee Demography
                        </div>
                        <div className='flex flex-col gap-8'>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            <SectionCardContainer isCard title='By Gender'>
                              <PieChart {...chart1} />
                            </SectionCardContainer>
                            <SectionCardContainer
                              isCard
                              title='By Employment Type'
                            >
                              <PieChart {...chart2} />
                            </SectionCardContainer>
                            <SectionCardContainer
                              isCard
                              title='By Employment Status'
                            >
                              <PieChart {...chart3} />
                            </SectionCardContainer>
                          </div>
                          <Table
                            title='Employee Breakdown'
                            hasCheckboxes
                            headerRowData={[
                              'Department',
                              'Total Employee Number',
                              'Male',
                              'Female',
                            ]}
                            fieldTypes={[...Array(4).fill(FieldType.text)]}
                            displayedFields={[
                              'department',
                              'noOfEmployees',
                              'noOfMales',
                              'noOfFemales',
                            ]}
                            bodyRowData={[
                              ...Array(5).fill({
                                department: 'Product',
                                noOfEmployees: '32',
                                noOfMales: '20',
                                noOfFemales: '12',
                              }),
                              {
                                department: 'Total Number',
                                noOfEmployees: 18,
                                noOfMales: 4,
                                noOfFemales: 6,
                              },
                            ]}
                            formFilter={{
                              inputFields: [
                                {
                                  name: 'Status',
                                  type: 'select',
                                  placeholder: 'Select',
                                  options: [
                                    { label: 'Completed', value: 2 },
                                    { label: 'In Progress', value: 1 },
                                    { label: 'Not Started', value: 0 },
                                  ],
                                },
                              ],
                            }}
                          />
                        </div>
                      </>
                    ),
                  },
                  {
                    name: 'Turnover',
                    component: (
                      <div className='flex flex-col gap-8'>
                        <SectionCardContainer isCard title='Employee Turnover'>
                          <BarChart
                            barSize={35}
                            data={employeeTurnoverChartData}
                            barFill={color.barChart.lightBlue}
                            yAxisLabel='(% of Employees)'
                            isPercentage
                          />
                        </SectionCardContainer>
                        <Table
                          title='Turnover Breakdown'
                          headerRowData={[
                            'S/N',
                            'Department',
                            'Total Employee Number',
                            'Male',
                            'Female',
                          ]}
                          fieldTypes={[...Array(5).fill(FieldType.text)]}
                          displayedFields={[
                            'sn',
                            'department',
                            'noOfEmployees',
                            'noOfMales',
                            'noOfFemales',
                          ]}
                          bodyRowData={[
                            ...Array(5).fill({
                              sn: '01',
                              department: 'Product',
                              noOfEmployees: '32',
                              noOfMales: '20',
                              noOfFemales: '12',
                            }),
                            {
                              sn: undefined,
                              department: 'Total Number',
                              noOfEmployees: 130,
                              noOfMales: 11,
                              noOfFemales: 6,
                            },
                          ]}
                          formFilter={{
                            inputFields: [
                              {
                                name: 'Status',
                                type: 'select',
                                placeholder: 'Select',
                                options: [
                                  { label: 'Completed', value: 2 },
                                  { label: 'In Progress', value: 1 },
                                  { label: 'Not Started', value: 0 },
                                ],
                              },
                            ],
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                actionButton={{
                  type: ButtonType.contained,
                  text: 'Export',
                  onClick: () => setOpenExportModal(true),
                }}
              />
            ),
          },
        ]}
      />
      {openExportModal && (
        <Modal
          open={openExportModal}
          onClose={() => setOpenExportModal(false)}
          hasHeading={false}
          centerTitle='Export Report'
          centerMessage='Select the format you would like to download your report'
          hasDocSelect
          buttonOne={{
            type: ButtonType.outlined,
            text: 'Cancel',
            onClick: () => setOpenExportModal(false),
          }}
          buttonTwo={{
            type: ButtonType.download,
            text: 'Download',
            onClick: () => setOpenExportModal(false),
          }}
          buttonGroupPosition='center'
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeComplianceReporting;
