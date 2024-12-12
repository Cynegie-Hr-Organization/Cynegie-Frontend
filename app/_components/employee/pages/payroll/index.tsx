'use client';
import { Grid2 } from '@mui/material';
import usePayrollPage from './hooks/usePayrollPage';
import Page from '@/app/_components/shared/page';
import Table from '@/app/_components/shared/table';
import Card from '@/app/_components/shared/section-with-cards/card-group/card';

const EmployeePayroll = () => {
  const { pageProps, tableProps, cards } = usePayrollPage();
  return (
    <Page {...pageProps}>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {cards.map((card, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card {...card} />
          </Grid2>
        ))}
      </Grid2>
      <Table {...tableProps} />
    </Page>
  );
};

export default EmployeePayroll;
