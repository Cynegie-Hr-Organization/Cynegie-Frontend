/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";

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
} from "@/components/ui/dialog.tsx";
import { TaskListData } from "@/components/modals/employeetasklist/TaskListData.tsx";
import { IoMdAdd } from "react-icons/io";
import { LuListFilter } from "react-icons/lu";

// import { Textarea } from "@/components/ui/textarea.tsx";

const EmployeeTaskListModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="text-[#475367]"
            onSelect={(e) => e.preventDefault()}
          >
            View task
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">
            <DialogContent className="fixed top-1/2 left-1/2  lg:-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg w-[100%] mx-auto lg:min-w-[42rem] max-h-[80vh] overflow-y-auto">
              <DialogHeader className={"text-start "}>
                <DialogTitle>View Task</DialogTitle>
                <DialogDescription>View task below</DialogDescription>
              </DialogHeader>
              {TaskListData.map((data) => (
                <div key={data.id}>
                  <div className={"flex items-center justify-between mb-8"}>
                    <h1 className={"font-bold"}>{data.header}</h1>
                    {data.dropdown}
                  </div>
                  {data.details}

                  <div className={"mt-8"}>
                    <h1 className={"font-semibold mb-2.5"}>Description</h1>
                    <p className={"text-[#64748B] leading-normal"}>
                      {data.description}
                    </p>
                  </div>

                  <div className={"flex items-center gap-2.5 my-8"}>
                    <h1>Subtask</h1>
                    <span
                      className={
                        "flex items-center text-[#2563EB] gap-1 text-sm"
                      }
                    >
                      <IoMdAdd size={"20px"} />
                      Add
                    </span>
                  </div>

                  <section>
                    <div
                      className={
                        "flex items-center gap-2.5 mt-5 justify-between mb-8"
                      }
                    >
                      <h1>Activity</h1>
                      <span
                        className={
                          "flex items-center text-[#2563EB] gap-1 text-sm"
                        }
                      >
                        <LuListFilter size={"20px"} />
                        Newest first
                      </span>
                    </div>
                    <div className={"mb-8"}>
                      {TaskListData.map((activity: any) => (
                        <div key={activity.id}>
                          <div className={"flex items-center gap-5"}>
                            <div>{activity.activities.image}</div>
                            <div className={"w-full"}>
                              {activity.activities.textarea}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={"mb-8"}>
                      {TaskListData.map((data) => (
                        <section key={data.id}>
                          <div className={"flex items-center gap-5"}>
                            <div>{data.activity.image}</div>
                            <div>
                              {data.activity.name}
                              {data.activity.description}
                            </div>
                          </div>
                        </section>
                      ))}
                    </div>
                  </section>
                </div>
              ))}
              <DialogFooter className="sm:justify-center lg:justify-center">
                <Button type="submit" className="bg-[#0035C3] min-w-full">
                  Edit Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>

      {/* for send Editing Onboarding */}
      {/*<Dialog>*/}
      {/*  <DialogTrigger asChild>*/}
      {/*    <DropdownMenuItem*/}
      {/*      className="text-[#475367]"*/}
      {/*      onSelect={(e) => e.preventDefault()}*/}
      {/*    >*/}
      {/*      Edit task*/}
      {/*    </DropdownMenuItem>*/}
      {/*  </DialogTrigger>*/}
      {/*  <DialogPortal>*/}
      {/*    <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">*/}
      {/*      <DialogContent className="fixed top-1/2 left-1/2 lg:-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg max-h-[80vh] overflow-y-auto lg:min-w-[50rem] mx-auto">*/}
      {/*        <DialogHeader className={"text-start"}>*/}
      {/*          <DialogTitle>Edit Details</DialogTitle>*/}
      {/*          <DialogDescription>Edit details</DialogDescription>*/}
      {/*        </DialogHeader>*/}

      {/*        {TaskListData.map((data) => (*/}
      {/*          <div key={data.id}>*/}
      {/*            <div className={"flex items-center justify-between mb-8"}>*/}
      {/*              <h1 className={"font-bold"}>{data.header}</h1>*/}
      {/*              {data.dropdown}*/}
      {/*            </div>*/}
      {/*            {data.details}*/}

      {/*            <div className={"mt-8"}>*/}
      {/*              <h1 className={"font-semibold mb-2.5"}>Description</h1>*/}
      {/*              <p className={"text-[#64748B] leading-normal"}>*/}
      {/*                {data.description}*/}
      {/*              </p>*/}
      {/*            </div>*/}

      {/*            <div className={"flex items-center gap-2.5 my-8"}>*/}
      {/*              <h1>Subtask</h1>*/}
      {/*              <span*/}
      {/*                className={*/}
      {/*                  "flex items-center text-[#2563EB] gap-1 text-sm"*/}
      {/*                }*/}
      {/*              >*/}
      {/*                <IoMdAdd size={"20px"} />*/}
      {/*                Add*/}
      {/*              </span>*/}
      {/*            </div>*/}

      {/*            <section>*/}
      {/*              <div*/}
      {/*                className={*/}
      {/*                  "flex items-center gap-2.5 mt-5 justify-between mb-8"*/}
      {/*                }*/}
      {/*              >*/}
      {/*                <h1>Activity</h1>*/}
      {/*                <span*/}
      {/*                  className={*/}
      {/*                    "flex items-center text-[#2563EB] gap-1 text-sm"*/}
      {/*                  }*/}
      {/*                >*/}
      {/*                  <LuListFilter size={"20px"} />*/}
      {/*                  Newest first*/}
      {/*                </span>*/}
      {/*              </div>*/}
      {/*              <div className={"mb-8"}>*/}
      {/*                {TaskListData.map((activity) => (*/}
      {/*                  <div key={activity.id}>*/}
      {/*                    <div className={"flex items-center gap-5"}>*/}
      {/*                      <div>{activity.activities.image}</div>*/}
      {/*                      <div className={"w-full"}>*/}
      {/*                        {activity.activities.textarea}*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                ))}*/}
      {/*              </div>*/}
      {/*              <div className={"mb-8"}>*/}
      {/*                {TaskListData.map((data) => (*/}
      {/*                  <section key={data.id}>*/}
      {/*                    <div className={"flex items-center gap-5"}>*/}
      {/*                      <div>{data.activity.image}</div>*/}
      {/*                      <div>*/}
      {/*                        {data.activity.name}*/}
      {/*                        {data.activity.description}*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                  </section>*/}
      {/*                ))}*/}
      {/*              </div>*/}
      {/*            </section>*/}
      {/*          </div>*/}
      {/*        ))}*/}

      {/*        <DialogFooter className="sm:justify-center lg:justify-center">*/}
      {/*          <Button type="submit" className="bg-[#0035C3] min-w-full">*/}
      {/*            Save Changes*/}
      {/*          </Button>*/}
      {/*        </DialogFooter>*/}
      {/*      </DialogContent>*/}
      {/*    </DialogOverlay>*/}
      {/*  </DialogPortal>*/}
      {/*</Dialog>*/}
    </>
  );
};

export default EmployeeTaskListModal;
