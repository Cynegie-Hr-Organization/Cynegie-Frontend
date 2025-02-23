import React, { useState } from "react";
import Modal from "@/app/_components/employee/modal";
import { ButtonType } from "@/app/_components/shared/page/heading/types";

interface DownloadModalWrapperProps {
  open: boolean;
  onClose: () => void;
}

const DownloadModalWrapper: React.FC<DownloadModalWrapperProps> = ({
  open,
  onClose,
}) => {
  const [selectedDocType, setSelectedDocType] = useState<
    "pdf" | "excel" | null
  >(null);

  const handleDownload = () => {
    if (selectedDocType) {
      // Handle the download logic based on the selectedDocType
      console.log(`Downloading report as ${selectedDocType}`);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      hasDocSelect
      getDoc={(docType) => docType && setSelectedDocType(docType)}
      buttonOne={{
        type: ButtonType.outlined,
        text: "Cancel",
        onClick: onClose,
      }}
      buttonTwo={{
        type: ButtonType.contained,
        text: "Download",
        onClick: handleDownload,
      }}
      centerTitle="Download KPI Report"
      centerMessage="Select the format you would like to download your report "
      hasHeading
    />
  );
};

export default DownloadModalWrapper;
