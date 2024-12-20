'use client';

import SvgIcon from '@/app/_components/icons/container';
import DoughnutChart from '@/app/_components/shared/charts/donut-chart';
import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import Page from '@/app/_components/shared/page';
import PageHeading from '@/app/_components/shared/page/heading';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import {
  APRStatusMap,
  color,
  defaultDonutChartData,
  defaultDonutChartOptions,
  icon,
} from '@/constants';
import DeviceActivity from './device-activity';

const cardIcon = (
  <SvgIcon path={icon.workstation} width={13.56} height={13.56} />
);
const cardIconVariant = 'purple';

const chartLabels = ['HP', 'Macbook'];
const chartColors = [color.warning.dark, color.info.dark];
const chartValues = [127, 200];

const HrAdminDeviceOverview = () => {
  return (
    <Page
      title='Device Dashboard'
      hasButtons
      leftButton={{ type: ButtonType.outlined, text: 'Manage Device' }}
      rightButton={{ type: ButtonType.outlinedBlue, text: 'Assign Device' }}
      smActions={[
        { name: 'Manage Device', onClick: () => {} },
        { name: 'Assign Device', onClick: () => {} },
      ]}
    >
      <CardGroup
        gridItemSize={{ xs: 12, sm: 4 }}
        cards={[
          {
            icon: cardIcon,
            iconColorVariant: cardIconVariant,
            labelText: 'Total Devices',
            value: 327,
            valueBelow: true,
            largeLabelText: true,
          },
          {
            icon: cardIcon,
            iconColorVariant: cardIconVariant,
            labelText: 'Assigned Devices',
            value: 304,
            valueBelow: true,
            largeLabelText: true,
          },
          {
            icon: cardIcon,
            iconColorVariant: cardIconVariant,
            labelText: 'Total Devices',
            value: 23,
            valueBelow: true,
            largeLabelText: true,
          },
        ]}
      />
      <div className='grid gap-6 grid-cols-1 md:grid-cols-5'>
        <div className='md:col-span-3'>
          <SectionCardContainer isCard title='Device by Type'>
            <div className='grid grid-cols-2'>
              <DoughnutChart
                options={{ ...defaultDonutChartOptions, cutout: '70%' }}
                data={{
                  ...defaultDonutChartData,
                  labels: chartLabels,
                  datasets: [
                    { data: chartValues, backgroundColor: chartColors },
                  ],
                }}
                chartwidth={150}
                chartheight={150}
                centertext={{
                  value: chartValues[0] + chartValues[1],
                  label: 'Devices',
                }}
                containersx={{ my: 5 }}
              />
              <div className='flex items-center'>
                <div className='flex flex-col gap-4'>
                  {chartLabels.map((label, index) => (
                    <DotLegend
                      key={index}
                      dotColor={chartColors[index]}
                      label={label}
                      value={chartValues[index]}
                      countedItemName=''
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionCardContainer>
        </div>
        <div className='md:col-span-2'>
          <SectionCardContainer isCard title='Device Activity'>
            <div className='flex  flex-col gap-8'>
              {[
                [
                  'Ayomide Alibaba',
                  'Charles Ifemide',
                  'Ayomide Alibaba',
                  'Ayomide Alibaba',
                ].map((name) => (
                  <DeviceActivity name={name} date='14 June 2024' />
                )),
              ]}
            </div>
          </SectionCardContainer>
        </div>
      </div>
      <PageHeading
        title='Device Request'
        hasButtons
        rightButton={{
          type: ButtonType.outlinedBlue,
          text: 'Request Device Assignment',
        }}
      />
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={['Date', 'Employee Name', 'Device Type', 'Status']}
        fieldTypes={[...Array(3).fill(FieldType.text), FieldType.status]}
        displayedFields={['date', 'name', 'deviceType', 'status']}
        bodyRowData={Array(8).fill({
          date: '13 - Jun - 2024',
          name: 'Ayomide Alibaba',
          deviceType: 'Macbook Pro 2021',
          status: 'Pending',
        })}
        statusMap={APRStatusMap}
        fieldActionMap={{
          Approved: [{ name: 'View Details', onClick: () => {} }],
          Pending: [
            { name: 'View Details', onClick: () => {} },
            { name: 'Approve Request', onClick: () => {} },
            { name: 'Reject Request', onClick: () => {} },
          ],
          Rejected: [{ name: 'View Details', onClick: () => {} }],
        }}
        fieldToGetAction='status'
        formFilter={{
          inputFields: [
            {
              name: 'Device Type',
              type: 'select',
              defaultValue: 0,
              options: [{ label: 'HP', value: 0 }],
            },
            {
              name: 'Department',
              type: 'select',
              defaultValue: 0,
              options: [{ label: 'Product', value: 0 }],
            },
            {
              name: 'Status',
              type: 'select',
              defaultValue: 0,
              options: [{ label: 'Active', value: 0 }],
            },
          ],
        }}
      />
    </Page>
  );
};

export default HrAdminDeviceOverview;
