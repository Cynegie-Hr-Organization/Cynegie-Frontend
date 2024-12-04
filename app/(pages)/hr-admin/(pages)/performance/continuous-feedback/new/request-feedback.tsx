'use client'

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { InputTextArea } from "@/app/_components/shared/input-text";
import AppRadio from "@/app/_components/shared/radio";
import { AppSelect } from "@/app/_components/shared/select";
import { AppDatePicker } from "@/app/_components/shared/date-picker";
import { useState, useEffect } from "react";


const RequestFeedback = () => {

  const [formData, setFormData] = useState({
    recipient: '',
    feedbackType: '',
    comment: '',
    dueDate: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

      <div className="flex flex-col lg:flex-row gap-6 w-full md:w-[calc(50%+16px)]">
        <AppDatePicker
          label="Due Date"
          placeholder="Select Due Date"
          selectedDate={new Date(formData.dueDate === '' ? new Date() : new Date(formData.dueDate))}
          setSelectedDate={(value) => { setFormData({ ...formData, dueDate: value?.toISOString() ?? "" }) }}
        />
      </div>

    </CardLayout>
  )
}




export default RequestFeedback;