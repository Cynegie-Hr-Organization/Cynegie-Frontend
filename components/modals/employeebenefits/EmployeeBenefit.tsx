import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
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

import { BenefitData } from "@/components/modals/employeebenefits/BenefitData";

// import { Textarea } from "@/components/ui/textarea";

const EmployeeBenefit = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="text-[#475367]"
                onSelect={(e) => e.preventDefault()}
              >
                View Detail
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">
                <DialogContent className="fixed top-1/2 left-1/2  lg:-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg w-[100%] mx-auto lg:min-w-[20rem] max-h-[80vh] overflow-y-auto">
                  <DialogHeader className={"text-start mb-10"}>
                    <DialogTitle>View Details</DialogTitle>
                    <DialogDescription>View details below</DialogDescription>
                  </DialogHeader>
                  {BenefitData.map((data) => (
                    <div key={data.id}>
                      <div className={"mb-2.5"}>
                        <h1 className={"font-bold mb-2.5"}>{data.header}</h1>
                        {data.dropdown}
                        {data.date}
                      </div>
                    </div>
                  ))}
                  <DialogFooter className="sm:justify-center lg:justify-center">
                    <Button
                      type="submit"
                      className="border-2 border-[#0035C3] text-[#0035C3] min-w-[40%]  bg-transparent"
                    >
                      Contact HR
                    </Button>
                    <Button type="submit" className="bg-[#0035C3] min-w-[40%]">
                      Modify Benefit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogOverlay>
            </DialogPortal>
          </Dialog>

          {/* for Modify Benefits */}
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="text-[#475367]"
                onSelect={(e) => e.preventDefault()}
              >
                Modify Benefits
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">
                <DialogContent className="fixed top-1/2 left-1/2 lg:-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg max-h-[80vh] overflow-y-auto lg:min-w-[20rem] mx-auto">
                  <DialogHeader className={"text-start mb-10"}>
                    <DialogTitle>Modify Benefit</DialogTitle>
                    <DialogDescription>Modify Benefit</DialogDescription>
                  </DialogHeader>

                  {BenefitData.map((data) => (
                    <div key={data.id}>
                      <div className={"mb-2.5"}>
                        <h1 className={"font-bold mb-2.5"}>{data.header}</h1>
                        {data.dropdown}
                        {data.date}
                      </div>
                    </div>
                  ))}
                  <DialogFooter className="sm:justify-center lg:justify-center">
                    <Button
                      type="submit"
                      className="border-2 border-[#0035C3] text-[#0035C3] min-w-[40%]  bg-transparent"
                    >
                      Contact HR
                    </Button>
                    <Button type="submit" className="bg-[#0035C3] min-w-[40%]">
                      Modify Benefit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogOverlay>
            </DialogPortal>
          </Dialog>

          {/* for Contact Hr */}
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="text-[#475367]"
                onSelect={(e) => e.preventDefault()}
              >
                Contact HR
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30">
                <DialogContent className="fixed top-1/2 left-1/2 lg:-translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg max-h-[80vh] overflow-y-auto lg:min-w-[20rem] mx-auto">
                  <DialogHeader className={"text-start"}>
                    <DialogTitle>Contact HR</DialogTitle>
                    <DialogDescription>Contact HR</DialogDescription>
                  </DialogHeader>

                  {BenefitData.map((data) => (
                    <div key={data.id}>
                      <div className={"mb-5"}>
                        <h1 className={"font-bold mb-2.5"}>{data.header}</h1>
                        {data.dropdown}
                        {data.date}
                      </div>
                    </div>
                  ))}
                  <DialogFooter className="sm:justify-center lg:justify-center">
                    <Button
                      type="submit"
                      className="border-2 border-[#0035C3] text-[#0035C3] min-w-[40%]  bg-transparent"
                    >
                      Contact HR
                    </Button>
                    <Button type="submit" className="bg-[#0035C3] min-w-[40%]">
                      Modify Benefit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogOverlay>
            </DialogPortal>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default EmployeeBenefit;
