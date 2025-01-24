import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { CardProps } from '@/app/_components/shared/section-with-cards/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { useState } from 'react';
import { ModalProps } from '../../../modal/types';
import { useQuery } from '@tanstack/react-query';
import { getAllMyPayroll } from '@/app/api/services/employee/payroll';
import Skeleton from '@mui/material/Skeleton';
import { debounce } from 'lodash';
import { FetchParams } from '@/types';

const usePayrollPage = () => {
  const [openPayrollSlip, setOpenPayrollSlip] = useState(false);
const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "desc",
    search: undefined,
});
  
  const { data: payrollData, isLoading } = useQuery({
    queryKey: ['payroll' , {...fetchParams}],
    queryFn: async () => {
      const response = await getAllMyPayroll(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  console.log(payrollData);


   // Debounced search
    const debouncedSearch = debounce((value: string) => {
      setFetchParams((prev) => ({ ...prev, search: value || undefined }));
    }, 300);
  
    const handleSearch = (value: string) => {
      debouncedSearch(value);
    };

  const pageProps: PageProps = {
    title: 'Employee Payroll Dashboard',
    subtitle: 'Access your Employee Payroll Dashboard',
    hasButtons: true,
    leftButton: {
      type: ButtonType.outlined,
      text: 'Download Payslip',
    },
    rightButton: {
      type: ButtonType.contained,
      text: 'View Payslip',
      onClick: () => setOpenPayrollSlip(true),
    },
    rightButtonSm: true,
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
      value: 'N370,000.00',
    },
    {
      labelText: 'Time in Company',
      value: '9 months', // This value should be fetched or calculated based on actual data
    },
  ];

  const tableProps: TableProps = {
    hasCheckboxes: true,
    title: 'Payroll Activities',
    headerRowData: ['Pay Date', 'Name', 'Total Amount', 'Net Pay'],
    bodyRowData: isLoading
      ? Array(5).fill({
          date: <Skeleton width={100} />,
          name: <Skeleton width={100} />,
          totalAmount: <Skeleton width={100} />,
          netPay: <Skeleton width={100} />,
        })
      : payrollData?.data.map((payroll) => ({
          date: new Date(payroll.payroll.paymentDate).toLocaleDateString(),
          name: payroll.payroll.payrollName,
          totalAmount: `N${payroll.totalEarnings.toFixed(2)}`,
          netPay: `N${payroll.totalEarnings.toFixed(2)}`, // Adjust based on actual net pay if available
        })) || [],
    fieldTypes: [
      FieldType.text,
      FieldType.text,
      FieldType.text,
      FieldType.text,
    ],
        onSearch: handleSearch,
    displayedFields: ['date', 'name', 'totalAmount', 'netPay'],
  };

  const payrollSlipModalProps: ModalProps = {
    hasHeading: false,
    isPayrollSlip: true,
    open: openPayrollSlip,
    onClose: () => setOpenPayrollSlip(false),
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Back to Payroll',
      onClick: () => setOpenPayrollSlip(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: 'Download Payslip',
    },
    buttonGroupPosition: 'end',
  };

  return { pageProps, tableProps, cards, payrollSlipModalProps };
};

export default usePayrollPage;  