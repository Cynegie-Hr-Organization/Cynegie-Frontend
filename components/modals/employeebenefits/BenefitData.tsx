import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Data {
  id: number;
  header: string;
  dropdown?: ReactNode;
  date?: ReactNode;
}

export const BenefitData: Data[] = [
  {
    id: 1,
    header: "Benefit Type",
    dropdown: (
      <Select>
        <SelectTrigger className={"bg-[#F0F2F5]"}>
          <SelectValue
            placeholder={"Health Insurance"}
            className={"placeholder:text-[#98A2B3]"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Health Insurance">Health Insurance</SelectItem>
            <SelectItem value="in progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: 2,
    header: "Providers",
    dropdown: (
      <Select>
        <SelectTrigger className={"bg-[#F0F2F5]"}>
          <SelectValue
            placeholder={"ABC Hospital"}
            className={"placeholder:text-[#98A2B3]"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ABC Hospital">ABC Hospital</SelectItem>
            <SelectItem value="in progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: 3,
    header: "Coverage detail",
    dropdown: (
      <Select>
        <SelectTrigger className={"bg-[#F0F2F5]"}>
          <SelectValue
            placeholder={"Select"}
            className={"placeholder:text-[#98A2B3]"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="in progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: 4,
    header: "Mostly Cost",
    date: (
      <div>
        <Input
          type={"date"}
          min={"01-01-2018"}
          max={"31-12-201"}
          placeholder={"30 July 2024"}
          className={"flex bg-[#F0F2F5] placeholder:text-[#98A2B3]"}
        />
      </div>
    ),
  },
];
