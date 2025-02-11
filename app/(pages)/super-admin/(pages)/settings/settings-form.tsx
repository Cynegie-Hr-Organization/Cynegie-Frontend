import { AppAccordion } from "@/app/(pages)/super-admin/(pages)/settings/accordion";
import AppButton from "@/app/_components/shared/button";
import ApprovalAndWorkflowSettingsForm from "./(forms)/approval-and-workflow";
import ComplianceSettingsForm from "./(forms)/compliance";
import CustomizationSettingsForm from "./(forms)/customization";
import GeneralSettingsForm from "./(forms)/general";
import IntegrationSettingsForm from "./(forms)/integration";
import SystemMaintenanceSettingsForm from "./(forms)/system-maintenance";
import UserAcessAndSecuritySettingsForm from "./(forms)/user-access";

const SettingsForm = () => {
  return (
    <div className="space-y-8">
      <div className="common-card space-y-8">
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Company Settings</h3>
          <AppAccordion
            items={[
              {
                label: "General Settings",
                value: "general",
                contents: <GeneralSettingsForm />,
              },
              {
                label: "Compliance Settings",
                value: "compliance",
                contents: <ComplianceSettingsForm />,
              },
              {
                label: "Approval And Workflow Settings",
                value: "approval",
                contents: <ApprovalAndWorkflowSettingsForm />,
              },
              {
                label: "User Access and Security",
                value: "user",
                contents: <UserAcessAndSecuritySettingsForm />,
              },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">Personalization Settings</h3>
          <AppAccordion
            items={[
              {
                label: "Customization Settings",
                value: "customization",
                contents: <CustomizationSettingsForm />,
              },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold">System Settings</h3>
          <AppAccordion
            items={[
              {
                label: "Integration Settings",
                value: "integration",
                contents: <IntegrationSettingsForm />,
              },
              {
                label: "System Maintenance Settings",
                value: "system-maintenance",
                contents: <SystemMaintenanceSettingsForm />,
              },
            ]}
          />
        </div>
      </div>

      <FooterButtons
        btn1Label="Cancel"
        btn2Label="Save"
        onBtn1Click={() => {}}
        onBtn2Click={() => {}}
      />
    </div>
  );
};

const FooterButtons = ({
  btn1Label,
  btn2Label,
  onBtn1Click,
  onBtn2Click,
  className,
}: {
  btn1Label: string;
  btn2Label: string;
  onBtn1Click: () => void;
  onBtn2Click: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ""}`}
    >
      <AppButton
        label={btn1Label}
        className="btn-secondary"
        onClick={onBtn1Click}
      />
      <AppButton
        label={btn2Label}
        className="disabled:btn-inactive btn-primary"
        onClick={onBtn2Click}
      />
    </div>
  );
};

export default SettingsForm;
