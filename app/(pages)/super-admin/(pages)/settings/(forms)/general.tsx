'use client';

import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { ISuperAdminSettings, NotificationType } from "@/app/_core/interfaces/super-admin";

const GeneralSettingsForm = ({ settingsData }: {
  settingsData: {
    formData: Partial<ISuperAdminSettings>,
    setFormData: (settings: Partial<ISuperAdminSettings>) => void,
    isLoading: boolean
  }
}) => {
  const { formData: generalSettings, setFormData: setGeneralSettings, isLoading } = settingsData

  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">General Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Name"
          id="company-name"
          placeholder="Enter company name"
          value={generalSettings.name ?? ''}
          onChange={(e) => setGeneralSettings({ ...generalSettings, name: e.target.value })}
          isLoadingContent={isLoading}
        />
        <AppInputText
          label="Company Address"
          id="company-address"
          placeholder="Enter company address"
          value={generalSettings.address ?? ''}
          onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
          isLoadingContent={isLoading}
        />
        <AppInputText
          label="Company Email Address"
          id="company-email-address"
          placeholder="Enter company email address"
          value={generalSettings.email ?? ''}
          onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
          isLoadingContent={isLoading}
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Phone Number"
          id="company-phone-number"
          placeholder="Enter company phone number"
          value={generalSettings.phone ?? 0}
          onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
          isLoadingContent={isLoading}
        />
        <AppMultipleSelect
          label="Time Zone"
          placeholder="Enter time zone"
          selectedValues={[...new Set(generalSettings?.timeZone?.split(", "))]}
          items={[
            { label: "GMT +0", value: "gmt+0" },
            { label: "PST", value: "pst" },
            { label: "EST", value: "est" },
            { label: "GMT", value: "gmt" },
            { label: "CET", value: "cet" }
          ]}
          onSelectionChange={(values) => setGeneralSettings({ ...generalSettings, timeZone: values.map((value) => value).join(", ") })}
        />
        <AppSelect
          label="Date Format"
          placeholder="Select date format"
          value={generalSettings?.dateFormat ?? 'DD/MM/YYYY'}
          listItems={[
            { label: "DD/MM/YYYY", value: "dd-/mm/yyyy" },
            { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
            { label: "YYYY-MM-DD", value: "YYYY-MM-DD" }
          ]}
          onChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}
        />
        {/* <AppDatePicker
          label="Time Zone"
          placeholder="Select time zone"
          selectedDate={generalSettings?.dateFormat ? new Date(generalSettings.dateFormat) : undefined}
          setSelectedDate={(value) => { setGeneralSettings({ ...generalSettings, dateFormat: value?.toISOString() }) }}
        /> */}

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppMultipleSelect
          label="Language Preference"
          placeholder="Select language preference"
          selectedValues={[...new Set(generalSettings?.supportedLanguages)]}
          items={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Arabic", value: "arabic" },
            { label: "Russian", value: "russian" },
          ]}
          onSelectionChange={(values) => setGeneralSettings({ ...generalSettings, supportedLanguages: values })}
        />
        <AppMultipleSelect
          label="Notification Type"
          placeholder="Select notification type"
          selectedValues={generalSettings?.notificationType}
          items={[
            // { label: "None", value: "none" },
            { label: "HR Approvals", value: "hr-approvals" },
            { label: "IT Request", value: "it-request" },
            { label: "Finance Update", value: "finance-update" },
            { label: "Compliance Alert", value: "compliance-alert" }
          ]}
          onSelectionChange={(values) => setGeneralSettings({
            ...generalSettings, notificationType: values as NotificationType[]
          })}
        />
        <AppFileUpload
          label="Company Logo"
          bottomInfo="Supported file types: PDF. Max file size allowed is 3MB."
          onChange={(files) => { setGeneralSettings({ ...generalSettings, logo: files.map((file) => file.name).join(", ") }) }}
        />
      </div>


      <AppCheckbox
        label="Enable System Notification"
        id="enable-dark-mode"
        checked={generalSettings?.enableSystemNotification ?? false}
        onChange={(value) => {
          setGeneralSettings({
            ...generalSettings,
            enableSystemNotification: value.target.checked,
          });
        }}
      />
    </form>
  );
};

export default GeneralSettingsForm;