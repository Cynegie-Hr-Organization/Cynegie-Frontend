'use client';
import Page from '@/app/_components/shared/page';
import useAppRequestsPage from './hooks/useAppRequestsPage';
import Table from '@/app/_components/shared/table';
import Modal from '../../modals/modal';

const EmployeeAppRequestsAndPermissions = () => {
  const { pageProps, tableProps, modalsProps } = useAppRequestsPage();
  return (
    <Page {...pageProps}>
      <Table {...tableProps} />
      {modalsProps.map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </Page>
  );
};

export default EmployeeAppRequestsAndPermissions;
