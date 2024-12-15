import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { ReadAdminStatusMap } from '@/constants';
import { useState } from 'react';
import { ModalProps } from '../../../modal/types';

const useAppRequestsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const pageProps: PageProps = {
    title: 'Your Apps & Request',
    subtitle: 'All Apps and Requests Below',
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: 'App Request',
      onClick: () => setOpenRequestModal(true),
    },
    rightButtonSm: true,
  };

  const tableProps: TableProps = {
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ['Request ID', 'App Name', 'Access Level', 'Request Date'],
    bodyRowData: Array(8).fill({
      requestId: '202201301610',
      appName: 'Figma',
      accessLevel: 'Read',
      requestDate: '30 July 2024',
    }),
    fieldTypes: [
      ...Array(2).fill(FieldType.text),
      FieldType.status,
      FieldType.text,
    ],
    statusMap: ReadAdminStatusMap,
    displayedFields: ['requestId', 'appName', 'accessLevel', 'requestDate'],
    actions: [
      { name: 'View Details', onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [{ name: 'Access Level', items: ['All', 'Admin', 'Read'] }],
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: 'App Request',
    subtitle: 'Fill in the details below to return an app',
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          name: 'App Name',
          type: 'text',
          placeholder: 'Figma',
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
      onClick: () => setOpenRequestModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: 'Requst App',
      onClick: () => {
        setOpenRequestModal(false);
        setOpenSuccessModal(true);
      },
    },
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: 'App Details',
    subtitle: 'View app details below',
    detailGroup: {
      gridLayout: 'view-details-two',
      details: [
        {
          name: 'Assigned To',
          value: 'Salem David',
        },
        {
          name: 'App Name',
          value: 'Figma',
        },
        {
          name: 'Request Id',
          value: 'W88401231AX',
        },
        {
          name: 'App Details',
          value:
            'Figma app aims to streamline and optimize human resource processes by providing an all-in-one platform for managing employee records, payroll, recruitment, performance evaluations, and compliance tracking.',
        },
      ],
    },
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

  return { pageProps, tableProps, modalsProps };
};

export default useAppRequestsPage;
