'use client'

import PermissionOptionLayout from "@/app/(pages)/super-admin/(pages)/users/users-permission/manage/permission-options";
import { SuccessSvg } from "@/app/_components/icons/custom-icons";
import { AppAlertDialog } from "@/app/_components/shared/alert";
import AppButton from "@/app/_components/shared/button";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FinanceAdminOptions } from "./(options)/finance-admin-option";
import { HRAdminOptions } from "./(options)/hr-admin-option";
import { ITAdminOptions } from "./(options)/it-admin-option";




const EditUserPermission = () => {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: 'John',
    middleName: 'Magnanimous',
    lastName: 'Doe',
    staffEmail: 'johndoe@example.com',
    role: '',
    financeAdminSwitches: {
      accessType: {
        fullAccess: false,
        limitAccess: false,
        viewOnlyAccess: false,
      },
      chartOfAccount: false,
      budgets: false,
      journals: false,
      banking: false,
      bankingTransaction: false
    },
    hrAdminSwitches: {
      accessType: {
        fullAccess: false,
        limitAccess: false,
        viewOnlyAccess: false,
      },
      onboarding: false,
      hiring: false,
      employeeManagement: false,
      performanceManagement: false,
      payroll: false,
      deviceManagement: false,
      appManagement: false,
    },
    itAdminSwitches: {
      accessType: {
        fullAccess: false,
        limitAccess: false,
        viewOnlyAccess: false,
      },
      itAdministration: false
    }
  })

  const setAllSwitches = (prev: FormData, role: UserRoles, accessType: AccessType): FormData => {
    const value = accessType === 'fullAccess';

    if (role === 'finance-admin') {
      return {
        ...prev,
        financeAdminSwitches: {
          ...prev.financeAdminSwitches,
          accessType: {
            fullAccess: value,
            limitAccess: accessType === 'limitAccess',
            viewOnlyAccess: accessType === 'viewOnlyAccess',
          },
          chartOfAccount: value,
          budgets: value,
          journals: value,
          banking: value,
          bankingTransaction: value,
        },
      };
    } else if (role === 'hr-admin') {
      return {
        ...prev,
        hrAdminSwitches: {
          ...prev.hrAdminSwitches,
          accessType: {
            fullAccess: value,
            limitAccess: accessType === 'limitAccess',
            viewOnlyAccess: accessType === 'viewOnlyAccess',
          },
          onboarding: value,
          hiring: value,
          employeeManagement: value,
          performanceManagement: value,
          payroll: value,
          deviceManagement: value,
          appManagement: value,
        },
      };
    } else if (role === 'it-admin') {
      return {
        ...prev,
        itAdminSwitches: {
          ...prev.itAdminSwitches,
          accessType: {
            fullAccess: value,
            limitAccess: accessType === 'limitAccess',
            viewOnlyAccess: accessType === 'viewOnlyAccess',
          },
          itAdministration: value,
        },
      };
    }

    return prev;
  };

  const handleAccessTypeChange = (accessType: AccessType) => {
    const getSwitchesKey = (role: UserRoles): keyof FormData => {
      if (role === 'finance-admin') {
        return 'financeAdminSwitches';
      } else if (role === 'hr-admin') {
        return 'hrAdminSwitches';
      }
      return 'itAdminSwitches';
    };

    setFormData(prev => {
      const switchesKey = getSwitchesKey(prev.role);
      const switches = prev[switchesKey] as SwitchState;

      console.log(switchesKey, switches)

      const updatedState = {
        ...prev,
        [switchesKey]: {
          ...switches,
          accessType: {
            fullAccess: accessType === 'fullAccess',
            limitAccess: accessType === 'limitAccess',
            viewOnlyAccess: accessType === 'viewOnlyAccess',
          },
        },
      };


      return setAllSwitches(updatedState, prev.role as UserRoles, accessType);
    });
  };









  useEffect(() => {
    const isValidFormInputFields = () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      return Boolean(
        formData.firstName &&
        formData.middleName &&
        formData.lastName &&
        emailRegex.test(formData.staffEmail) &&
        formData.role
      );
    };


    setIsFormValid(isValidFormInputFields());
  }, [formData])




  return (
    <div className="space-y-6 py-6">
      <div>
        <h3 className="text-base font-bold text-black font-roboto">Edit Users Permission</h3>
        <p className="text-xs text-gray-500">Edit users information and permission</p>
      </div>



      <form className="common-card space-y-6 md:p-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AppInputText
              id="first-name"
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <AppInputText
              id="middle-name"
              label="Middle Name"
              placeholder="Enter middle name"
              value={formData.middleName}
              onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
            />
            <AppInputText
              id="last-name"
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AppInputText
              id="staff-email"
              type="email"
              label="Staff Email"
              placeholder="Enter staff email"
              value={formData.staffEmail}
              onChange={(e) => setFormData({ ...formData, staffEmail: e.target.value })}
            />

            <AppSelect
              label="Role"
              placeholder="Select role"
              listItems={[
                { label: "Finance Admin", value: "finance-admin" },
                { label: "HR Admin", value: "hr-admin" },
                { label: "IT Admin", value: "it-admin" },
              ]}
              onChange={(value) => setFormData({ ...formData, role: value as UserRoles })}
            />
          </div>
        </div>

        <div>
          {formData.role === 'finance-admin' && (
            <PermissionOptionLayout
              fullAccessChecked={formData.financeAdminSwitches.accessType.fullAccess}
              limitAccessChecked={formData.financeAdminSwitches.accessType.limitAccess}
              viewOnlyChecked={formData.financeAdminSwitches.accessType.viewOnlyAccess}
              onPermissionChange={(value) => handleAccessTypeChange(value)}
              disabled={!formData.role}
            >
              <FinanceAdminOptions
                isDisabledSwitches={formData.financeAdminSwitches.accessType.viewOnlyAccess || formData.financeAdminSwitches.accessType.fullAccess}
                switches={formData.financeAdminSwitches}
                onSwitchChange={(id, checked) => {
                  setFormData({
                    ...formData,
                    financeAdminSwitches: {
                      ...formData.financeAdminSwitches,
                      [id]: checked
                    }
                  })
                }}
              />
            </PermissionOptionLayout>
          )}


          {formData.role === 'hr-admin' && (
            <PermissionOptionLayout
              fullAccessChecked={formData.hrAdminSwitches.accessType.fullAccess}
              limitAccessChecked={formData.hrAdminSwitches.accessType.limitAccess}
              viewOnlyChecked={formData.hrAdminSwitches.accessType.viewOnlyAccess}
              onPermissionChange={(value) => handleAccessTypeChange(value as AccessType)}
              disabled={!formData.role}
            >
              <HRAdminOptions
                isDisabledSwitches={formData.hrAdminSwitches.accessType.viewOnlyAccess || formData.hrAdminSwitches.accessType.fullAccess}
                switches={formData.hrAdminSwitches}
                onSwitchChange={(id, checked) => {
                  setFormData({
                    ...formData,
                    hrAdminSwitches: {
                      ...formData.hrAdminSwitches,
                      [id]: checked
                    }
                  })
                }}
              />
            </PermissionOptionLayout>
          )}

          {formData.role === 'it-admin' && (
            <PermissionOptionLayout
              fullAccessChecked={formData.itAdminSwitches.accessType.fullAccess}
              limitAccessChecked={formData.itAdminSwitches.accessType.limitAccess}
              viewOnlyChecked={formData.itAdminSwitches.accessType.viewOnlyAccess}
              onPermissionChange={(value) => handleAccessTypeChange(value as AccessType)}
              disabled={!formData.role}
            >
              <ITAdminOptions
                isDisabledSwitches={formData.itAdminSwitches.accessType.viewOnlyAccess || formData.itAdminSwitches.accessType.fullAccess}
                switches={formData.itAdminSwitches}
                onSwitchChange={(id, checked) => {
                  setFormData({
                    ...formData,
                    itAdminSwitches: {
                      ...formData.itAdminSwitches,
                      [id]: checked
                    }
                  })
                }}
              />
            </PermissionOptionLayout>
          )}
        </div>
      </form>

      <FooterButtons
        btn1Label="Cancel"
        btn2Label="Grant Permission"
        disabledbtn2={!isFormValid}
        onBtn1Click={() => router.back()}
        onBtn2Click={() => { }}
      />
    </div>
  );
};




const FooterButtons = ({ btn1Label, btn2Label, disabledbtn1, disabledbtn2, onBtn1Click, onBtn2Click, className }: {
  btn1Label: string, btn2Label: string, disabledbtn1?: boolean, disabledbtn2?: boolean, onBtn1Click: () => void, onBtn2Click: () => void, className?: string
}) => {
  const router = useRouter();

  return (
    <div className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ''}`}>
      <AppButton
        label={btn1Label}
        disabled={disabledbtn1}
        className="btn-secondary"
        onClick={onBtn1Click}
      />
      <AppAlertDialog
        header={
          <span>
            <span className="text-lg font-bold text-center">
              <span className="flex flex-col items-center justify-center gap-y-6">
                <SuccessSvg />
                <span className="flex flex-col items-center justify-center gap-y-2">
                  <span>You have successfully granted user permission</span>
                </span>
              </span>
            </span>
          </span>
        }
        // title={"You have successfully granted user permission"}
        description={"You can now proceed to dashboard to continue"}
        confirmText={"Continue to Dashboard"}
        confirmAction={() => router.push("/super-admin/users/users-permission")}
      >
        <AppButton
          label={btn2Label}
          disabled={disabledbtn2}
          className="btn-primary"
          onClick={onBtn2Click}
        />
      </AppAlertDialog>
    </div>
  )
}



export default EditUserPermission;
















export type AccessType = 'fullAccess' | 'limitAccess' | 'viewOnlyAccess'
type UserRoles = 'finance-admin' | 'hr-admin' | 'it-admin' | ''

export interface SwitchState {
  accessType: {
    fullAccess: boolean;
    limitAccess: boolean;
    viewOnlyAccess: boolean;
  };
  [key: string]: any;
};

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  staffEmail: string;
  role: UserRoles;
  financeAdminSwitches: SwitchState & {
    chartOfAccount: boolean;
    budgets: boolean;
    journals: boolean;
    banking: boolean;
    bankingTransaction: boolean;
  };
  hrAdminSwitches: SwitchState & {
    onboarding: boolean;
    hiring: boolean;
    employeeManagement: boolean;
    performanceManagement: boolean;
    payroll: boolean;
    deviceManagement: boolean;
    appManagement: boolean;
  };
  itAdminSwitches: SwitchState & {
    itAdministration: boolean;
  };
};