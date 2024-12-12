<<<<<<< HEAD
import React from "react";
import Select, { StylesConfig, ActionMeta } from "react-select";
=======
import React from 'react';
import Select, { StylesConfig, ActionMeta } from 'react-select';
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
import { SingleValue, MultiValue } from "react-select";

interface DropdownWithSearchAndMultiSelectProps<OptionType> {
  id: string;
  options?: OptionType[];
  isMulti?: boolean;
  placeholder?: string;
  fontSize?: string;
  isDisabled?: boolean;
  value?: MultiValue<OptionType> | SingleValue<OptionType>; // Update the value type
  onChange?: (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>, // Update the parameter type
<<<<<<< HEAD
    actionMeta: ActionMeta<OptionType>,
  ) => void;
}

=======
    actionMeta: ActionMeta<OptionType>
  ) => void;
}


>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
const DropdownWithSearchAndMultiSelect = <OptionType,>({
  id,
  options,
  isMulti = false,
<<<<<<< HEAD
  placeholder = "Select an option",
  fontSize = "14px",
=======
  placeholder = 'Select an option',
  fontSize = '14px',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
  isDisabled = false, // Default to false
  value,
  onChange, // Destructure onChange prop
}: DropdownWithSearchAndMultiSelectProps<OptionType>) => {
  const customStyles: StylesConfig<OptionType, boolean> = {
    control: (base) => ({
      ...base,
<<<<<<< HEAD
      borderRadius: "0.375rem",
      borderColor: isDisabled ? "#E5E7EB" : "#D1D5DB", // Lighter border when disabled
      backgroundColor: isDisabled ? "#F3F4F6" : "white", // Gray background when disabled
      boxShadow: "none",
      fontSize,
      cursor: isDisabled ? "not-allowed" : "default", // Disable pointer events
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "#0035C3" : isSelected ? "#2563EB" : "white",
      color: isFocused || isSelected ? "white" : "black",
=======
      borderRadius: '0.375rem',
      borderColor: isDisabled ? '#E5E7EB' : '#D1D5DB', // Lighter border when disabled
      backgroundColor: isDisabled ? '#F3F4F6' : 'white', // Gray background when disabled
      boxShadow: 'none',
      fontSize,
      cursor: isDisabled ? 'not-allowed' : 'default', // Disable pointer events
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused
        ? '#0035C3'
        : isSelected
        ? '#2563EB'
        : 'white',
      color: isFocused || isSelected ? 'white' : 'black',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      fontSize,
    }),
    multiValue: (base) => ({
      ...base,
<<<<<<< HEAD
      backgroundColor: "#E5E7EB",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#374151",
=======
      backgroundColor: '#E5E7EB',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#374151',
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
    }),
    placeholder: (base) => ({
      ...base,
      fontSize,
    }),
<<<<<<< HEAD
    indicatorsContainer: (base) => ({
      ...base,
      borderLeft: "none !important", // Forcibly remove the line
      padding: "0",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0 8px", // Adjust padding if needed for alignment
    }),
    input: (base) => ({
      ...base,
      margin: 0, // Remove default spacing
      padding: 0, // Reset padding
    }),
=======
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
  };

  return (
    <div>
      <Select
        id={id}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        isDisabled={isDisabled} // Pass the isDisabled prop to react-select
        value={value} // Pass value to the Select component
        onChange={onChange} // Pass onChange to the Select component
      />
    </div>
  );
};

export default DropdownWithSearchAndMultiSelect;
