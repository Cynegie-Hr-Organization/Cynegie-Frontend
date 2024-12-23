'use client';
import DetailGroup from '@/app/_components/shared/detail-group';
import Page from '@/app/_components/shared/page';
import SectionCardContainer from '@/app/_components/shared/section-with-cards/container';
import { route } from '@/constants';
import { useRouter } from 'next/navigation';

const HrAdminDeviceManagementViewDeviceInfo = () => {
  const router = useRouter();
  return (
    <Page
      backText='Device Inventory'
      onBackTextClick={() =>
        router.push(route.hrAdmin.deviceManagement.overview.inventory)
      }
      title='View Device Information'
    >
      <SectionCardContainer isCard title='Device Information Details'>
        <DetailGroup
          details={[
            {
              name: 'Deparmtent',
              value: 'Product',
            },
            {
              name: 'Assigned to',
              value: 'Salem David',
            },
            {
              name: 'Device Type',
              value: 'Macbook Pro 2021',
            },
            {
              name: 'Status',
              type: 'status',
              statusMap: { Active: 'success' },
              value: 'Active',
            },
            {
              name: 'Device Details',
              value: `Device name: HP Elitebook\nProcessor:	14th Gen Intel(R) Core(TM) i8-1335U   1.40 GHz\nInstalled RAM:	16.0 GB (15.6 GB usable)\nDevice ID:	ABCDEFG6-1234-123-AVBNHJKI\nProduct ID: ABVG-1234\nSystem type:	64-bit operating system, x64-based processor\nPen and touch	No pen or touch input is available for this display`,
            },
            {
              name: 'Serial Number',
              value: 'W88401231AX',
            },
          ]}
        />
      </SectionCardContainer>
    </Page>
  );
};

export default HrAdminDeviceManagementViewDeviceInfo;
