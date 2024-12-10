'use client';
import Page from '@/app/_components/shared/page';
import useEmployeeDashboardPage from './hooks';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';

const EmployeeDashboard = () => {
  const { pageProps, sectionGroups, getGroupOneItemLayout } =
    useEmployeeDashboardPage();

  return (
    <Page {...pageProps}>
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
                title={section.title}
                period='View More'
                children={section.children}
                headerDivider
              />
            </div>
          ))}
        </div>
      ))}
    </Page>
  );
};

export default EmployeeDashboard;
