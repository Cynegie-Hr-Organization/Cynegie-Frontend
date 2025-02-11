"use client";
import { Alert, Avatar, Stack } from "@mui/material";
import "rsuite/dist/rsuite.min.css";
import { BsExclamationCircle } from "react-icons/bs";
import Page from "@/app/_components/shared/page";
import useEmployeeProfilePage from "./hooks";
import Form from "@/app/_components/shared/form";
import ButtonGroup from "@/app/_components/shared/button-group";
import Modal from "../../modal";

const EmployeeProfile = () => {
  const {
    pageProps,
    formProps,
    editButtonProps,
    userDetails,
    editRequestModalProps,
  } = useEmployeeProfilePage();

  return (
    <Page {...pageProps}>
      <Stack className="common-card" gap={3} py={7} px={8}>
        <Alert icon={<BsExclamationCircle />} severity="warning">
          Note that all updates you make will only reflect after approval from
          your Administrator
        </Alert>
        <div className="flex flex-col items-center gap-2">
          <Avatar src="" sx={{ width: "74px", height: "74px" }} />
          <div className="card-title-small">{userDetails?.firstName ?? ""}</div>
        </div>
        <div className="card-title-small">Bio Data</div>
        <Form {...formProps} />
      </Stack>
      <ButtonGroup
        position="end"
        leftButton={{}}
        rightButton={editButtonProps}
      />
      <Modal {...editRequestModalProps} />
    </Page>
  );
};

export default EmployeeProfile;
