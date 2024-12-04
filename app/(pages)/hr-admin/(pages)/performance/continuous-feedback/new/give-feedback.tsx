'use client'

import CardLayout from "@/app/_components/shared/cards";
import { AppFileUpload } from "@/app/_components/shared/file-upload";
import { InputTextArea } from "@/app/_components/shared/input-text";
import AppRadio from "@/app/_components/shared/radio";
import { AppSelect } from "@/app/_components/shared/select";
import { useState } from "react";

const GiveFeeedback = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    feedbackType: '',
    comment: '',
    rating: '',
  });

  return (
    <CardLayout className="space-y-6" bg="bg-white p-4 md:p-6 lg:p-8">
      <AppSelect
        listItems={[
          { label: "Employee", value: "employee" },
          { label: "Manager", value: "manager" },
          { label: "Peer", value: "peer" },
        ]}
        label="Recipient"
        placeholder="Select Recipient"
        onChange={(value) => { setFormData({ ...formData, recipient: value }) }}
      />

      <div className="space-y-2">
        <p className="text-sm font-semibold">Feedback Type</p>
        <div className="space-y-3">
          <AppRadio label="Positive" id="positive" onChange={(value) => { setFormData({ ...formData, feedbackType: value }) }} />
          <AppRadio label="Constructive" id="constructive" onChange={(value) => { setFormData({ ...formData, feedbackType: value }) }} />
        </div>
      </div>

      <InputTextArea
        label="Comment"
        id="comment"
        placeholder="Enter your feedback here"
        value={formData.comment}
        onChange={(e) => { setFormData({ ...formData, comment: e.target.value }) }}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <AppSelect
          listItems={[]}
          label="Rating"
          placeholder="Select Rating"
          onChange={(value) => { setFormData({ ...formData, rating: value }) }}
        />
        <AppFileUpload
          label="Attachment"
          className="w-full"
          onChange={(files) => { console.log(files) }}
        />
      </div>

    </CardLayout>
  )
}

export default GiveFeeedback;