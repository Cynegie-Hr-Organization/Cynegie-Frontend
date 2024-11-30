import { useState, useRef } from 'react';
import { default as ReactSelect, components, InputAction, MultiValue, SingleValue, StylesConfig, InputProps, OptionProps } from 'react-select';

export type Option = {
  value: number | string;
  label: string;
};

export type MultiSelectProps<T> = {
  options: T[];
  value: T[];
  onChange: (selected: T[]) => void;
  isSelectAll?: boolean;
  components?: typeof components;
  menuPlacement?: 'auto' | 'top' | 'bottom';
};

export const MultiSelect = <T extends Option>(props: MultiSelectProps<T>) => {
  const [selectInput, setSelectInput] = useState<string>('');
  const isAllSelected = useRef<boolean>(false);
  const selectAllLabel = useRef<string>('Select all');
  const allOption = { value: '*', label: selectAllLabel.current } as T;

  const filterOptions = (options: T[], input: string) =>
    options?.filter(({ label }: T) =>
      label.toLowerCase().includes(input.toLowerCase())
    );

  const comparator = (v1: T, v2: T) =>
    (v1.value as number) - (v2.value as number);

  const filteredOptions = filterOptions(props.options, selectInput);
  const filteredSelectedOptions = filterOptions(props.value, selectInput);

  const Option = <T extends Option>(optionProps: OptionProps<T, true>) => (
    <components.Option {...optionProps}>
      {optionProps.data.value === '*' &&
        !isAllSelected.current &&
        filteredSelectedOptions?.length > 0 ? (
        <input
          key={optionProps.data.value}
          type='checkbox'
          ref={(input) => {
            if (input) input.indeterminate = true;
          }}
        />
      ) : (
        <input
          key={optionProps.data.value}
          type='checkbox'
          checked={optionProps.isSelected || isAllSelected.current}
          onChange={() => { }}
        />
      )}
      <label style={{ marginLeft: '5px' }}>{optionProps.label}</label>
    </components.Option>
  );

  const Input = <T extends Option>(inputProps: InputProps<T, true>) => (
    <>
      {selectInput.length === 0 ? (
        <components.Input autoFocus={inputProps.selectProps.menuIsOpen} {...inputProps}>
          {inputProps.children}
        </components.Input>
      ) : (
        <div style={{ border: '1px dotted gray' }}>
          <components.Input autoFocus={inputProps.selectProps.menuIsOpen} {...inputProps}>
            {inputProps.children}
          </components.Input>
        </div>
      )}
    </>
  );

  const customFilterOption = (option: Option, inputValue: string) =>
    (option.value !== '*' && option.label.toLowerCase().includes(inputValue.toLowerCase())) ||
    (option.value === '*' && filteredOptions?.length > 0);

  const onInputChange = (
    inputValue: string,
    event: { action: InputAction }
  ) => {
    if (event.action === 'input-change') setSelectInput(inputValue);
    else if (event.action === 'menu-close' && selectInput !== '')
      setSelectInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !selectInput)
      e.preventDefault();
  };

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    const selected = newValue as T[];
    if (
      selected.length > 0 &&
      !isAllSelected.current &&
      (selected[selected.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
        JSON.stringify(selected.sort(comparator)))
    )
      return props.onChange(
        [
          ...(props.value ?? []),
          ...props.options.filter(
            ({ label }: T) =>
              label.toLowerCase().includes(selectInput?.toLowerCase()) &&
              (props.value ?? []).filter((opt: T) => opt.label === label)
                .length === 0
          ),
        ].sort(comparator)
      );
    else if (
      selected.length > 0 &&
      selected[selected.length - 1].value !== allOption.value &&
      JSON.stringify(selected.sort(comparator)) !==
      JSON.stringify(filteredOptions)
    )
      return props.onChange(selected);
    else
      return props.onChange([
        ...props.value?.filter(
          ({ label }: T) =>
            !label.toLowerCase().includes(selectInput?.toLowerCase())
        ),
      ]);
  };

  const customStyles: StylesConfig<Option, true> = {
    multiValueLabel: (def) => ({
      ...def,
      backgroundColor: 'lightgray',
    }),
    multiValueRemove: (def) => ({
      ...def,
      backgroundColor: 'lightgray',
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: '30px',
      overflow: 'auto',
      paddingTop: 0,
    }),
    option: (styles, { isSelected, isFocused }) => {
      return {
        ...styles,
        backgroundColor:
          isSelected && !isFocused
            ? 'transparent'
            : isFocused && !isSelected
              ? styles.backgroundColor
              : isFocused && isSelected
                ? '#DEEBFF'
                : 'transparent',
        color: isSelected ? 'inherit' : 'transparent',
      };
    },
    menu: (def) => ({ ...def, zIndex: 9999 }),
  };

  if (props.isSelectAll && props.options.length !== 0) {
    isAllSelected.current =
      JSON.stringify(filteredSelectedOptions) ===
      JSON.stringify(filteredOptions);

    if (filteredSelectedOptions?.length > 0) {
      if (filteredSelectedOptions?.length === filteredOptions?.length)
        selectAllLabel.current = `All (${filteredOptions.length}) selected`;
      else
        selectAllLabel.current = `${filteredSelectedOptions?.length} / ${filteredOptions.length} selected`;
    } else selectAllLabel.current = 'Select all';

    allOption.label = selectAllLabel.current;

    return (
      <ReactSelect
        {...props}
        inputValue={selectInput}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        options={[allOption, ...props.options]}
        onChange={handleChange}
        components={{
          Option: Option,
          Input: Input,
          ...props.components,
        }}
        filterOption={customFilterOption}
        menuPlacement={props.menuPlacement ?? 'auto'}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />
    );
  }

  return (
    <ReactSelect
      {...props}
      inputValue={selectInput}
      onInputChange={onInputChange}
      onChange={handleChange}
      filterOption={customFilterOption}
      components={{
        Input: Input,
        ...props.components,
      }}
      menuPlacement={props.menuPlacement ?? 'auto'}
      onKeyDown={onKeyDown}
      tabSelectsValue={false}
      hideSelectedOptions={true}
      backspaceRemovesValue={false}
      blurInputOnSelect={true}
    />
  );
};
