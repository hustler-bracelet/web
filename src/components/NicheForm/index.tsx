import React from "react";
import { Controller } from "react-hook-form";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";
import { NestedFormPropsType } from "../../utils/types";

const NicheForm: React.FC<NestedFormPropsType> = ({ control, errors, id }) => {
  return (
    <div className="container">
      <Title title={`📌 Ниша #${id + 1}`} bold size="default" />
      <Title title="📝 Название ниши" size="sub" />
      <Controller
        name={`niches.${id}.niche_name`}
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
            {errors.niches?.[id]?.niche_name ? (
              <p className="error">
                {errors.niches?.[id]?.niche_name?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="📝 Описание ниши" size="sub" />
      <Controller
        name={`niches.${id}.niche_description`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea
              value={field.value}
              onChange={field.onChange}
              errors={errors}
              name={`niches.${id}.niche_description`}
            />
            {errors.niches?.[id]?.niche_description ? (
              <p className="error">
                {errors.niches?.[id]?.niche_description?.message}
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
