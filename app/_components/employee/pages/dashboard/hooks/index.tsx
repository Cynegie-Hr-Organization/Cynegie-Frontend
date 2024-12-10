import DetailGroup from '@/app/_components/shared/detail-group';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { SectionCardContainerProps } from '@/app/_components/shared/section-with-cards/types';

const useEmployeeDashboardPage = () => {
  const pageProps: PageProps = {
    text: 'Dashboard',
    hasButtons: true,
    leftButton: {
      type: ButtonType.outlinedBlue,
      text: 'View Paystub',
    },
    rightButton: {
      type: ButtonType.contained,
      text: 'Performance Summary',
    },
  };

  const sectionGroups: SectionCardContainerProps[][] = [
    [
      { title: 'Time-Off', children: <></> },
      { title: 'Profile', children: <></> },
      { title: 'Upcoming Event', children: <></> },
    ],
    [
      {
        title: 'Device Management',
        children: (
          <DetailGroup
            details={[
              { name: 'Device Type', value: 'Laptop' },
              { name: 'Device Name', value: 'Macbook 2021' },
              { name: 'Timeline', value: '21/Jun/2024 - 21/Dec/2024' },
              { name: 'Status', value: 'Assigned' },
              {
                name: 'Details',
                value: 'Device name HP Elitebook Processor......',
              },
            ]}
          ></DetailGroup>
        ),
      },
      {
        title: 'App Management',
        children: (
          <DetailGroup
            details={[
              { name: 'App Name', value: 'Figma' },
              { name: 'App ID', value: '202201301610' },
              { name: 'Timeline', value: '21/Jun/2024' },
              { name: 'Status', value: 'Admin' },
              {
                name: 'Details',
                value: 'Figma Update for version 1.0 is disab......',
              },
            ]}
          ></DetailGroup>
        ),
      },
      { title: 'Recent Activity', children: <></> },
    ],
  ];

  const getGroupOneItemLayout = (index: number) => {
    return `sm:col-span-${index == 2 ? 2 : 1} lg:col-span-${
      index == 2 ? 2 : 1
    }`;
  };

  return { pageProps, sectionGroups, getGroupOneItemLayout };
};

export default useEmployeeDashboardPage;
