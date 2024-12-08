import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';

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
  return { pageProps };
};

export default usePayrollPage;
