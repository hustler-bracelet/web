import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";
import { NestedFormPropsType } from "../../utils/types";
import "./activityTaskForm.css";
import { Datepicker } from "../Datepicker";

const ActivityTaskForm: React.FC<NestedFormPropsType> = ({
  control,
  errors,
  id,
}) => {
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
            <Datepicker
              onChange={field.onChange}
              value={field.value}
              name={field.name}
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
