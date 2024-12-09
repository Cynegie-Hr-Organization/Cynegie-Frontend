import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { CardProps } from '@/app/_components/shared/section-with-cards/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';

const usePayrollPage = () => {
  const pageProps: PageProps = {
    text: 'Employee Payroll Dashboard',
    subtitle: 'Access your Employee Payroll Dashboard',
    leftButton: {
      type: ButtonType.outlined,
      text: 'Download Payslip',
    },
    rightButton: {
      type: ButtonType.contained,
      text: 'View Payslip',
    },
  };

  const cards: CardProps[] = [
    {
      labelText: 'Next Payday',
      value: '28th August',
    },
    {
      labelText: 'Last Paycheck',
      value: 'N850,000.00',
    },
    {
      labelText: 'YTD Earnings',
      value: 'N3,750,000.00',
      // additionalInfo: { value: '₦7,251,000', description: '28-Jul-2024' },
    },
    {
      labelText: 'Time in Company',
      value: '9 months',
    },
  ];

  const tableProps: TableProps = {
    hasCheckboxes: true,
    title: 'Payroll Activities',
    headerRowData: ['Pay Date', 'Name', 'Total Amount', 'Net Pay'],
    bodyRowData: Array(5).fill({
      date: '28-Jul-2024',
      name: 'July Salary',
      totalAmount: 'N925,000.00',
      netPay: 'N850,000.00',
    }),
    fieldTypes: Array(5).fill(FieldType.text),
    displayedFields: ['date', 'name', 'totalAmount', 'netPay'],
  };

  return { pageProps, tableProps, cards };
};

export default usePayrollPage;
