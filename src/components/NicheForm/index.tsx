import React from "react";
import { Controller } from "react-hook-form";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";

const NicheForm = ({ control, errors, id }: any) => {
  return (
    <div className="sub_activity">
      <Title title={`Ниша #${id}`} bold />
      <Title title="Название ниши" />
      <Controller
        name={`niche_name_${id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <input
              className="form-input"
              type="text"
              {...field}
              placeholder="Название ниши"
            />
            {errors.sub_activity_name ? (
              <p className="error">{errors.sub_activity_name?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Описание ниши" />
      <Controller
        name={`niche_description_${id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea value={field.value} onChange={field.onChange} />
            {errors.sub_activity_description ? (
              <p className="error">
                {errors.sub_activity_description?.message}
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

export default NicheForm;
