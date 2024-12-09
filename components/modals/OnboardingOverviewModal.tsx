import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FC, useState } from "react";
import { OnboardingOverViewEnum } from "@/lib/enums";

import { Template } from "../table/overview.column";
import SuccessSvg from "@/app/(pages)/hr-admin/(pages)/onboarding/template/new-hire-list/SuccessSvg";
import { useRouter } from "next/navigation";

interface IProps {
  data: Template;
}

export const OnboardingOverviewModal: FC<IProps> = ({ data }) => {
  const navigate = useRouter();

  const [entryState, setEntryState] = useState<OnboardingOverViewEnum>(
    OnboardingOverViewEnum.View,
  );

  const handleEntryStateUpdate = () => {
    switch (entryState) {
      case OnboardingOverViewEnum.View:
        setEntryState(OnboardingOverViewEnum.Edit);
        break;

      case OnboardingOverViewEnum.Edit:
        setEntryState(OnboardingOverViewEnum.Complete);
        break;

      default:
        setEntryState(OnboardingOverViewEnum.View);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* View and update */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-[#475367]"
              onSelect={(e) => e.preventDefault()}
            >
              View details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">
              <DialogContent className="fixed top-1/2 left-1/2  lg:-translate-x-[30%] -translate-y-1/2 bg-white p-8 rounded-md shadow-lg w-[100%] mx-auto lg:w-[50%]">
                {entryState !== OnboardingOverViewEnum.Complete && (
                  <DialogHeader className={"text-start "}>
                    <DialogTitle>View Details</DialogTitle>
                    <DialogDescription>View details</DialogDescription>
                  </DialogHeader>
                )}
                {entryState !== OnboardingOverViewEnum.Complete ? (
                  <div className="flex flex-col mt-4">
                    <div className="flex-1 gap-2 mb-5">
                      <Label htmlFor="name" className="mb-1.5 inline-block">
                        Name <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Adeagbo Tolulope"
                        className="bg-[#F0F2F5] placeholder:text-[#98A2B3] focus:outline-[#D0D5DD] border-2 border-[#D0D5DD]"
                        disabled={entryState !== OnboardingOverViewEnum.Edit}
                      />
                    </div>
                    <div className="flex-1 gap-2 mb-5">
                      <Label
                        htmlFor="department"
                        className="mb-1.5 inline-block"
                      >
                        Department <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="department"
                        placeholder="Engineering Team"
                        className="bg-[#F0F2F5] placeholder:text-[#98A2B3] focus:outline-[#D0D5DD] border-2 border-[#D0D5DD]"
                        disabled={entryState !== OnboardingOverViewEnum.Edit}
                        defaultValue={data.Department}
                      />
                    </div>
                    <div className="flex-1 gap-2 mb-5">
                      <Label htmlFor="position" className="mb-1.5 inline-block">
                        Position <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="position"
                        placeholder="Technical Lead"
                        className="bg-[#F0F2F5] placeholder:text-[#98A2B3] focus:outline-[#D0D5DD] border-2 border-[#D0D5DD]"
                        disabled={entryState !== OnboardingOverViewEnum.Edit}
                      />
                    </div>
                    <div className="flex-1 gap-2">
                      <Label
                        htmlFor="start-date"
                        className="mb-1.5 inline-block"
                      >
                        Start Date <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="date"
                        id="start-date"
                        placeholder="25th June, 2024"
                        className="bg-[#F0F2F5] placeholder:text-[#98A2B3] focus:outline-[#D0D5DD] border-2 border-[#D0D5DD]"
                        disabled={entryState !== OnboardingOverViewEnum.Edit}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col mt-4 items-center justify-center">
                    <SuccessSvg />
                    <h3 className="text-lg font-semibold leading-none tracking-tight mt-8">
                      Changes saved successfully
                    </h3>
                    <p className="leading text-sm mt-2 text-[#303030]">
                      You can now proceed to dashboard to continue
                    </p>
                    <Button
                      type="submit"
                      className="bg-[#0035C3] w-1/2 mt-8"
                      onClick={() => navigate.push("/hr-admin")}
                    >
                      Continue
                    </Button>
                  </div>
                )}
                {entryState !== OnboardingOverViewEnum.Complete && (
                  <DialogFooter className="sm:justify-center lg:justify-center mt-4">
                    <Button
                      type="submit"
                      className="bg-[#0035C3] min-w-full"
                      onClick={handleEntryStateUpdate}
                    >
                      {entryState == OnboardingOverViewEnum.View
                        ? "Edit Details"
                        : "Save Changes"}
                    </Button>
                  </DialogFooter>
                )}
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-[#475367]"
              onSelect={(e) => {
                e.preventDefault();
                navigate.push("/hr-admin/onboarding/template");
              }}
            >
              View Onboarding template
            </DropdownMenuItem>
          </DialogTrigger>
        </Dialog>

        {/* for send reminder */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-[#475367]"
              onSelect={(e) => e.preventDefault()}
            >
              Send Reminders
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className={"fixed inset-0 bg-black bg-opacity-30"}>
              <DialogContent
                className={
                  "fixed top-1/2 left-1/2 lg:-translate-x-[30%] -translate-y-1/2 bg-white p-8 rounded-md shadow-lg w-[100%] lg:w-[50%]  mx-auto"
                }
              >
                <DialogHeader className={"text-start"}>
                  <DialogTitle>Set Reminder</DialogTitle>
                  <DialogDescription>Set Reminder</DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap flex-col mt-4">
                  <div className={"flex flex-col lg:gap-5 lg:flex-row"}>
                    <div className=" flex-1 gap-2 mb-5">
                      <Label htmlFor="name" className="mb-1.5 inline-block">
                        Start Date <span className={"text-red-600"}>*</span>
                      </Label>
                      <Input
                        type={"text"}
                        id="name"
                        placeholder="20/04/2024"
                        className={"bg-transparent placeholder:text-[#101928] "}
                      />
                    </div>
                    <div className=" flex-1 gap-2 mb-5">
                      <Label htmlFor="name" className="mb-1.5 inline-block">
                        Start Time <span className={"text-red-600"}>*</span>
                      </Label>
                      <Input
                        type={"text"}
                        id="name"
                        placeholder="9:30am"
                        className={"bg-transparent placeholder:text-[#101928] "}
                      />
                    </div>
                  </div>
                  <div className="flex-1 gap-2 mb-5">
                    <Label htmlFor="name" className="mb-1.5 inline-block">
                      Reminder Description{" "}
                      <span className={"text-red-600"}>*</span>
                    </Label>
                    <Textarea
                      placeholder="This is a reminder to carry out your task schedule for tomorrow to avoid query "
                      className={"placeholder:text-#868C98"}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-center lg:justify-center mt-4">
                  <Button type="submit" className={"bg-[#0035C3] min-w-full"}>
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
