'use client';
import Page from '@/app/_components/shared/page';
import useBenefitsPage from './hooks/useBenefitsPage';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import Table from '@/app/_components/shared/table';
import Modal from '../../modal';

const EmployeeBenefits = () => {
  const { pageProps, cardGroupProps, tableProps, modalsProps } =
    useBenefitsPage();
  return (
    <Page {...pageProps}>
      <CardGroup {...cardGroupProps} />
      <Table {...tableProps} />
      {modalsProps.map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </Page>
  );
};

export default EmployeeBenefits;
