import { Controller } from "react-hook-form";
import FormatTextArea from "../FormatTextArea";
import Title from "../Title";
import { NestedFormPropsType } from "../../utils/types";

const ActivityForm: React.FC<Omit<NestedFormPropsType, "id">> = ({
  control,
  errors,
}) => {
  return (
    <div className="container">
      <Title title="📝 Название активности" size="sub" />
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
      <Title title="📝 Описание активности" size="sub" />
      <Controller
        name="main_activity_description"
        control={control}
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea
              value={field.value}
              onChange={field.onChange}
              errors={errors}
              withItalic
              name="main_activity_description"
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
    </div>
  );
};

export default ActivityForm;
