import Button from "@/app/_components/shared/button-group/button";
import DetailGroup from "@/app/_components/shared/detail-group";
import Form from "@/app/_components/shared/form";
import { icon } from "@/constants";
import { Checkbox, Dialog, DialogContent, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import ButtonGroup from "../../shared/button-group";
import Heading from "../../shared/page/heading";
import PayrollSlip from "../pages/payroll/payroll-slip";
import ViewTask from "../pages/task/view-task";
import { ModalProps } from "./types";

const dialogStyle = {
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "950px",
  },
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    onClose,
    title,
    subtitle,
    buttonOne,
    buttonTwo,
    centerButton,
    hasHeading = true,
    centerImage,
    centerTitle,
    centerMessage,
    reduceVerticalGap = false,
    detailGroup,
    form,
    forms,
    isPayrollSlip = false,
    buttonGroupPosition = "center",
    viewTaskProps,
    hasDocSelect,
    onFormSubmit,
    formRegister,
    formErrors,
    formControl,
    formButtonGroup,
  } = props;

  return (
    <Dialog sx={{ ...dialogStyle }} open={open} onClose={onClose}>
      <DialogContent sx={{ overflowX: isPayrollSlip ? "hidden" : "auto" }}>
        {isPayrollSlip ? (
          <PayrollSlip />
        ) : (
          <Stack gap={reduceVerticalGap ? 2 : 4} padding={3}>
            {hasHeading && (
              <Heading
                title={title}
                subtitle={subtitle}
                type="modal"
                onCloseClick={onClose}
              />
            )}
            {viewTaskProps && <ViewTask {...viewTaskProps} />}
            {centerImage && (
              <div className="flex justify-center">
                <Image src={centerImage} width={100} height={100} alt="" />
              </div>
            )}
            {centerTitle && (
              <div className="flex justify-center text-center">
                <p className=" card-title-large">{centerTitle}</p>
              </div>
            )}
            {centerMessage && (
              <div className="flex justify-center text-center">
                <p className=" card-subtitle-small">{centerMessage}</p>
              </div>
            )}
            {detailGroup && <DetailGroup {...detailGroup} />}
            {hasDocSelect && (
              <div className="flex justify-center gap-10">
                {[
                  { name: "PDF", icon: icon.pdf },
                  { name: "Excel", icon: icon.excel },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center gap-1">
                    <Checkbox />
                    <Image src={doc.icon} width={20} height={20} alt="" />
                    <div className="text-[#475367] text-[14px] font-bold">
                      {doc.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {form && <Form {...form} />}
            {forms && (
              <form className="flex flex-col gap-10" onSubmit={onFormSubmit}>
                {forms.map((form, index) => (
                  <Form
                    key={index}
                    {...form}
                    register={formRegister}
                    errors={formErrors}
                    control={formControl}
                  />
                ))}
                {formButtonGroup && (
                  <div className="mt-8 mb-[-20]">
                    <ButtonGroup {...formButtonGroup} />
                  </div>
                )}
              </form>
            )}
            {!buttonTwo && (
              <div className={`flex ${centerButton && "justify-center"}`}>
                <Button {...buttonOne} />
              </div>
            )}
          </Stack>
        )}
        {buttonOne && buttonTwo && (
          <div className="mt-5 mb-3">
            <ButtonGroup
              leftButton={buttonOne}
              rightButton={buttonTwo}
              position={buttonGroupPosition}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
