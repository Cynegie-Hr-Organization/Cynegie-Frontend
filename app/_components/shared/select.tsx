'use client'

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function AppSelect({ listLabel, label, requiredField = false, listItems, placeholder, onChange, width = 'w-full', triggerStyle = 'border-gray-300' }: {
  listLabel?: string,
  label?: string,
  requiredField?: boolean,
  listItems: { label: string, value: string }[],
  placeholder?: string,
  onChange: (value: string) => void,
  width?: string,
  triggerStyle?: string
}) {
  return (
    <Select>
      <div className={`flex flex-col gap-2 w-full ${width}`}>
        {label && <p className={`text-sm font-semibold flex justify-start w-full ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ''}`}>{label}</p>}

        <SelectTrigger className={`${triggerStyle} transition-all duration-300 placeholder:text-gray-400 outline-none focus focus:ring focus:ring-offset-0 focus:ring-primary ${width}`}>
          <SelectValue
            className=" placeholder:text-gray-400"
            placeholder={<p className="text-gray-400">{placeholder}</p>}/>
        </SelectTrigger>

        <SelectContent className="bg-white p-0">
          <SelectGroup className="flex flex-col justify-start p-0 text-sm">
            {(listItems.length > 0 && listLabel) ? <SelectLabel className="text-sm px-2">{listLabel}</SelectLabel> : null}

            {listItems.map((item) => (
              <SelectItem
                key={item.value}
                className="hover:bg-gray-300 hover:rounded-md cursor-pointer text-sm px-2"
                onChange={() => onChange(item.value)} value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  );
}
