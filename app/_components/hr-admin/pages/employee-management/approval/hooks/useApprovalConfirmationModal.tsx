import { ModalProps } from '@/app/_components/employee/modal/types';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { useState } from 'react';

const useApprovalConfirmationModal = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const confirmationModalProps: ModalProps = {
    open: openConfirmationModal,
    onClose: () => setOpenConfirmationModal(false),
    hasHeading: false,
    centerTitle: 'Approve Request',
    centerMessage: 'Are you sure you want to approve the request',
    buttonOne: {
      type: ButtonType.outlined,
      text: 'Cancel',
      onClick: () => setOpenConfirmationModal(false),
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: 'Confirm Approval',
    },
  };

  return {
    openConfirmationModal,
    setOpenConfirmationModal,
    confirmationModalProps,
  };
};

export default useApprovalConfirmationModal;
