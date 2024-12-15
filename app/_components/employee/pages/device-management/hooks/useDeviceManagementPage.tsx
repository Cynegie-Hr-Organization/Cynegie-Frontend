import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { useState } from 'react';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { ModalProps } from '../../../modal/types';

const useDeviceManagementPage = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openMaintenanceModal, setOpenMaintenanceModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  const pageProps: PageProps = {
    title: 'Employee Device Management',
    subtitle: 'Access your Employee Device Dashboard',
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: [
      'Device Name',
      'Device Type',
      'Status',
      'Assigned Date',
      'Returned Date',
    ],
    bodyRowData: [
      {
        name: 'Macbook 2021',
        type: 'Laptop',
        status: 'N850,000.00',
        assignedDate: '03-Feb-2024',
        returnedDate: '20-Feb-2024',
      },
    ],
    fieldTypes: Array(5).fill(FieldType.text),
    displayedFields: ['name', 'type', 'status', 'assignedDate', 'returnedDate'],
    actions: [
      {
        name: 'View Details',
        onClick: () => setOpenDetailsModal(true),
      },
      {
        name: 'Request Maintenance',
        onClick: () => setOpenMaintenanceModal(true),
      },
      {
        name: 'Return Device',
        onClick: () => setOpenReturnModal(true),
      },
    ],
  };

  const maintenanceModalProps: ModalProps = {
    open: openMaintenanceModal,
    onClose: () => setOpenMaintenanceModal(false),
    title: 'Request Maintenance',
    subtitle: 'Fill in the details below to request device maintenance',
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          name: 'Device Name',
          type: 'text',
          placeholder: 'Macbook Pro 2021',
        },
        {
          name: 'Reason',
          type: 'text',
          placeholder: 'Clear description of the issue',
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Cancel',
      onClick: () => setOpenMaintenanceModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: 'Request Maintenance',
      onClick: () => setOpenMaintenanceModal(false),
    },
  };

  const returnModalProps: ModalProps = {
    open: openReturnModal,
    onClose: () => setOpenReturnModal(false),
    title: 'Return Device',
    subtitle: 'Fill in the details below to return the device',
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          name: 'Device Name',
          type: 'text',
          placeholder: 'Macbook Pro 2021',
        },
        {
          name: 'Reason',
          type: 'text',
          placeholder: 'Clear description of why you are returning it',
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Cancel',
      onClick: () => setOpenReturnModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: 'Return Device',
      onClick: () => setOpenReturnModal(false),
    },
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: 'Device Details',
    subtitle: 'View device details below',
    detailGroup: {
      gridLayout: 'view-details-two',
      details: [
        {
          name: 'Assigned To',
          value: 'Salem David',
        },
        {
          name: 'Device Type',
          value: 'Macbook Pro 2021',
        },
        {
          name: 'Serial Number',
          value: 'W88401231AX',
        },
        {
          name: 'Device Details',
          value: `Device name HP Elitebook Processor	14th Gen Intel(R) Core(TM) i8-1335U   1.40 GHz\nInstalled RAM 16.0 GB (15.6 GB usable)\nDevice ID ABCDEFG6-1234-123-AVBNHJKI\nProduct ID ABVG-1234\nSystem type 64-bit operating system, x64-based processor\nPen and touch No pen or touch input is available for this display`,
        },
      ],
    },
  };

  const modalsProps = [
    maintenanceModalProps,
    returnModalProps,
    detailsModalProps,
  ];

  return { pageProps, tableProps, modalsProps };
};

export default useDeviceManagementPage;
