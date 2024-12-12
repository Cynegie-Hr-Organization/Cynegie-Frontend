import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { APRStatusMap, icon, route } from '@/constants';
import { useState } from 'react';
import { CardGroupProps } from '@/app/_components/shared/section-with-cards/types';
import SvgIcon from '@/app/_components/icons/container';
import { useRouter } from 'next/navigation';
import { ModalProps } from '../../../modal/types';

const useSalaryAdvancePage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const router = useRouter();

  const pageProps: PageProps = {
    backText: 'Back to Benefits',
    onBackTextClick: () => router.push(route.employee.benefits.home),
    text: 'Salary Advance',
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: 'Request Salary Advance',
      onClick: () => setOpenRequestModal(true),
    },
  };

  const svgIcon = <SvgIcon path={icon.paperMoney} width={16} height={16} />;

  const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 4 },
    data: [
      {
        labelText: 'Approved Requests',
        value: '10',
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: 'info',
      },
      {
        labelText: 'Pending Requests',
        value: '4',
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: 'warning',
      },
      {
        labelText: 'Rejeted Requests',
        value: '3',
        valueBelow: true,
        icon: svgIcon,
        iconColorVariant: 'error',
      },
    ],
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: [
      'Advance Taken',
      'Status',
      'Amount Repaid',
      'Next Payment Date',
    ],
    bodyRowData: Array(5).fill({
      advanceTaken: 'N100,000',
      status: 'Approved',
      amountRepaid: 'N50,000',
      nextPaymentDate: 'Oct 15, 2024',
    }),
    fieldTypes: [
      FieldType.text,
      FieldType.status,
      ...Array(2).fill(FieldType.text),
    ],
    displayedFields: [
      'advanceTaken',
      'status',
      'amountRepaid',
      'nextPaymentDate',
    ],
    statusMap: APRStatusMap,
    actions: [{ name: 'No  Actions', onClick: () => {} }],
    filters: [
      {
        name: 'Status',
        items: ['All', 'Approved', 'Pending', 'Rejected'],
      },
    ],
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: 'Request Salary Advance',
    subtitle: 'Request Salary Advance',
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          name: 'Advance to be Taken',
          type: 'text',
        },
        {
          name: 'Installment Amount',
          type: 'text',
        },
        {
          name: 'Repayment Frequency',
          type: 'select',
          placeholder: 'Select',
          options: [
            {
              label: 'Monthly',
              value: 1,
            },
            {
              label: 'Weekly',
              value: 0,
            },
          ],
        },
        {
          name: 'Monthly Cost',
          type: 'text',
          placeholder: '',
        },
      ],
    },
    buttonOne: {
      type: ButtonType.contained,
      text: 'Request Salary Advance',
      onClick: () => setOpenRequestModal(false),
    },
    centerButton: true,
  };

  const successModalProps: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: '/icons/modal-success.svg',
    centerTitle: 'Advance Requested',
    centerMessage: 'Your request has been sent successfully',
    buttonOne: {
      text: 'Return to Salary Advance Dashboard',
      type: ButtonType.contained,
      onClick: () => {
        setOpenSuccessModal(false);
      },
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, successModalProps];

  return { pageProps, cardGroupProps, tableProps, modalsProps };
};

export default useSalaryAdvancePage;
