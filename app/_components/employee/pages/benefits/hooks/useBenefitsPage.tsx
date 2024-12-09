import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { icon, route } from '@/constants';
import { ModalProps } from '../../../modals/modal/types';
import { useState } from 'react';
import { CardGroupProps } from '@/app/_components/shared/section-with-cards/types';
import SvgIcon from '@/app/_components/icons/container';
import { useRouter } from 'next/navigation';

const useBenefitsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const router = useRouter();

  const pageProps: PageProps = {
    text: 'Benefits',
    subtitle: 'All your benefits below',
    hasButtons: true,
    leftButton: {
      type: ButtonType.outlined,
      text: 'Salary Advance',
      onClick: () => router.push(route.employee.benefits.salaryAdvance),
    },
    rightButton: {
      type: ButtonType.contained,
      text: 'Request Benefits',
      onClick: () => setOpenRequestModal(true),
    },
  };

  const giftIcon = <SvgIcon path={icon.gift} width={16} height={16} />;

  const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 3 },
    data: [
      {
        labelText: 'Total Benefits Enrolled',
        value: '10',
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: 'success',
      },
      {
        labelText: 'Active Benefits',
        value: '4',
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: 'info',
      },
      {
        labelText: 'Pending Benefits',
        value: '3',
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: 'warning',
      },
      {
        labelText: 'Upcoming Expiration',
        value: '2',
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: 'error',
      },
    ],
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: [
      'Benefit Name',
      'Benefit Type',
      'Provider',
      'Employee Contribution',
    ],
    bodyRowData: Array(5).fill({
      name: 'Health Insurance',
      type: 'Health',
      provider: 'Cynegie',
      employeeContribution: 'N20,000',
    }),
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ['name', 'type', 'provider', 'employeeContribution'],
    actions: [
      { name: 'View Details', onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [
      {
        name: 'Benefit Type',
        items: ['Health', 'Pension', 'Retirement', 'Transport', 'Life'],
      },
    ],
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: 'Request Benefit',
    subtitle: 'Request benefit below',
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          name: 'Benefit Type',
          type: 'select',
          placeholder: 'Select',
          options: [
            {
              label: 'Health Insurance',
              value: 4,
            },
            {
              label: 'Pension Insurance',
              value: 3,
            },
            {
              label: 'Retirement Insurance',
              value: 2,
            },
            {
              label: 'Transport Insurance',
              value: 1,
            },
            {
              label: 'Life Insurance',
              value: 0,
            },
          ],
        },
        {
          name: 'Provider',
          type: 'select',
          placeholder: 'Select',
          options: [
            {
              label: 'ABC Hospital',
              value: 0,
            },
          ],
        },
        {
          name: 'Coverage Detail',
          type: 'text',
          placeholder: 'Sample description here',
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
      text: 'Request Beneift',
      onClick: () => setOpenRequestModal(false),
    },
    centerButton: true,
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: 'View Details',
    subtitle: 'View details below',
    detailGroup: {
      spaceBetweenLayout: true,
      details: [
        {
          name: 'Benefit Name',
          value: 'Retirment Plans',
        },
        {
          name: 'Benefit Type',
          value: 'Financial',
        },
        {
          name: 'Provider',
          value: 'Cynegie',
        },
        {
          name: 'Start Date',
          value: 'January 30, 2024',
        },
        {
          name: 'End Date',
          value: 'December 21, 2024',
        },
        {
          name: 'Employee Contribution',
          value: 'N20,000',
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlinedBlue,
      text: 'Contact HR',
      onClick: () => setOpenDetailsModal(false),
    },
    centerButton: true,
  };

  const successModalProps: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: '/icons/modal-success.svg',
    centerTitle: 'App Requested',
    centerMessage: 'Your request has been sent successfully',
    buttonOne: {
      text: 'Return to App Dashboard',
      type: ButtonType.contained,
      onClick: () => {
        setOpenSuccessModal(false);
      },
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, detailsModalProps, successModalProps];

  return { pageProps, cardGroupProps, tableProps, modalsProps };
};

export default useBenefitsPage;
