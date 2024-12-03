import { PageProps } from '@/app/_components/shared/page/types';

const performanceManagementPageData: PageProps = {
  text: 'Performance Management',
  hasButtons: true,
  outlinedButton: {
    text: 'Actions',
    popoverOptions: [
      { name: 'Development Plan', onClick: () => {} },
      { name: 'Create Goals', onClick: () => {} },
    ],
  },
  containedButton: {
    text: 'Continuous Feedback',
  },
};

export default performanceManagementPageData;
