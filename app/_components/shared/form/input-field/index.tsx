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

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  options,
  selectValControlledFromOutside,
  value,
  setValue,
  sideButton,
  disabled,
  defaultValue,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <FieldLabel wrapText value={name ?? ''} />
      <div className='flex items-center gap-2'>
        {type === 'text' && (
          <TextField
            placeholder={placeholder}
            value={value}
            setValue={setValue}
            disabled={disabled}
            defaultValue={defaultValue}
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
          />
        )}
        {type == 'radio' && <RadioField options={options ?? []} />}
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
        {sideButton && <Button {...sideButton} />}
        {type == 'multi-select' && (
          <MultiSelect options={[]} value={[]} onChange={() => {}} />
        )}
      </div>
    </div>
  );
};

export default InputField;
