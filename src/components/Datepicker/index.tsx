import { forwardRef, useState } from "react";
import { TELEGRAM } from "../../utils/constants";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

interface DatepickerCustomInputProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
  customName: string;
}

export const Datepicker: React.FC<any> = ({ value, onChange, name }) => {
  const DatepickerCustomInput = forwardRef<
    HTMLButtonElement,
    DatepickerCustomInputProps
  >(({ customName, value, onClick, isOpen }, ref) => {
    return (
      <button
        name={customName}
        className={`form-input ${isOpen ? "datepicker-open" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          TELEGRAM.HapticFeedback.impactOccurred("light");
          onClick(event);
        }}
        ref={ref}
      >
        {value && <p>{value}</p>}
        {!value && <p className="hint">Выбери дату</p>}
      </button>
    );
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      minDate={new Date()}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="dd/MM/yyyy HH:mm"
      calendarStartDay={1}
      timeCaption="Time"
      //@ts-ignore
      locale={ru}
      customInput={
        <DatepickerCustomInput
          isOpen={isDatePickerOpen}
          //@ts-ignore
          value={value}
          onClick={onChange}
          customName={name}
        />
      }
      onCalendarOpen={() => setIsDatePickerOpen(true)}
      onCalendarClose={() => setIsDatePickerOpen(false)}
    />
  );
};
