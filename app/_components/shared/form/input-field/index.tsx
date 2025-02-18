import CheckboxField from "@/app/_components/employee/input-fields/checkbox-group";
import DateRangeField from "@/app/_components/employee/input-fields/date-range";
import MessageField from "@/app/_components/employee/input-fields/message";
import MultiSelectField from "@/app/_components/employee/input-fields/multi-select";
import RadioField from "@/app/_components/employee/input-fields/radio-group";
import SelectField from "@/app/_components/employee/input-fields/select";
import SwitchField from "@/app/_components/employee/input-fields/switch";
import TextField from "@/app/_components/employee/input-fields/text";
import { InputFieldProps } from "@/app/_components/employee/modal/types";
import CustomDatePicker from "@/app/_components/ui/date-picker";
import CustomTimePicker from "@/app/_components/ui/time-picker";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import AddItems from "../../custom-popover/content/add-items";
import FieldLabel from "../../detail-group/detail/value";
import DragUpload from "../../drag-upload";
import DragUploadHookForm from "../../drag-upload/hook-form";

const InputField: React.FC<InputFieldProps> = ({
  label: name,
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
  startadornment: startAdornment,
  endAdornment,
  checkboxItems,
  getDateRange,
  getDate,
  dateRangeValue,
  dateRangeDefaultValue,
  loading,
  register,
  errors,
  control,
  hookFormField,
  required,
  controllerRules,
  hookFormName,
  hookFormSetValue,
  hookFormGetValues,
  hookFormResetField,
  hookFormClearErrors,
  hookFormWatch,
  defaultChecked,
  isMessageField,
  isDragUploadEmployeeEdit,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel required={required} wrapText value={name ?? ""} />
      {loading ? (
        <Skeleton height={40} sx={{ width: "auto" }} />
      ) : (
        <>
          {type === "text" && (
            <TextField
              label={name}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              disabled={disabled}
              defaultValue={defaultValue}
              startadornment={startAdornment}
              endAdornment={endAdornment}
              register={register}
              errors={errors}
              required={required}
              hookFormName={hookFormName}
              isMessageField={isMessageField}
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
              defaultValue={
                typeof defaultValue === "string" ||
                typeof defaultValue === "number"
                  ? defaultValue
                  : undefined
              }
              setValue={setValue}
              valueControlledFromOutside={selectValControlledFromOutside}
              getCurrentValue={getCurrentValue}
              control={control}
              hookFormField={hookFormField}
              name={hookFormName ?? name}
              errors={errors}
              controllerRules={controllerRules}
            />
          )}
          {type == "radio" && <RadioField options={options ?? []} />}
          {type == "checkbox" && <CheckboxField items={checkboxItems ?? []} />}
          {type == "switch" && (
            <SwitchField
              label={name}
              control={control}
              defaultChecked={defaultChecked}
            />
          )}
          {type == "date" && (
            <CustomDatePicker
              // value={dayjs(value)}
              {...(value && { value: dayjs(value) })}
              {...(defaultValue && {
                defaultValue: dayjs(
                  typeof defaultValue === "string" ? defaultValue : undefined
                ),
              })}
              disabled={disabled}
              // onChange={(newValue) => getDate?.(newValue)}
              {...(getDate && { onChange: (newValue) => getDate?.(newValue) })}
              hookFormField={hookFormField}
              control={control}
              controllerRules={controllerRules}
              name={name}
              errors={errors}
            />
          )}
          {type == "date-range" && (
            <DateRangeField
              placeholder={placeholder}
              getDateRange={getDateRange}
              disabled={disabled}
              value={dateRangeValue}
              defaultValue={dateRangeDefaultValue}
            />
          )}
          {type == "time" && (
            <CustomTimePicker
              // value={dayjs(value)}
              {...(value && { value: dayjs(value) })}
              {...(defaultValue && {
                defaultValue: dayjs(
                  typeof defaultValue === "string" ? defaultValue : undefined
                ),
              })}
              disabled={disabled}
              // onChange={(newValue) => getDate?.(newValue)}
              {...(getDate && { onChange: (newValue) => getDate?.(newValue) })}
              hookFormField={hookFormField}
              control={control}
              controllerRules={controllerRules}
              name={name}
              errors={errors}
            />
          )}
          {type == "drag-upload" && (
            <div>
              <DragUpload
                name={name}
                hookFormSetValue={hookFormSetValue}
                hookFormGetValues={hookFormGetValues}
                required={required}
                register={register}
                hookFormResetField={hookFormResetField}
                hookFormErrors={errors}
                hookFormClearErrors={hookFormClearErrors}
                hookFormWatch={hookFormWatch}
              />
            </div>
          )}
          {type == "drag-upload-hook-form" && (
            <div>
              <DragUploadHookForm
                name={hookFormName ?? name}
                hookFormGetValues={hookFormGetValues}
                required={required}
                register={register}
                hookFormResetField={hookFormResetField}
                hookFormErrors={errors}
                hookFormWatch={hookFormWatch}
                hookFormSetValue={hookFormSetValue}
                isDragUploadEmployeeEdit={isDragUploadEmployeeEdit}
                defaultValue={
                  typeof defaultValue === "string" ? defaultValue : undefined
                }
              />
            </div>
          )}
          {type == "multi-select" && (
            <MultiSelectField
              options={options}
              label={name}
              control={control}
              placeholder={placeholder}
              defaultValue={defaultValue}
              controllerRules={controllerRules}
            />
          )}
          {type === "add-items" && addItemsProps && (
            <AddItems {...addItemsProps} />
          )}
        </>
      )}
    </div>
  );
};

export default InputField;
