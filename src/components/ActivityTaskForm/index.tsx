import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";
import { NestedFormPropsType } from "../../utils/types";
import "./activityTaskForm.css";
import { forwardRef } from "react";
import CalendarSVG from "../../assets/icons/Calendar";

const ActivityTaskForm: React.FC<NestedFormPropsType> = ({
  control,
  errors,
  id,
}) => {
  const activityTaskNameKey = `activity_task_name_niche_${id}` as const;
  const activityTaskDescriptionKey =
    `activity_task_description_niche_${id}` as const;
  const activityTaskDateKey = `activity_task_date_niche_${id}` as const;
  const activityPointsKey = `activity_task_points_amount_niche_${id}` as const;
  //@ts-ignore
  const DatepickerCustomInput = forwardRef(
    //@ts-ignore
    ({ value, onClick }, ref) => (
      //@ts-ignore
      <button
        className="form-input"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick(event);
        }}
        //@ts-ignore
        ref={ref}
        value={value}
      >
        <CalendarSVG />
        {value}
      </button>
    )
  );

  return (
    <div>
      <Title title="Название задания" />
      <Controller
        name={`activity_task_name_niche_${id}`}
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
            {errors[activityTaskNameKey] ? (
              <p className="error">{errors[activityTaskNameKey]?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Описание задания" />
      <Controller
        name={`activity_task_description_niche_${id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea value={field.value} onChange={field.onChange} />
            {errors[activityTaskDescriptionKey] ? (
              <p className="error">
                {errors[activityTaskDescriptionKey]?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Дата задания" />
      <Controller
        name={`activity_task_date_niche_${id}`}
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <div>
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
              customInput={<DatepickerCustomInput />}
            />
            {errors[activityTaskDateKey] ? (
              <p className="error">{errors[activityTaskDateKey]?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Количество очков задания" />
      <Controller
        name={`activity_task_points_amount_niche_${id}`}
        control={control}
        render={({ field }) => (
          <div>
            <input
              className="form-input"
              type="number"
              {...field}
              placeholder="Количество мест"
            />
            {errors[activityPointsKey] ? (
              <p className="error">{errors[activityPointsKey]?.message}</p>
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
