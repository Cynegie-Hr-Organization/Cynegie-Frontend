import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface ReusableSelectProps {
  placeholder?: string;
  items: string[];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  plainSelect?: boolean;
}

export const ReusableSelect: React.FC<ReusableSelectProps> = ({
  placeholder = "Select an option",
  items,
  triggerClassName = "",
  contentClassName = "",
  onValueChange,
  defaultValue,
  plainSelect = false,
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger
        className={`${!plainSelect && "w-max gap-x-2 border-none bg-black text-white"} ${triggerClassName}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`bg-white ${contentClassName}`}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item}
              value={item.toLowerCase().replace(/\s+/g, "")}
              className="hover:bg-primary hover:text-white"
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
