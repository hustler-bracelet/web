import { Controller } from "react-hook-form";
import FormatTextArea from "../FormatTextArea";
import Title from "../Title";
import { NestedFormPropsType } from "../../utils/types";

const ActivityForm: React.FC<Omit<NestedFormPropsType, "id">> = ({
  control,
  errors,
}) => {
  return (
    <>
      <Title title="Название активности" />
      <div className="form-input_title">
        <Controller
          name="main_activity_emoji"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-input_container__emoji">
              <input
                className="form-input form-input_emoji"
                type="text"
                {...field}
                placeholder="Emoji"
              />
              {errors.main_activity_emoji ? (
                <p className="error">{errors.main_activity_emoji?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
        <Controller
          name="main_activity_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-input_container">
              <input
                className="form-input"
                type="text"
                {...field}
                placeholder="Название активности"
              />
              {errors.main_activity_name ? (
                <p className="error">{errors.main_activity_name?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
      </div>
      <Title title="Описание активности" />
      <Controller
        name="main_activity_description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea
              value={field.value}
              onChange={field.onChange}
              withItalic
            />
            {errors.main_activity_description ? (
              <p className="error">
                {errors.main_activity_description?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
    </>
  );
};

export default ActivityForm;
