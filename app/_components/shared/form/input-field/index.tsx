import CheckboxField from "@/app/_components/employee/input-fields/checkbox-group";
import DateRangeField from "@/app/_components/employee/input-fields/date-range";
import MessageField from "@/app/_components/employee/input-fields/message";
import RadioField from "@/app/_components/employee/input-fields/radio-group";
import SelectField from "@/app/_components/employee/input-fields/select";
import TextField from "@/app/_components/employee/input-fields/text";
import { InputFieldProps } from "@/app/_components/employee/modal/types";
import CustomDatePicker from "@/app/_components/ui/date-picker";
import CustomTimePicker from "@/app/_components/ui/time-picker";
import dayjs, { Dayjs } from "dayjs";
import AddItems from "../../custom-popover/content/add-items";
import FieldLabel from "../../detail-group/detail/value";
import DragUpload from "../../drag-upload";
import { MultiSelect } from "../../multi-select-dropdown";

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
  getDateRange,
  getDate,
  dateRangeDefaultValue,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel wrapText value={name ?? ""} />
      {type === "text" && (
        <TextField
          placeholder={placeholder}
          value={value}
          setValue={setValue}
          disabled={disabled}
          defaultValue={defaultValue}
          startAdornment={startAdornment}
        />
      )}
      {type == "message" && (
        <MessageField
          placeholder={placeholder}
          value={value}
          setValue={setValue}
        />
      )}
      {type == "select" && (
        <SelectField
          options={options}
          placeholder={placeholder ?? "Select"}
          value={value}
          defaultValue={defaultValue}
          setValue={setValue}
          valueControlledFromOutside={selectValControlledFromOutside}
          getCurrentValue={getCurrentValue}
        />
      )}
      {type == "radio" && <RadioField options={options ?? []} />}
      {type == "checkbox" && <CheckboxField items={checkboxItems ?? []} />}
      {type == "date" && (
        <CustomDatePicker
          // value={dayjs(value)}
          {...(value && { value: dayjs(value) })}
          {...(defaultValue && { defaultValue: dayjs(defaultValue) })}
          disabled={disabled}
          onChange={(newValue) => getDate?.(newValue)}
        />
      )}
      {type == "date-range" && (
        <DateRangeField
          placeholder={placeholder}
          getDateRange={getDateRange}
          disabled={disabled}
          defaultValue={dateRangeDefaultValue}
        />
      )}
      {type == "time" && (
        <CustomTimePicker
          value={null}
          onChange={function (newValue: Dayjs | null): void {
            console.log(newValue?.toISOString());
          }}
        />
      )}
      {type == "drag-upload" && (
        <div>
          <DragUpload />
        </div>
      )}
      {type == "multi-select" && (
        <MultiSelect options={[]} value={[]} onChange={() => {}} />
      )}
      {type === "add-items" && addItemsProps && <AddItems {...addItemsProps} />}
    </div>
  );
};

export default InputField;
