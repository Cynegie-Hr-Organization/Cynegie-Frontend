"use client";
import Table from "@/app/_components/shared/table";
import useDeviceManagementPage from "./hooks/useDeviceManagementPage";
import Page from "@/app/_components/shared/page";
import Modal from "../../modal";

const EmployeeDeviceManagement = () => {
  const { pageProps, tableProps, modalsProps } = useDeviceManagementPage();
  return (
    <Page {...pageProps}>
      <Table {...tableProps} />
      {modalsProps.map((props, index) => (
        <Modal key={index} {...props} />
      ))}
    </Page>
  );
};

export default EmployeeDeviceManagement;
