import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";
import { NestedFormPropsType } from "../../utils/types";
import "./activityTaskForm.css";
import { forwardRef, useState } from "react";
import { TELEGRAM } from "../../utils/constants";
import ru from "date-fns/locale/ru";

interface DatepickerCustomInputProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
  customName: string;
}
const ActivityTaskForm: React.FC<NestedFormPropsType> = ({
  control,
  errors,
  id,
}) => {
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
    <div className="container">
      <Title title={`📌 Задание ниши #${id + 1}`} bold size="default" />
      <Title title="📝 Название задания" size="sub" />
      <Controller
        name={`niches.${id}.activity_task_name`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <input
              className="form-input"
              type="text"
              {...field}
              placeholder="Название задания"
            />
            {errors.niches?.[id]?.activity_task_name ? (
              <p className="error">
                {errors.niches?.[id]?.activity_task_name?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="📝 Описание задания" size="sub" />
      <Controller
        name={`niches.${id}.activity_task_description`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea
              value={field.value}
              onChange={field.onChange}
              errors={errors}
              name={`niches.${id}.activity_task_description`}
            />
            {errors.niches?.[id]?.activity_task_description ? (
              <p className="error">
                {errors.niches?.[id]?.activity_task_description?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="📅 Дедлайн задания" size="sub" />
      <Controller
        name={`niches.${id}.activity_task_date`}
        control={control}
        render={({ field }) => (
          <div className="form-input_container">
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              calendarStartDay={1}
              timeCaption="Время"
              //@ts-ignore
              locale={ru}
              customInput={
                <DatepickerCustomInput
                  isOpen={isDatePickerOpen}
                  //@ts-ignore
                  value={field.value}
                  onClick={field.onChange}
                  customName={field.name}
                />
              }
              onCalendarOpen={() => setIsDatePickerOpen(true)}
              onCalendarClose={() => setIsDatePickerOpen(false)}
            />
            {errors.niches?.[id]?.activity_task_date ? (
              <p className="error">
                {errors.niches?.[id]?.activity_task_date?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="🔰 Количество очков задания" size="sub" />
      <Controller
        name={`niches.${id}.activity_task_points_amount`}
        control={control}
        render={({ field }) => (
          <div className="form-input_container">
            <input
              className="form-input"
              type="number"
              {...field}
              placeholder="Количество очков"
            />
            {errors.niches?.[id]?.activity_task_points_amount ? (
              <p className="error">
                {errors.niches?.[id]?.activity_task_points_amount?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default ActivityTaskForm;
