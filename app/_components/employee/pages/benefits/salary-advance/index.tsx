'use client';
import Page from '@/app/_components/shared/page';
import CardGroup from '@/app/_components/shared/section-with-cards/card-group';
import Table from '@/app/_components/shared/table';
import useSalaryAdvancePage from '../hooks/useSalaryAdvancePage';
import Modal from '../../../modal';

const EmployeeBenefitsSalaryAdvance = () => {
  const { pageProps, cardGroupProps, tableProps, modalsProps } =
    useSalaryAdvancePage();
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

export default EmployeeBenefitsSalaryAdvance;
