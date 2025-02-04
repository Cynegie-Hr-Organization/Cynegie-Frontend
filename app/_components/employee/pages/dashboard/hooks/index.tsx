import DetailGroup from '@/app/_components/shared/detail-group';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { SectionCardContainerProps } from '@/app/_components/shared/section-with-cards/types';
import RecentActivityCardDetails from '../sections/recent-activity';
import { TimeOffProps } from '../sections/time-off/types';
import { ProfileProps } from '../sections/profile/types';
import { useRouter } from 'next/navigation';
import { icon, route } from '@/constants';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/utils/getUserDetails';
import SvgIcon from '@/app/_components/icons/container';
import useRequests from './useAllMetrics';

const useEmployeeDashboardPage = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const { deviceRequests, appRequests, isDeviceLoading, isAppLoading } = useRequests();

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    fetchDetails();
  }, []);

  const headerIconSize = 24;

  const pageProps: PageProps = {
    title: 'Dashboard',
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
    image: '',
    name: userDetails?.name ?? '',
    role: 'Human Resources',
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
        headerIcon: (
          <SvgIcon
            path={icon.workstation}
            width={headerIconSize}
            height={headerIconSize}
          />
        ),
        title: 'Device Management',
        periodClick: () => router.push(route.employee.device.home),
        children: (
          <DetailGroup
            loading={isDeviceLoading}
            details={[
              { name: 'Device Name', value: deviceRequests[0]?.deviceId.deviceName },
              { name: 'Description', value: deviceRequests[0]?.deviceId.description },
              { name: 'Location', value: deviceRequests[0]?.deviceId.location },
              { name: 'Status', value: deviceRequests[0]?.status },
              { name: 'Requested Date', value: new Date(deviceRequests[0]?.requestedDate).toLocaleDateString() },
            ]}
          />
        ),
      },
      {
        headerIcon: (
          <SvgIcon
            path={icon.cube}
            width={headerIconSize}
            height={headerIconSize}
          />
        ),
        title: 'App Management',
        periodClick: () => router.push(route.employee.appRequest.home),
        children: (
          <DetailGroup
            loading={isAppLoading}
            details={[
              { name: 'App Name', value: appRequests[0]?.appId.appName },
              { name: 'App ID', value: appRequests[0]?.appId.id },
              { name: 'Status', value: appRequests[0]?.status },
              { name: 'Request Date', value: new Date(appRequests[0]?.requestDate).toLocaleDateString() },
            ]}
          />
        ),
      },
      {
        headerIcon: (
          <SvgIcon
            path={icon.thunderbolt}
            width={headerIconSize}
            height={headerIconSize}
          />
        ),
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
    headerIconSize,
  };
};

export default useEmployeeDashboardPage;