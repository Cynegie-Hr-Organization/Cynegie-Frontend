'use client';
import useNotificationPanelPage from './hooks/useNotificationPanelPage';
import Page from '@/app/_components/shared/page';
import Table from '@/app/_components/shared/table';
import Modal from '../../modals/modal';

const EmployeeNotificationPanel = () => {
  const { pageProps, tableProps, modalsProps } = useNotificationPanelPage();
  return (
    <Page {...pageProps}>
      <Table {...tableProps} />
      {modalsProps.map((props) => (
        <Modal {...props} />
      ))}
    </Page>
  );
};

export default EmployeeNotificationPanel;
