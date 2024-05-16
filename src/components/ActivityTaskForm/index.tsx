import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";

const ActivityTaskForm = ({ control, errors, id }: any) => {
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
              placeholder="?"
            />
            {errors.main_activity_emoji ? (
              <p className="error">{errors.main_activity_emoji?.message}</p>
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
            {errors.main_activity_name ? (
              <p className="error">{errors.main_activity_name?.message}</p>
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
        render={({ field }) => (
          <DatePicker selected={field.value} onChange={field.onChange} />
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
            {errors.places_count ? (
              <p className="error">{errors.places_count?.message}</p>
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
