'use client';
import Page from '@/app/_components/shared/page';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import QuickAction from './quick-action';
import { color, icon, route } from '@/constants';
import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import { useRouter } from 'next/navigation';

const EmployeePerformanceSummary = () => {
  const router = useRouter();
  return (
    <Page
      text='Dashboard'
      subtitle='Access your Employee Dashboard'
      hasButtons
      rightButton={{
        type: ButtonType.outlined,
        text: 'Actions',
        popoverOptions: [{ name: 'No Actions', onClick: () => {} }],
      }}
      rightButtonSm
    >
      <div className='common-card'>
        <SectionCardContainer title='Performance Summary'>
          <></>
        </SectionCardContainer>
      </div>
      <div className='flex flex-col gap-4'>
        <h6>Quick Actions</h6>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {[
            {
              icon: icon.user,
              text: 'Financial Management',
              bgColor: color.warning.light,
              color: color.warning.dark,
            },
            {
              icon: icon.signOut,
              text: 'Financial Management',
              bgColor: color.success.light,
              color: color.success.dark,
            },
            {
              icon: icon.receipt,
              text: 'Financial Management',
              bgColor: color.info.light,
              color: color.info.dark,
            },
          ].map((action, index) => (
            <div
              key={index}
              className={`${
                index == 2 && 'col-span-1 sm:col-span-2 md:col-span-1'
              }`}
            >
              <QuickAction {...action} />
            </div>
          ))}
        </div>
      </div>
      <div className='common-card'>
        <SectionCardContainer title='Recent Activity'>
          {[
            {
              label: 'You submitted leave request',
              countedItemName: '12 Jul, 2024',
            },
            {
              label: 'Your leave request has been approved',
              countedItemName: '08 Jul, 2024',
            },
          ].map((activity) => (
            <DotLegend
              key={activity.label}
              dotColor={color.info.dark}
              {...activity}
            />
          ))}
        </SectionCardContainer>
      </div>
    </Page>
  );
};

export default EmployeePerformanceSummary;
