import CalendarIcon from "@/app/_components/icons/calendar";
import { color } from "@/constants";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker";

type DateRangeFieldProps = {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  placeholder?: string;
  disabled?: boolean;
  getDateRange?: (range: { startDate: Date; endDate: Date }) => void;
};

const DateRangeField: React.FC<DateRangeFieldProps> = ({
  placeholder,
  getDateRange,
  disabled,
  value,
  defaultValue,
}) => {
  return (
    <DateRangePicker
      style={{
        borderRadius: "6px",
        ...(disabled && color.inputfield.disabled),
      }}
      {...(value && { value: value })}
      {...(defaultValue && { defaultValue: defaultValue })}
      preventOverflow
      showOneCalendar
      cleanable={false}
      ranges={[]}
      disabled={disabled}
      format="dd/MMM/yyyy"
      placeholder={placeholder ?? "Select Period"}
      // onChange={(e) => {
      //   if (e) {
      //     getDateRange?.({
      //       startDate: e[0],
      //       endDate: e[1],
      //     });
      //   }
      // }}
      {...(getDateRange && {
        onChange: (e) => {
          if (e) {
            getDateRange?.({
              startDate: e[0],
              endDate: e[1],
            });
          }
        },
      })}
      character=" – "
      caretAs={CalendarIcon}
    />
  );
};

export default DateRangeField;
