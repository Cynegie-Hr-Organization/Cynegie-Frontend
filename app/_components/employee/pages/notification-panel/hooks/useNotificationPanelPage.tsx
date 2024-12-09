import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { useState } from 'react';
import { ModalProps } from '../../../modals/modal/types';
import { ButtonType } from '@/app/_components/shared/page/heading/types';

const useNotificationPanelPage = () => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const pageProps: PageProps = {
    text: 'Notification',
    subtitle: 'All Notifications Below',
  };

  const tableProps: TableProps = {
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ['Notification', 'From', 'Detail', 'Date'],
    bodyRowData: Array(8).fill({
      name: 'Request for time off',
      from: 'Ayomide Alibaba',
      detail: 'Your request for time off has been approved',
      date: '30 July 2024',
    }),
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ['name', 'from', 'detail', 'date'],
    actions: [
      {
        name: 'View Details',
        onClick: () => setOpenDetailsModal(true),
      },
      {
        name: 'Mark As Read',
        onClick: () => {},
      },
      {
        name: 'Delete',
        onClick: () => setOpenDeleteModal(true),
      },
    ],
    filters: [{ name: 'From', items: ['Victor'] }],
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: 'Notification',
    detailGroup: {
      details: [
        {
          name: 'Notification',
          value: 'Request for time off',
        },
        {
          name: 'FROM',
          value: 'Charleson Udor',
        },
        {
          name: 'DATE',
          value: '30 July 2024',
        },
        {
          name: 'Details',
          value:
            'Analytics delivers actionable, industry-ready initiatives each time a business complete their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed imperdiet dignissim ipsum quam.',
        },
      ],
    },
    buttonOne: {
      type: ButtonType.deleteWithIcon,
      text: 'Delete Notification',
      onClick: () => {
        setOpenDetailsModal(false);
        setOpenDeleteModal(true);
      },
    },
  };

  const deleteModalProps: ModalProps = {
    open: openDeleteModal,
    onClose: () => setOpenDeleteModal(false),
    reduceVerticalGap: true,
    hasHeading: false,
    centerImage: '/icons/modal-delete.svg',
    centerTitle: 'Are you sure that you want to delete this notification?',
    centerMessage:
      'Are you sure want to delete this notification? This action cannot be undone',
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Cancel',
      onClick: () => setOpenDeleteModal(false),
    },
    buttonTwo: {
      type: ButtonType.deleteContained,
      text: 'Delete',
      onClick: () => setOpenDeleteModal(false),
    },
  };

  const modalsProps = [detailsModalProps, deleteModalProps];

  return { pageProps, tableProps, modalsProps };
};

export default useNotificationPanelPage;
