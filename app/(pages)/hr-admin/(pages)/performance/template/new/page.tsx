'use client'

import AppButton from "@/app/_components/shared/button"
import CardLayout from "@/app/_components/shared/cards"
import InputText, { InputTextArea } from "@/app/_components/shared/input-text"
import { AppSwitch } from "@/app/_components/shared/switch"
import { DrawerDialog } from "@/components/drawer/modal"
import { DialogTitle } from "@/components/ui/dialog"
import { ReactNode } from "react"

const PerformanceTemplateNewPage = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold"> New Template</h3>

      <CardLayout className="space-y-6 p-4 md:p-6">

        <InputText
          label="Template Name"
          id="template-name"
          placeholder="Enter template name"
          onChange={() => { }}
          value=""
        />

        <InputTextArea
          label="Template Description"
          id="template-description"
          placeholder="Enter template description"
          onChange={() => { }}
          value=""
        />

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Questions</h4>
          <div className="space-y-4">
            <QuestionCard />
          </div>
          <AddQuestionModal trigger={
            <button type="button" className="flex gap-2 items-center text-primary text-sm font-bold">Add Questions</button>
          } />
        </div>
      </CardLayout>

      <FooterButtons
        btn1Label="Save & Continue Later"
        btn2Label="Submit"
        onBtn1Click={() => { }}
        onBtn2Click={() => { }}
      />
    </div>
  )
}

const QuestionCard = () => {
  return (
    <div className="common-card gap-4">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">Untitled Question</p>
        <p className="flex gap-2 items-center text-gray-500">Edit question</p>
      </div>
    </div>
  )
}

const FooterButtons = ({ btn1Label, btn2Label, onBtn1Click, onBtn2Click, className }: {
  btn1Label: string, btn2Label: string, onBtn1Click: () => void, onBtn2Click: () => void, className?: string
}) => {
  return (
    <div className={`flex flex-col md:flex-row justify-end gap-4 ${className ?? ''}`}>
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
  )
}


const AddQuestionModal = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={
        <DialogTitle className="space-y-1">
          <p className='font-semibold'>Add Question</p>
          <p className='font-normal text-sm'>Add and create question</p>
        </DialogTitle>
      }
      footer={
        <FooterButtons
          className="justify-center"
          btn1Label="Cancel"
          btn2Label="Add Question"
          onBtn1Click={() => { }}
          onBtn2Click={() => { }}
        />
      }
      children={
        <div className="space-y-4">
          <InputText
            label="Question"
            id="question"
            requiredField
            placeholder="Enter question"
            onChange={() => { }}
            value=""
          />

          <InputTextArea
            label="Description"
            id="description"
            placeholder="Enter description"
            requiredField
            onChange={() => { }}
            value=""
          />

          <div className="flex flex-col gap-4">
            <p className="font-semibold">Response Criteria</p>
            <div className="space-y-6">
              <Criteria
                label="Rating, Multi Select"
                id="rating-multi-select"
                onChange={() => { }}
              />
              <Criteria
                label="Comment"
                id="comment"
                onChange={() => { }}
              />
            </div>
          </div>
        </div>
      }
    />
  )
}

const Criteria = ({ label, id, onChange }: { label: string, id: string, onChange: (value: boolean) => void }) => {
  return (
    <div className="common-card flex justify-between items-center gap-4">
      <p className="font-semibold">{label}</p>
      <AppSwitch
        id={id}
        onChange={onChange}
      />
    </div>
  )
}

export default PerformanceTemplateNewPage
