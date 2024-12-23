import { InputFieldProps } from '@/app/_components/employee/modal/types';
import FieldLabel from '../../detail-group/detail/value';
import TextField from '@/app/_components/employee/input-fields/text';
import MessageField from '@/app/_components/employee/input-fields/message';
import SelectField from '@/app/_components/employee/input-fields/select';
import CustomDatePicker from '@/app/_components/ui/date-picker';
import CustomTimePicker from '@/app/_components/ui/time-picker';
import RadioField from '@/app/_components/employee/input-fields/radio-group';
import { Dayjs } from 'dayjs';
import DragUpload from '../../drag-upload';
import Button from '../../button-group/button';
import { MultiSelect } from '../../multi-select-dropdown';
import AddItems from '../../custom-popover/content/add-items';
import CheckboxField from '@/app/_components/employee/input-fields/checkbox-group';

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  options,
  selectValControlledFromOutside,
  value,
  setValue,
  disabled,
  defaultValue,
  addItemsProps,
  getCurrentValue,
  startAdornment,
  checkboxItems,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <FieldLabel wrapText value={name ?? ''} />
      {type === 'text' && (
        <TextField
          placeholder={placeholder}
          value={value}
          setValue={setValue}
          disabled={disabled}
          defaultValue={defaultValue}
          startAdornment={startAdornment}
        />
      )}
      {type == 'message' && (
        <MessageField
          placeholder={placeholder}
          value={value}
          setValue={setValue}
        />
      )}
      {type == 'select' && (
        <SelectField
          options={options}
          placeholder={placeholder ?? 'Select'}
          value={value}
          defaultValue={defaultValue}
          setValue={setValue}
          valueControlledFromOutside={selectValControlledFromOutside}
          getCurrentValue={getCurrentValue}
        />
      )}
      {type == 'radio' && <RadioField options={options ?? []} />}
      {type == 'checkbox' && <CheckboxField items={checkboxItems ?? []} />}
      {type == 'date' && (
        <CustomDatePicker
          value={null}
          onChange={function (newValue: Dayjs | null): void {
            console.log(newValue);
          }}
        />
      )}
      {type == 'time' && (
        <CustomTimePicker
          value={null}
          onChange={function (newValue: Dayjs | null): void {
            console.log(newValue);
          }}
        />
      )}
      {type == 'drag-upload' && (
        <div>
          <DragUpload />
        </div>
      )}
      {type == 'multi-select' && (
        <MultiSelect options={[]} value={[]} onChange={() => {}} />
      )}
      {type === 'add-items' && addItemsProps && <AddItems {...addItemsProps} />}
    </div>
  );
};

export default InputField;
