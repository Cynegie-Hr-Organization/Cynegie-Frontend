import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import { AppAccordion } from "@/app/(pages)/super-admin/(pages)/settings/accordion";
import AppButton from "@/app/_components/shared/button";
import { useSuperAdminSettings, useSuperAdminSettingsMutations } from "@/app/_core/use-cases/superadmin/useSuperAdminSettings";
import { useAppToast } from "@/app/_hooks/toast";
import { useEffect } from "react";
import ApprovalAndWorkflowSettingsForm from "./(forms)/approval-and-workflow";
import ComplianceSettingsForm from "./(forms)/compliance";
import CustomizationSettingsForm from "./(forms)/customization";
import GeneralSettingsForm from "./(forms)/general";
import IntegrationSettingsForm from "./(forms)/integration";
import SystemMaintenanceSettingsForm from "./(forms)/system-maintenance";
import UserAcessAndSecuritySettingsForm from "./(forms)/user-access";





const SettingsForm = () => {
  const { data: generalSettings } = useSuperAdminSettings();
  const { data, setData } = useFormStore();
  const { updateSettings } = useSuperAdminSettingsMutations();
  // const { data } = useSharedState({});
  const { apptoast } = useAppToast();
  const isUpdating = updateSettings.isPending;
  // const router = useRouter();

  useEffect(() => {
    if (generalSettings) {
      const { updatedAt, createdAt, } = generalSettings
      if (!updatedAt || !createdAt) {
        setData(generalSettings)
      }
    }
  }, [generalSettings]);

  // console.log('After useEffect - formData:', formData);

  // if (isLoading) {
  //   return <div>Loading settings...</div>;
  // }

  const handleSave = () => {
    updateSettings.mutate(data, {
      onSuccess: () => apptoast.success({ title: 'Successful', message: 'Settings updated successfully' }),
      onError: (error) => apptoast.error({ title: `${error.name ?? 'Error'}`, message: `${error.message ?? 'Something went wrong'}` })
    })
  }

  const handleCancel = () => {
    if (isUpdating) {
      updateSettings.cancel();
    }
  }

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
        onBtn1Click={handleCancel}
        onBtn2Click={handleSave}
        isBtn2Loading={isUpdating}
        btn2Disabled={isUpdating}
      />
    </div>
  )
}

const FooterButtons = ({ btn1Label,
  btn2Label, onBtn1Click, onBtn2Click,
  className,
  btn1Disabled,
  btn2Disabled,
  isBtn1Loading,
  isBtn2Loading }: {
    btn1Label: string,
    btn2Label: string,
    onBtn1Click: () => void,
    onBtn2Click: () => void,
    className?: string,
    btn1Disabled?: boolean,
    btn2Disabled?: boolean,
    isBtn1Loading?: boolean,
    isBtn2Loading?: boolean
  }) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ""}`}
    >
      <AppButton
        label={btn1Label}
        className="btn-secondary"
        disabled={btn1Disabled}
        isLoading={isBtn1Loading}
        onClick={onBtn1Click}
      />
      <AppButton label={btn2Label}
        className="btn-primary"
        disabled={btn2Disabled}
        isLoading={isBtn2Loading}
        onClick={onBtn2Click}
      />
    </div>
  )
}

export default SettingsForm;
