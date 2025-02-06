"use client";
import { ButtonGroupProps } from "@/app/_components/shared/button-group/types";
import Form from "@/app/_components/shared/form";
import { FormProps } from "@/app/_components/shared/form/types";
import Page from "@/app/_components/shared/page";
import TabFormat from "@/app/_components/shared/tab-format";
import React, { FormEventHandler } from "react";

const formSectionContainer =
  "common-card !px-[80px] !pt-[60px] !pb-[80px] flex flex-col  gap-[60px]";

type AddEditEmployeeTab = {
  forms: FormProps[];
  onFormSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  buttonGroup?: ButtonGroupProps;
};

type HrAdminEmployeeDirectoryAddEditEmployeeProps = {
  title: string;
  tabValue?: number;
  handleTabChange?: (event?: React.SyntheticEvent, newValue?: number) => void;
  personalInformation: AddEditEmployeeTab;
  employment: AddEditEmployeeTab;
  compensation: AddEditEmployeeTab;
  documents: AddEditEmployeeTab;
  equipmentsAndAccess: AddEditEmployeeTab;
};

const HrAdminEmployeeDirectoryAddEditEmployee: React.FC<
  HrAdminEmployeeDirectoryAddEditEmployeeProps
> = ({
  title,
  tabValue,
  handleTabChange,
  personalInformation,
  employment,
  compensation,
  documents,
  equipmentsAndAccess,
}) => {
  return (
    <Page title={title}>
      <TabFormat
        type="multi-step-form"
        hasButtons={false}
        customTabValue={tabValue}
        customHandleChange={handleTabChange}
        tabs={[
          {
            name: "Personal Information",
            component: (
              <form
                onSubmit={personalInformation.onFormSubmit}
                className={formSectionContainer}
              >
                {personalInformation.forms.map((section) => (
                  <Form key={section.title} {...section} />
                ))}
              </form>
            ),
          },
          {
            name: "Employee Information",
            component: (
              <form
                onSubmit={employment.onFormSubmit}
                className={formSectionContainer}
              >
                {employment.forms.map((section) => (
                  <Form key={section.title} {...section} />
                ))}
              </form>
            ),
          },
          {
            name: "Compensation",
            component: (
              <form
                onSubmit={compensation.onFormSubmit}
                className={formSectionContainer}
              >
                {compensation.forms.map((section, index) => (
                  <Form key={index} {...section} />
                ))}
              </form>
            ),
          },
          {
            name: "Documents",
            component: (
              <form
                onSubmit={documents.onFormSubmit}
                className={formSectionContainer}
              >
                {documents.forms.map((section, index) => (
                  <Form key={index} {...section} />
                ))}
              </form>
            ),
          },
          {
            name: "Equipments & Access",
            component: (
              <form
                onSubmit={equipmentsAndAccess.onFormSubmit}
                className={formSectionContainer}
              >
                {equipmentsAndAccess.forms.map((section, index) => (
                  <Form key={index} {...section} />
                ))}
              </form>
            ),
          },
        ]}
      />
    </Page>
  );
};

export default HrAdminEmployeeDirectoryAddEditEmployee;
