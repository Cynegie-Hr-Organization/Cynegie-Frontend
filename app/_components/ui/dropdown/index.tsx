import React from 'react';
import Select, { StylesConfig } from 'react-select';

interface DropdownWithSearchAndMultiSelectProps<OptionType> {
  id: string;
  options: OptionType[];
  isMulti?: boolean;
  placeholder?: string;
  fontSize?: string;
  isDisabled?: boolean; // Add isDisabled prop
}

const DropdownWithSearchAndMultiSelect = <OptionType,>({
  id,
  options,
  isMulti = false,
  placeholder = 'Select an option',
  fontSize = '14px',
  isDisabled = false, // Default to false
}: DropdownWithSearchAndMultiSelectProps<OptionType>) => {
  const customStyles: StylesConfig<OptionType, boolean> = {
    control: (base) => ({
      ...base,
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
      fontSize,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#E5E7EB',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#374151',
    }),
    placeholder: (base) => ({
      ...base,
      fontSize,
    }),
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
      />
    </div>
  );
};

export default DropdownWithSearchAndMultiSelect;
