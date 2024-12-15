'use client';
import Page from '@/app/_components/shared/page';
import useEmployeeDashboardPage from './hooks';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import TimeOff from './sections/time-off';
import Profile from './sections/profile';
import UpcomingEvent from './sections/upcoming-event';
import { useRouter } from 'next/navigation';
import { icon, route } from '@/constants';
import SvgIcon from '@/app/_components/icons/container';

const EmployeeDashboard = () => {
  const {
    pageProps,
    sectionGroups,
    getGroupOneItemLayout,
    timeOff,
    profileProps,
    headerIconSize,
  } = useEmployeeDashboardPage();

  const router = useRouter();

  return (
    <Page {...pageProps}>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-[-30]'>
        <div className='common-card sm:col-span-1 lg:col-span-1'>
          <SectionCardContainer
            headerIcon={
              <SvgIcon
                path={icon.clockTwo}
                width={headerIconSize}
                height={headerIconSize}
              />
            }
            title={'Time-Off'}
            period='View More'
            periodFont={{ color: 'black' }}
            periodClick={() => router.push(route.employee.leave.home)}
            headerDivider
          >
            <TimeOff {...timeOff} />
          </SectionCardContainer>
        </div>
        <div className='common-card sm:col-span-1 lg:col-span-1'>
          <SectionCardContainer
            headerIcon={
              <SvgIcon
                path={icon.user}
                width={headerIconSize}
                height={headerIconSize}
              />
            }
            title={'Profile'}
            period='View More'
            periodFont={{ color: 'black' }}
            periodClick={() => router.push(route.employee.profile.home)}
            headerDivider
          >
            <Profile {...profileProps} />
          </SectionCardContainer>
        </div>
        <div className='common-card sm:col-span-2 lg:col-span-2'>
          <SectionCardContainer
            headerIcon={
              <SvgIcon
                path={icon.calendarThree}
                width={headerIconSize}
                height={headerIconSize}
              />
            }
            title={'Upcoming Event'}
            period='View More'
            periodFont={{ color: 'black' }}
            periodClick={() =>
              router.push(route.employee.dashboard.upcomingWidget)
            }
            headerDivider
          >
            <UpcomingEvent />
          </SectionCardContainer>
        </div>
      </div>
      {sectionGroups.map((sectionGroup, groupIndex) => (
        <div
          key={groupIndex}
          className={`${
            groupIndex === 0
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'grid grid-cols-1 md:grid-cols-3 gap-6'
          }`}
        >
          {sectionGroup.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`${
                groupIndex === 0 ? getGroupOneItemLayout(sectionIndex) : ''
              } common-card`}
            >
              <SectionCardContainer
                headerIcon={section.headerIcon}
                periodFont={{ color: 'black' }}
                title={section.title}
                period='View More'
                periodClick={section.periodClick}
                headerDivider
              >
                {section.children}
              </SectionCardContainer>
            </div>
          ))}
        </div>
      ))}
    </Page>
  );
};

export default EmployeeDashboard;
