'use client'

import AppButton from "@/app/_components/shared/button";
import RequestFeedback from "./request-feedback";
import GiveFeeedback from "./give-feedback";
import { useState } from "react";
import AppTabs from "@/app/_components/shared/tabs";



type TabType = 'give-feedback' | 'request-feedback';

const NewFeedbackPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('give-feedback');

  const tabs = [
    { label: "Give Feedback", onClick: () => { setActiveTab('give-feedback') } },
    { label: "Request Feedback", onClick: () => { setActiveTab('request-feedback') } },
  ]

  return (
    <div className="space-y-6 py-6">
      <h3 className="text-lg font-bold text-black">New Feedback</h3>

      <div className="space-y-8">
        <AppTabs tabs={tabs} />

        {activeTab === 'give-feedback' && <GiveFeeedback />}
        {activeTab === 'request-feedback' && <RequestFeedback />}

        <div className="flex flex-col md:flex-row justify-end gap-4">
          <AppButton label="Save & Continue Later" className="btn-secondary w-full md:w-[230px]" />
          <AppButton label="Give Feedback" className="btn-primary w-full md:w-[230px]" />
        </div>
      </div>
    </div>
  )
}

export default NewFeedbackPage;