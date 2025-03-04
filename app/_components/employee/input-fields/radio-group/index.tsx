import React from "react";
import { Radio, RadioGroup } from "@mui/material";
import DetailValue from "@/app/_components/shared/detail-group/detail/value";
import { InputFieldOption } from "../../modal/types";

type RadioFieldProps = {
  options: InputFieldOption[];
};

const RadioField: React.FC<RadioFieldProps> = (props) => {
  const { options } = props;
  return (
    <RadioGroup className="ml-[-10]">
      {options.map((option) => (
        <div key={option.value} className="flex gap-0 items-center">
          <Radio value={option.value} />
          <DetailValue value={option.label} />
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioField;
