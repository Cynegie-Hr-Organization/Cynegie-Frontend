import DetailGroup from '@/app/_components/shared/detail-group';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { SectionCardContainerProps } from '@/app/_components/shared/section-with-cards/types';
import RecentActivityCardDetails from '../sections/recent-activity';
import { TimeOffProps } from '../sections/time-off/types';
import { ProfileProps } from '../sections/profile/types';
import { useRouter } from 'next/navigation';
import { route } from '@/constants';

const useEmployeeDashboardPage = () => {
  const router = useRouter();
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
      onClick: () => router.push(route.employee.dashboard.performanceSummary),
    },
  };

  const timeOff: TimeOffProps = {
    used: 50,
    total: 100,
    requests: [
      {
        dotColor: 'blue',
        date: 'Jul 30, 2024',
        type: 'Sick',
        status: 'Approved',
      },
      {
        dotColor: 'green',
        date: 'Aug 1, 2024',
        type: 'Annual',
        status: 'Rejected',
      },
      {
        dotColor: 'red',
        date: 'Aug 12, 2024',
        type: 'Exam',
        status: 'Pending',
      },
    ],
  };

  const profileProps: ProfileProps = {
    image: '/image/team/mattew.png',
    name: 'John Doe',
    role: 'Software Engineer',
  };

  const sectionGroups: SectionCardContainerProps[][] = [
    [
      //TODO: Correct mapping of first sectionGroup grid
      // { title: 'Time-Off', children: <TimeOff {...timeOff} /> },
      // { title: 'Profile', children: <Profile {...profileProps} /> },
      // { title: 'Upcoming Event', children: <UpcomingEvent /> },
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
      {
        title: 'Recent Activity',
        children: <RecentActivityCardDetails />,
        periodClick: () => router.push(route.employee.dashboard.task),
      },
    ],
  ];

  const getGroupOneItemLayout = (index: number) => {
    return `sm:col-span-${index == 2 ? 2 : 1} lg:col-span-${
      index == 2 ? 2 : 1
    }`;
  };

  return {
    pageProps,
    sectionGroups,
    getGroupOneItemLayout,
    timeOff,
    profileProps,
  };
};

export default useEmployeeDashboardPage;
