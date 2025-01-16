import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { InputFieldProps } from "../../modal/types";

const MultiSelectField: React.FC<Omit<InputFieldProps, "type">> = ({
  label: name,
  control,
  options,
  placeholder,
}) => {
  return (
    <Controller
      name={name ?? ""}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          isMulti
          placeholder={placeholder}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      )}
    />
  );
};

export default MultiSelectField;
