'use client';

import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import AppInputText from "@/app/_components/shared/input-text";
import { useState } from "react";







const GeneralSettingsForm = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_address: "",
    company_email_address: "",
    company_phone_number: "",
    time_zone: "",
    date_format: "",
    language_preference: "",
    enableSystemNotifications: false
  });


  return (
    <form className="p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold">General Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Name"
          id="company-name"
          placeholder="Enter company name"
          value=""
          onChange={() => { }}
        />
        <AppInputText
          label="Company Address"
          id="company-address"
          placeholder="Enter company address"
          value=""
          onChange={() => { }}
        />
        <AppInputText
          label="Company Email Address"
          id="company-email-address"
          placeholder="Enter company email address"
          value=""
          onChange={() => { }}
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppInputText
          label="Company Phone Number"
          id="company-phone-number"
          placeholder="Enter company phone number"
          value=""
          onChange={() => { }}
        />
        <AppMultipleSelect
          label="Time Zone"
          placeholder="Enter time zone"
          selectedValues={[]}
          items={[
            { label: "UTC+0", value: "utc+0" },
            { label: "UTC+1", value: "utc+1" },
            { label: "UTC+2", value: "utc+2" },
            { label: "UTC+3", value: "utc+3" },
            { label: "UTC+4", value: "utc+4" },
            { label: "UTC+5", value: "utc+5" },
            { label: "UTC+6", value: "utc+6" },
            { label: "UTC+7", value: "utc+7" },
            { label: "UTC+8", value: "utc+8" },
          ]}
          onSelectionChange={(value) => console.log(value)}
        />
        <AppDatePicker
          label="Date Format"
          placeholder="Enter date format"
          selectedDate={new Date()}
          setSelectedDate={() => { }}
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppMultipleSelect
          label="Language Preference"
          placeholder="Select language preference"
          selectedValues={[]}
          items={[
            { label: "English", value: "english" },
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Arabic", value: "arabic" },
            { label: "Russian", value: "russian" },
          ]}
          onSelectionChange={(value) => console.log(value)}
        />
        <AppMultipleSelect
          label="Notification Type"
          placeholder="Select notification type"
          selectedValues={[]}
          items={[
            { label: "None", value: "email" },
            { label: "HR Approvals", value: "hr-approvals" },
            { label: "IT Request", value: "it-request" },
            { label: "Finance Update", value: "finance-update" },
            { label: "Compliance Alert", value: "compliance-alert" }
          ]}
          onSelectionChange={(value) => console.log(value)}
        />
        <AppFileUpload
          label="Company Logo"
          bottomInfo="Supported file types: PDF. Max file size allowed is 3MB."
          onChange={(files) => { console.log(files) }}
        />
      </div>


      <AppCheckbox
        label="Enable System Notification"
        id="enable-dark-mode"
        checked={formData.enableSystemNotifications}
        onChange={(value) => {
          setFormData({
            ...formData,
            enableSystemNotifications: value.target.checked,
          });
        }}
      />
    </form>
  );
};

export default GeneralSettingsForm;