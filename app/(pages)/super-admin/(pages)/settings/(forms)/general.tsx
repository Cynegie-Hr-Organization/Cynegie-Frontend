"use client";

import useFormStore from "@/app/(pages)/super-admin/(pages)/settings/(forms)/form-state";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { NotificationType } from "@/app/_core/interfaces/super-admin";

const GeneralSettingsForm = () => {
  const { data, setData } = useFormStore();

  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">General Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Name"
          id="company-name"
          placeholder="Enter company name"
          value={data?.name ?? ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <AppInputText
          label="Company Address"
          id="company-address"
          placeholder="Enter company address"
          value={data?.address ?? ''}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <AppInputText
          label="Company Email Address"
          id="company-email-address"
          placeholder="Enter company email address"
          value={data?.email ?? ''}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Phone Number"
          id="company-phone-number"
          placeholder="Enter company phone number"
          value={data?.phone ?? 0}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <AppMultipleSelect
          label="Time Zone"
          placeholder="Enter time zone"
          selectedValues={[...new Set(data?.timeZone?.split(", "))]}
          items={[
            { label: "GMT +0", value: "gmt+0" },
            { label: "PST", value: "pst" },
            { label: "EST", value: "est" },
            { label: "GMT", value: "gmt" },
            { label: "CET", value: "cet" }
          ]}
          onSelectionChange={(values) => setData({ ...data, timeZone: values.map((value) => value).join(", ") })}
        />
        <AppSelect
          label="Date Format"
          placeholder="Select date format"
          value={data?.dateFormat ?? 'DD/MM/YYYY'}
          listItems={[
            { label: "DD/MM/YYYY", value: "dd-/mm/yyyy" },
            { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
            { label: "YYYY-MM-DD", value: "YYYY-MM-DD" }
          ]}
          onChange={(value) => setData({ ...data, dateFormat: value })}
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
          selectedValues={[...new Set(data?.supportedLanguages)]}
          items={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Arabic", value: "arabic" },
            { label: "Russian", value: "russian" },
          ]}
          onSelectionChange={(values) => setData({ ...data, supportedLanguages: values })}
        />
        <AppMultipleSelect
          label="Notification Type"
          placeholder="Select notification type"
          selectedValues={data?.notificationType}
          items={[
            // { label: "None", value: "none" },
            { label: "HR Approvals", value: "hr-approvals" },
            { label: "IT Request", value: "it-request" },
            { label: "Finance Update", value: "finance-update" },
            { label: "Compliance Alert", value: "compliance-alert" },
          ]}
          onSelectionChange={(values) => setData({
            ...data, notificationType: values as NotificationType[]
          })}
        />
        <AppFileUpload
          label="Company Logo"
          bottomInfo="Supported file types: PDF. Max file size allowed is 3MB."
          onChange={(files) => {
            // const logoValue = files.map((file) => file.name).join(", ");
            console.log(files)
          }}
        />
      </div>

      <AppCheckbox
        label="Enable System Notification"
        id="enable-dark-mode"
        checked={data?.enableSystemNotification ?? false}
        onChange={(value) => {
          setData({
            ...data,
            enableSystemNotification: value.target.checked,
          });
        }}
      />
    </form>
  );
};

export default GeneralSettingsForm;
